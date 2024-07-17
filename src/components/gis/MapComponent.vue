<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import Map from 'ol/Map.js'
import OSM from 'ol/source/OSM.js'
import type BaseVectorLayer from 'ol/layer/BaseVector.js'
import { Vector as VectorSource } from 'ol/source.js'
import TileLayer from 'ol/layer/Tile.js'
import { Vector as VectorLayer } from 'ol/layer.js'
import View from 'ol/View.js'
import { ScaleLine, defaults as defaultControls } from 'ol/control.js'
import { useGeographic } from 'ol/proj'
import GeoJSON from 'ol/format/GeoJSON.js'
import Circle from 'ol/geom/Circle.js'
import Point from 'ol/geom/Point.js'
import Feature from 'ol/Feature.js'
import { createEmpty, extend, getCenter } from 'ol/extent'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js'
import { ElNotification } from 'element-plus'
import location from '@/assets/location.svg'

onMounted(() => {
  // declare map in onMounted to await id="map" HTMLElement creation
  map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
        preload: Infinity
      }),
      circleLayer,
      new VectorLayer({
        source: vectorSource,
        style: {
          'icon-color': 'transparent',
          'icon-src': location,
          'icon-scale': 0.86,
          'icon-anchor': [0.5, 0.9]
        }
      })
    ],
    view: new View({
      center: [currentPos.longitude, currentPos.latitude],
      zoom: 1,
      maxZoom: 19
    }),
    controls: defaultControls().extend([
      new ScaleLine({
        units: 'metric'
      })
    ])
  })

  if (map) {
    // ask user to provide client's GeoData
    navigator.geolocation.getCurrentPosition(
      (pos) => onSuccess(pos), // if request success
      (err) => onError(err), // if user block geodata - set interval and show a message
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }
    )
  }
})

onUnmounted(() => {
  // delete component data
  if (intervalError !== 0) window.clearInterval(intervalError)
  if (badAccInterval !== 0) window.clearInterval(badAccInterval)
  notificationAskGeo.close()
})

// loading state for the position precising
const loading = ref(false)

// id of interval for Geolocation enable checking
let intervalError: number = 0

// id of interval pulse if Geolocation has bad accuracy
let badAccInterval: number = 0

// instances for notifications
let notificationAskGeo: { close: Function } = { close: () => {} }

// default position object
let currentPos: GeolocationCoordinates = {
  accuracy: 0,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: 0,
  longitude: 0,
  speed: null
}

// init latitude and longitute auto-transformation
useGeographic()

// init map container and declare with NULL
let map: Map | null = null

// ref to vectorSource of the map for fast access
let vectorSource = new VectorSource()

// ref to circle's layer
let circleLayer = new VectorLayer({
  source: new VectorSource(),
  properties: {
    id: 'circle'
  },
  style: new Style({
    // render function to create a static circle on a map
    renderer(coordinates, state) {
      const [[x, y], [x1, y1]] = coordinates as number[][]
      const ctx = state.context
      const dx = x1 - x
      const dy = y1 - y
      const radius = Math.sqrt(dx * dx + dy * dy)

      const innerRadius = 0
      const outerRadius = radius * 1.4

      const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius)
      gradient.addColorStop(0, 'rgba(64, 158, 255, 0)')
      gradient.addColorStop(0.6, 'rgba(64, 158, 255, 0.2)')
      gradient.addColorStop(1, 'rgba(64, 158, 255, 0.45)')
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI, true)
      ctx.fillStyle = gradient
      ctx.fill()
    }
  })
})

/**
 * Handling a successful geolocation request
 * @param {GeolocationPosition} pos requested geolocation position
 */
const onSuccess = (pos: GeolocationPosition) => {
  notificationAskGeo.close()

  if (!map) {
    throw new Error('Map is not initialized')
  }

  let circleFeature = null

  // if accuracy rate is sadenly bad
  if (pos.coords.accuracy > 20) {
    // if no interval - create it & circle
    if (!badAccInterval) {
      loading.value = true

      // create approximate area
      circleFeature = new Feature(
        new Circle([pos.coords.longitude, pos.coords.latitude], pos.coords.accuracy / 156000)
      )

      const source = circleLayer.getSource()

      // add circle as
      if (source) source.addFeature(circleFeature)

      // set interval to reupdate accuracy every second
      badAccInterval = setInterval(() => {
        // ask user to provide client's GeoData
        navigator.geolocation.getCurrentPosition(
          (pos) => onSuccess(pos), // if request success
          (err) => onError(err), // if user block geodata - set interval and show a message
          { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }
        )
      }, 2000)
    } else if (currentPos.accuracy) return
  } else {
    loading.value = false

    // if there was interval - remove it
    if (badAccInterval !== 0) window.clearInterval(badAccInterval)

    // remove circle
    circleLayer.getSource()?.clear()

    circleFeature = null
  }

  // upd position info
  currentPos = pos.coords

  // remove prev feature
  vectorSource.clear()

  // if provided, set user's GeoData to the map
  vectorSource.addFeature(new Feature(new Point([pos.coords.longitude, pos.coords.latitude])))

  // center on user's GeoData
  flyToExtent(circleFeature ? circleLayer.getSource()?.getFeatures() : vectorSource.getFeatures())

  // if there was interval for error - remove it
  if (intervalError !== 0) window.clearInterval(intervalError)
}

/**
 * Handling an error of geolocation request
 * @param {GeolocationPositionError} err error object
 */
const onError = (err: GeolocationPositionError) => {
  // if there interval already - exit from handler
  if (intervalError !== 0) return

  console.error(err)

  // init and declare default feature
  const coords = [-122.7, 49.1] // Vancouver

  // add feature and center on it with animation
  vectorSource.addFeature(new Feature(new Point(coords)))
  flyToExtent(vectorSource.getFeatures())

  // set interval
  intervalError = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => onSuccess(pos),
      (err) => onError(err),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }
    )
  }, 2000)

  setTimeout(() => {
    // show Notification with info
    notificationAskGeo = ElNotification({
      duration: 10000,
      title: 'Please enable Geolocation',
      message: 'We want to provide you with the best user experience',
      type: 'info'
    })
  }, 5000)
}

/**
 * Calculate extent from feature collection
 * @param {Feature[]} features - computed features collection
 */
const getExtentFromFeatures = (features: Feature[]) => {
  // if array or map is empty - stop function
  if (!features.length || !map) return null

  // create empty extent
  const extent = createEmpty()

  // form extent for all features
  features.forEach((feature: Feature) => {
    if (feature) {
      const geometry = feature.getGeometry()

      if (geometry) {
        extend(extent, geometry.getExtent())
      }
    }
  })

  return extent
}

/**
 * Zoom into features extent handler
 * @param {Feature[]} features - computed features collection
 */
const zoomToFeatures = (features: Feature[]) => {
  // create empty extent
  const extent = getExtentFromFeatures(features)

  // zoom into extent with animation
  if (extent && map) {
    map.getView().fit(extent, { duration: 2000, padding: [100, 100, 100, 100], maxZoom: 15 })
  }
}

/**
 * Animated translate to the center of the extent
 * @param {Feature[]} features feature collection
 * @param {number[]} coords lonlat 2 numbers array
 */
const flyToExtent = (features: Feature[] | undefined, coords?: number[] | undefined) => {
  if (!map) throw new Error('Map is not initialized')
  if (!features) throw new Error('No features')

  // create empty extent
  const extent = getExtentFromFeatures(features)

  // init and declare center of the destination
  let location = coords

  if (!coords) {
    if (!extent) throw new Error('Can not get center from function params - flyToExtent()')

    // mutate var with center of the extent
    location = getCenter(extent)
  }

  const duration = 1000
  let parts = 2
  let called = false

  // callback of each animation
  const callback = (complete: boolean) => {
    --parts

    // if all animations end - return
    if (called) {
      return
    }

    // if last animation callback
    if (parts === 0 || !complete) {
      called = true

      // zoom to features after animation query
      zoomToFeatures(features)
    }
  }

  const view = map.getView()
  const zoom = view.getZoom()

  // if zoom larger than 5
  if (zoom && zoom > 9) {
    // start animations in query
    parts = 1

    map.getView().animate(
      {
        zoom: 3,
        duration: duration
      },
      {
        center: location,
        duration: duration
      },
      callback
    )
  } else {
    // start animations in parallel
    // zoom animation
    map.getView().animate(
      {
        zoom: 3,
        duration: duration
      },
      callback
    )

    // translate animation
    map.getView().animate(
      {
        center: location,
        duration: duration
      },
      callback
    )
  }
}
</script>

<template>
  <div style="height: 100%">
    <div v-if="loading" class="loading-container-wrapper">
      <div class="loading-container">
        <el-progress
          class="loading-container-progress"
          :percentage="100"
          :indeterminate="true"
          :duration="2"
        >
          <template #default> Precising position </template>
        </el-progress>
      </div>
    </div>
    <div class="map-wrapper">
      <div id="map" />
    </div>
  </div>
</template>

<style lang="scss">
@import 'ol/ol.css';

.loading-container {
  display: flex;
  align-items: center;
  position: fixed;
  padding: 4px;

  &-progress {
    width: 160px;
  }

  &-text {
    padding-left: 4px;
  }

  &-wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
}

.map-wrapper {
  height: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  #map {
    height: 100%;

    .ol-viewport {
      border: 1px solid var(--el-border-color);
      border-radius: var(--el-border-radius-base);
    }
  }
}
</style>
