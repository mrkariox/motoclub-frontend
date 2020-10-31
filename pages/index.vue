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

export default {
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
      const markers = []
      const self = this
      this.markers.forEach(function (value, i) {
        markers.push(self.createMarkerRefName(i))
      })
      return markers
    }
  },
  methods: {
    handleMarkerClick (e, markerRef) {
      const marker = this.$refs[markerRef][0].$markerObject

      this._resetAllMarkersStatuses()
      this._setMarkerActive(marker)
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
    },
    createMarkerRefName (index) {
      return 'main_map_marker_' + index
    }
  }
  // asyncData (context) {
  //   const id = context.params
  //   // try {
  //   //   // Using the nuxtjs/http module here exposed via context.app
  //   //   const post = await context.app.$axios.$get(
  //   //     `https://api.nuxtjs.dev/posts/${id}`
  //   //   )
  //   //   return { post }
  //   // } catch (e) {
  //   //   context.error(e) // Show the nuxt error page with the thrown error
  //   // }
  //   console.log(id)
  // }
}
</script>
