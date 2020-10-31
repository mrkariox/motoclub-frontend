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
      markerIcons: {
        default: {
          path: 'M 16.475 0 C 8.418 0.009 0.215 6.426 0.37 16.12 c 0.134 8.459 16.182 28.004 16.182 28.004 s 16.279 -18.19 16.078 -28.043 C 32.471 8.161 26.999 -0.012 16.475 0 Z M 17.813 6.689 c 3.433 0.438 5.669 2.244 7.337 5.18 c -1.671 1.561 -3.435 1.531 -5.229 0.635 C 17.897 11.494 17.201 9.567 17.813 6.689 Z M 16.5 13.862 c 1.209 0 2.19 0.981 2.19 2.19 c 0 1.209 -0.981 2.19 -2.19 2.19 c -1.208 0 -2.189 -0.981 -2.189 -2.19 C 14.311 14.843 15.292 13.862 16.5 13.862 Z M 15.125 6.785 c 0.789 2.316 0.209 4.222 -1.569 5.447 c -1.809 1.248 -3.712 1.138 -5.546 -0.318 C 9.436 8.885 11.795 7.157 15.125 6.785 Z M 9.812 23.047 c -2.364 -2.352 -3.278 -5.137 -2.748 -8.424 c 2.412 -0.131 3.978 0.859 4.736 2.924 C 12.569 19.639 11.95 21.42 9.812 23.047 Z M 12.004 24.642 c 0.62 -2.269 2.084 -3.354 4.226 -3.55 c 2.158 -0.197 3.748 0.957 4.832 3.552 C 17.969 26.129 15.037 26.183 12.004 24.642 Z M 23.109 23.091 c -1.916 -1.395 -2.705 -3.238 -1.92 -5.077 c 0.581 -1.36 2.004 -2.479 3.278 -3.388 c 1.06 -0.754 1.752 -0.048 1.726 1.208 C 26.135 18.61 25.331 21.068 23.109 23.091 Z',
          fillColor: 'white',
          fillOpacity: 1,
          scale: 1,
          strokeWeight: 0
        },
        active: {
          path: 'M 16.475 0 C 8.418 0.009 0.215 6.426 0.37 16.12 c 0.134 8.459 16.182 28.004 16.182 28.004 s 16.279 -18.19 16.078 -28.043 C 32.471 8.161 26.999 -0.012 16.475 0 Z M 17.813 6.689 c 3.433 0.438 5.669 2.244 7.337 5.18 c -1.671 1.561 -3.435 1.531 -5.229 0.635 C 17.897 11.494 17.201 9.567 17.813 6.689 Z M 16.5 13.862 c 1.209 0 2.19 0.981 2.19 2.19 c 0 1.209 -0.981 2.19 -2.19 2.19 c -1.208 0 -2.189 -0.981 -2.189 -2.19 C 14.311 14.843 15.292 13.862 16.5 13.862 Z M 15.125 6.785 c 0.789 2.316 0.209 4.222 -1.569 5.447 c -1.809 1.248 -3.712 1.138 -5.546 -0.318 C 9.436 8.885 11.795 7.157 15.125 6.785 Z M 9.812 23.047 c -2.364 -2.352 -3.278 -5.137 -2.748 -8.424 c 2.412 -0.131 3.978 0.859 4.736 2.924 C 12.569 19.639 11.95 21.42 9.812 23.047 Z M 12.004 24.642 c 0.62 -2.269 2.084 -3.354 4.226 -3.55 c 2.158 -0.197 3.748 0.957 4.832 3.552 C 17.969 26.129 15.037 26.183 12.004 24.642 Z M 23.109 23.091 c -1.916 -1.395 -2.705 -3.238 -1.92 -5.077 c 0.581 -1.36 2.004 -2.479 3.278 -3.388 c 1.06 -0.754 1.752 -0.048 1.726 1.208 C 26.135 18.61 25.331 21.068 23.109 23.091 Z',
          fillColor: '#f7bd20',
          fillOpacity: 1,
          scale: 1,
          strokeWeight: 0
        }
      },
      center: {
        lat: 52.127956,
        lng: 19.285033
      },
      styles: [
        {
          stylers: [
            {
              hue: '#ff1a00'
            },
            {
              invert_lightness: true
            },
            {
              saturation: -100
            },
            {
              lightness: 33
            },
            {
              gamma: 0.5
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#2D333C'
            }
          ]
        }
      ]
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
