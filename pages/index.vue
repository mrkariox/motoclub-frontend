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
      v-for="(m) in markers"
      :key="m.placeId"
      :ref="createMarkerRefName(m.placeId)"
      :position="m.position"
      :clickable="true"
      :visible="true"
      :icon="markerIcons.default"
      @click="handleMarkerClick($event, createMarkerRefName(m.placeId))"
    />
  </GmapMap>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
import { mapActions } from 'vuex'
import { google } from '~/config/google'
import PlacesRepository from '~/repositories/PlacesRepository'

export default {
  async fetch () {
    try {
      const repo = new PlacesRepository()
      this.places = await repo.getPlaces()
    } catch (e) {
      this.$nuxt.error({ statusCode: 404, message: e.message })
    }
  },
  data () {
    return {
      markerNameBase: 'main_map_marker_',
      places: [],
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
    markers () {
      const output = []
      const places = this.places
      for (const placeId in places) {
        if (!places[placeId].lat || !places[placeId].lng) {
          continue
        }
        output.push({
          placeId: places[placeId].id,
          position: {
            lat: places[placeId].lat,
            lng: places[placeId].lng
          }
        })
      }
      return output
    },
    allMarkerRefNames () {
      const self = this
      return this.markers.map((marker) => {
        return self.createMarkerRefName(marker.placeId)
      })
    }
  },
  methods: {
    handleMarkerClick (e, markerRef) {
      const marker = this.$refs[markerRef][0].$markerObject

      this._resetAllMarkersStatuses()
      this._setMarkerActive(marker)
      this._showPlaceContentInAsideBar(this._getPlaceIdFromMarkerName(markerRef))
    },
    createMarkerRefName (index) {
      return this.markerNameBase + index
    },
    _getPlaceIdFromMarkerName (markerRefName) {
      return markerRefName.replace(this.markerNameBase, '')
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
    _showPlaceContentInAsideBar (placeId) {
      this.changeAsideComponent({
        component: 'Place',
        props: {
          name: this.places[placeId].name,
          description: this.places[placeId].description
        }
      })
      this.changeNavButtonVisibility(true)
      this.changeAsideBarActiveState(true)
    },
    ...mapActions({
      changeAsideComponent: 'aside-bar/changeAsideComponent',
      changeAsideBarActiveState: 'aside-bar/changeAsideBarActiveState',
      changeAsideComponentProps: 'aside-bar/changeAsideComponentProps',
      changeNavButtonVisibility: 'app-bar/changeNavButtonVisibility'
    })
  }
}
</script>
