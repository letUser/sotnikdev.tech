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
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js'
import { ElNotification } from 'element-plus'
import location from '@/assets/location.svg'

onMounted(() => {
  // init and declare map in onMounted to await id="map" HTMLElement creation
  const map = new Map({
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
      zoom: 9
    }),
    controls: defaultControls().extend([
      new ScaleLine({
        units: 'metric'
      })
    ])
  })

  // ask user to provide client's GeoData
  navigator.geolocation.getCurrentPosition(
    (pos) => onSuccess(pos, map), // if request success
    (err) => onError(err, map), // if user block geodata - set interval and show a message
    { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }
  )
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
  latitude: 49.1, // Vancouver
  longitude: -122.7, // Vancouver
  speed: null
}

// init latitude and longitute auto-transformation
useGeographic()

// ref to vectorSource of the map for fast access
let vectorSource = new VectorSource({
  features: [new Feature(new Point([currentPos.longitude, currentPos.latitude]))]
})

/**
 * Handling a successful geolocation request
 * @param {GeolocationPosition} pos requested geolocation position
 * @param {Map} map map container
 */
const onSuccess = (pos: GeolocationPosition, map: Map) => {
  notification2.close()

  vectorSource.clear()
  vectorSource.addFeature(new Feature(new Point([pos.coords.longitude, pos.coords.latitude])))

  // if provided, set user's GeoData to the map
  map.getView().setZoom(17)
  map.getView().setCenter([pos.coords.longitude, pos.coords.latitude])

  // upd position info
  currentPos = pos.coords

  // if there was interval - remove it
  if (intervalId !== 0) window.clearInterval(intervalId)

  // if accuracy rate is sadenly bad
  if (pos.coords.accuracy > 10000) {
    notification1.close()

    // show Notification with info
    notification1 = ElNotification({
      duration: 5000,
      title: 'Oops',
      message: 'Poor Geolocation accuracy',
      type: 'info'
    })

    // compute approximate zoom
    map.getView().setZoom(9)
  }
}

/**
 * Handling an error of geolocation request
 * @param {GeolocationPositionError} err error object
 * @param {Map} map map container
 */
const onError = (err: GeolocationPositionError, map: Map) => {
  // if there interval already - exit from handler
  if (intervalId !== 0) return

  console.error(err)

  // set interval
  intervalId = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => onSuccess(pos, map),
      (err) => onError(err, map),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }
    )
  }, 2000)

  // show Notification with info
  notification2 = ElNotification({
    duration: 10000,
    title: 'Please enable Geolocation',
    message: 'We want to provide you with the best user experience',
    type: 'info'
  })
}
</script>

<template>
  <div class="map-wrapper">
    <div id="map" />
  </div>
</template>

<style lang="scss">
@import 'node_modules/ol/ol.css';

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
