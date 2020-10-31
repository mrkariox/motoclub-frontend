<template>
  <GmapMap
    :center="center"
    :zoom="7"
    map-type-id="terrain"
    style="width: 100%; height: 100%"
    :options="{
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      disableDefaultUi: false,
      styles:styles
    }"
  >
    <GmapMarker
      v-for="(m, index) in markers"
      :key="index"
      :ref="createMarkerRefName(index)"
      :position="m.position"
      :clickable="true"
      :visible="true"
      :icon="markerIcons.default"
      @click="handleMarkerClick($event, createMarkerRefName(index))"
    />
  </GmapMap>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
import { google } from '~/config/google'
import PlacesRepository from '~/repositories/PlacesRepository'

export default {
  async asyncData (context) {
    try {
      const repo = new PlacesRepository()
      const places = await repo.getPlaces()
      return { places }
    } catch (e) {
      context.error(e)
    }
  },
  data () {
    return {
      markers: [
        {
          position: {
            lat: 51.127956,
            lng: 18.285033
          }
        },
        {
          position: {
            lat: 52.127956,
            lng: 19.285033
          }
        }
      ],
      center: {
        lat: 52.127956,
        lng: 19.285033
      },
      markerIcons: google.markerIcons,
      styles: google.styles
    }
  },
  computed: {
    google: gmapApi,
    allMarkerRefNames () {
      const self = this
      return this.markers.map((value, i) => {
        return self.createMarkerRefName(i)
      })
    }
  },
  methods: {
    handleMarkerClick (e, markerRef) {
      const marker = this.$refs[markerRef][0].$markerObject

      this._resetAllMarkersStatuses()
      this._setMarkerActive(marker)
    },
    createMarkerRefName (index) {
      return 'main_map_marker_' + index
    },
    _setMarkerActive (markerRef) {
      markerRef.setIcon(this.markerIcons.active)
      markerRef.setAnimation(this.google.maps.Animation.BOUNCE)
    },
    _setMarkerInactive (markerRef) {
      markerRef.setIcon(this.markerIcons.default)
      markerRef.setAnimation(-1)
    },
    _resetAllMarkersStatuses () {
      const self = this
      this.allMarkerRefNames.forEach((markerRefName) => {
        self._setMarkerInactive(this.$refs[markerRefName][0].$markerObject)
      })
    }
  }
}
</script>
