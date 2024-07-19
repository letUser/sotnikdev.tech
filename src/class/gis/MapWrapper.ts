import Map from 'ol/Map.js'
import OSM from 'ol/source/OSM.js'
import { Tile as TileLayer, Vector as VectorLayer, Group as LayerGroup } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source.js'
import { Style } from 'ol/style.js'
import View from 'ol/View.js'
import { ScaleLine } from 'ol/control.js'
import { useGeographic } from 'ol/proj'
import { createEmpty, extend, getCenter } from 'ol/extent'
import Feature from 'ol/Feature.js'

import location from '@/assets/location.svg'

export default class MapWrapper extends Map {
  currentPos: GeolocationCoordinates
  circleLayer: VectorLayer<Feature>
  vectorSource: VectorSource<Feature>

  constructor() {
    super()

    /**
     * @property {GeolocationCoordinates} currentPos - current user's position from Navigator API
     * @public
    */
    this.currentPos = {
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 0,
      longitude: 0,
      speed: null
    }

    /**
     * @property {VectorLayer<Feature>} circleLayer - ref to circle layer for O(1) access
     * @public
    */
    this.circleLayer = prepareCircleLayer()

    /**
     * @property {VectorSource<Feature>} vectorSource - ref to main vector source for O(1) access
     * @public
    */
    this.vectorSource = new VectorSource()

    super.setTarget('map')

    super.addLayer(
      new TileLayer({
        source: new OSM(),
        preload: Infinity
      })
    )

    // add features layers as a group
    super.addLayer(
      new LayerGroup({
        layers: [
          this.circleLayer,
          new VectorLayer({
            source: this.vectorSource,
            style: {
              'icon-color': 'transparent',
              'icon-src': location,
              'icon-scale': 0.86,
              'icon-anchor': [0.5, 0.9]
            }
          })
        ],
        properties: {
          code: 'features'
        }
      })
    )

    super.setView(
      new View({
        center: [this.currentPos.longitude, this.currentPos.latitude],
        zoom: 1,
        maxZoom: 19
      })
    )

    super.addControl(
      new ScaleLine({
        units: 'metric'
      })
    )

    // init latitude and longitute auto-transformation
    useGeographic()
  }

  /**
   * Zoom into features extent handler
   * @param {Feature[]} features - computed features collection
   * @public
  */
  zoomToFeatures = (features: Feature[]) => {
    // create empty extent
    const extent = getExtentFromFeatures(features)

    const view = super.getView()

    // zoom into extent with animation
    if (extent && view) {
      view.fit(extent, { duration: 2000, padding: [100, 100, 100, 100], maxZoom: 15 })
    }
  }

  /**
   * Animated translate to the center of the extent
   * @param {Feature[]} features feature collection
   * @param {number[]} coords lonlat 2 numbers array
   * @public
  */
  flyToExtent = (features: Feature[] | undefined, coords?: number[] | undefined) => {
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
        this.zoomToFeatures(features)
      }
    }

    const view = super.getView()
    const zoom = view.getZoom()

    // if zoom larger than 5
    if (zoom && zoom > 9) {
      // start animations in query
      parts = 1

      view.animate(
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
      view.animate(
        {
          zoom: 3,
          duration: duration
        },
        callback
      )

      // translate animation
      view.animate(
        {
          center: location,
          duration: duration
        },
        callback
      )
    }
  }
}

/**
 * Function to prepare circle layer and return ref to it
 * @private
*/
const prepareCircleLayer = () => {
  return new VectorLayer({
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
}

/**
 * Calculate extent from feature collection
 * @param {Feature[]} features - computed features collection
 * @private
*/
const getExtentFromFeatures = (features: Feature[]) => {
  // if array is empty - stop function
  if (!features.length) return null

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