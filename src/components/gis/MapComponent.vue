<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'petite-vue-i18n'
import MapWrapper from '@/class/gis/MapWrapper'
import Circle from 'ol/geom/Circle.js'
import Point from 'ol/geom/Point.js'
import Feature from 'ol/Feature.js'
import { ElNotification } from 'element-plus'

onMounted(() => {
  // declare map in onMounted to await id="map" HTMLElement creation
  map = new MapWrapper()

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

// use translation
const { t } = useI18n({ useScope: 'global' })

let map: MapWrapper | null = null

// loading state for the position precising
const loading = ref(false)

// id of interval for Geolocation enable checking
let intervalError: number = 0

// id of interval pulse if Geolocation has bad accuracy
let badAccInterval: number = 0

// instances for notifications
let notificationAskGeo: { close: Function } = { close: () => {} }

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
  if (pos.coords.accuracy > 50) {
    // if no interval - create it & circle
    if (!badAccInterval) {
      loading.value = true

      // create approximate area
      circleFeature = new Feature(
        new Circle([pos.coords.longitude, pos.coords.latitude], pos.coords.accuracy / 156000)
      )

      const source = map.circleLayer.getSource()

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
    } else if (map.currentPos.accuracy) return
  } else {
    loading.value = false

    // if there was interval - remove it
    if (badAccInterval !== 0) window.clearInterval(badAccInterval)

    // remove circle
    map.circleLayer.getSource()?.clear()

    circleFeature = null
  }

  // upd position info
  map.currentPos = pos.coords

  // remove prev feature
  map.vectorSource.clear()

  // if provided, set user's GeoData to the map
  map.vectorSource.addFeature(new Feature(new Point([pos.coords.longitude, pos.coords.latitude])))

  // center on user's GeoData
  map.flyToExtent(
    circleFeature ? map.circleLayer.getSource()?.getFeatures() : map.vectorSource.getFeatures()
  )

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

  if (!map) {
    throw new Error('Map is not initialized')
  }

  console.error(err)

  // init and declare default feature
  const coords = [-122.7, 49.1] // Vancouver

  // add feature and center on it with animation
  map.vectorSource.addFeature(new Feature(new Point(coords)))
  map.flyToExtent(map.vectorSource.getFeatures())

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
      title: t('gis-ask-geo-title'),
      message: t('gis-ask-geo-text'),
      type: 'info'
    })
  }, 5000)
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
          <template #default> {{ t('gis-precising') }}</template>
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
  animation: slide-up 5s ease-in;

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
      z-index: var(--mid-z-index);
    }
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(128px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
