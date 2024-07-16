<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Map from 'ol/Map.js'
import OSM from 'ol/source/OSM.js'
import { Vector as VectorSource } from 'ol/source.js'
import TileLayer from 'ol/layer/Tile.js'
import { Vector as VectorLayer } from 'ol/layer.js'
import View from 'ol/View.js'
import { ScaleLine, defaults as defaultControls } from 'ol/control.js'
import { useGeographic } from 'ol/proj'
import GeoJSON from 'ol/format/GeoJSON.js'
import Icon from 'ol/style/Icon.js'
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
      new VectorLayer({
        source: vectorSource,
        style: {
          'icon-color': 'transparent',
          'icon-src': location,
          'icon-scale': 0.86,
          'icon-anchor': [0.5, 1]
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
  if (intervalId !== 0) window.clearInterval(intervalId)
  notification1.close()
  notification2.close()
})

// id of interval for Geolocation enable checking
let intervalId: number = 0

// instances for notifications
let notification1: { close: Function } = { close: () => {} }
let notification2: { close: Function } = { close: () => {} }

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

/**
 * Handling a successful geolocation request
 * @param {GeolocationPosition} pos requested geolocation position
 */
const onSuccess = (pos: GeolocationPosition) => {
  notification2.close()

  if (!map) {
    throw new Error('Map is not initialized')
  }

  console.log(pos)

  // upd position info
  currentPos = pos.coords

  // if provided, set user's GeoData to the map
  vectorSource.clear()
  vectorSource.addFeature(new Feature(new Point([pos.coords.longitude, pos.coords.latitude])))

  // center on user's GeoData
  flyToExtent(vectorSource.getFeatures())

  // if there was interval - remove it
  if (intervalId !== 0) window.clearInterval(intervalId)

  // if accuracy rate is sadenly bad
  if (pos.coords.accuracy > 500) {
    notification1.close()

    // show Notification with info
    notification1 = ElNotification({
      duration: 5000,
      title: 'Oops',
      message: 'Poor Geolocation accuracy',
      type: 'info'
    })
  }
}

/**
 * Handling an error of geolocation request
 * @param {GeolocationPositionError} err error object
 */
const onError = (err: GeolocationPositionError) => {
  // if there interval already - exit from handler
  if (intervalId !== 0) return

  console.error(err)

  // init and declare default feature
  const coords = [-122.7, 49.1] // Vancouver

  // add feature and center on it with animation
  vectorSource.addFeature(new Feature(new Point(coords)))
  flyToExtent(vectorSource.getFeatures())

  // set interval
  intervalId = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => onSuccess(pos),
      (err) => onError(err),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }
    )
  }, 2000)

  setTimeout(() => {
    // show Notification with info
    notification2 = ElNotification({
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
    map.getView().fit(extent, { duration: 2000, padding: [200, 200, 200, 200], maxZoom: 15 })
  }
}

/**
 * Animated translate to the center of the extent
 * @param {Feature[]} features feature collection
 * @param {number[]} coords lonlat 2 numbers array
 */
const flyToExtent = (features: Feature[], coords?: number[] | undefined) => {
  if (!map) throw new Error('Map is not initialized')

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
  <div class="map-wrapper">
    <div id="map" />
  </div>
</template>

<style lang="scss">
@import 'ol/ol.css';

.map-wrapper {
  height: 100%;

  #map {
    height: 100%;

    .ol-viewport {
      border: 1px solid var(--el-border-color);
      border-radius: var(--el-border-radius-base);
    }
  }
}
</style>
