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
      @click="handleMarkerClick($event, m.placeId)"
    />
  </GmapMap>
</template>

<script lang="ts">
import { gmapApi } from 'vue2-google-maps'
import Vue from 'vue'
import { mapActions } from 'vuex'
import { google as googleConfig } from '~/config/google'
import PlaceTransformer from '~/transformers/PlaceTransformer'
import { PlaceGroup } from '~/types/PlaceGroup'
import { MapMarkerData } from '~/types/MapMarkerData'
import Marker = google.maps.Marker;

export default Vue.extend({
  async fetch () {
    try {
      this.places = await this.$placesRepository.getPlaces()
    } catch (e) {
      this.$nuxt.error({ statusCode: 404, message: e.message })
    }
  },
  data () {
    return {
      places: {} as PlaceGroup,
      markerNameBase: 'main_map_marker_' as string,
      center: {
        lat: 52.127956,
        lng: 19.285033
      },
      markerIcons: googleConfig.markerIcons,
      styles: googleConfig.styles
    }
  },
  computed: {
    google (): { maps: typeof google.maps } {
      return gmapApi
    },
    markers (): MapMarkerData[] {
      return PlaceTransformer.placesGroupToMapMarkerDataArray(this.places)
    }
  },
  methods: {
    handleMarkerClick (_event: Event, placeId: number): void {
      this._resetAllMarkersStatuses()
      this._setMarkerActive((this.$refs[this.createMarkerRefName(placeId)] as Vue[] & Array<{$markerObject: Marker}>)[0].$markerObject)
      this._showPlaceContentInAsideBar(placeId)
    },
    createMarkerRefName (index: number): string {
      return this.markerNameBase + index
    },
    _setMarkerActive (markerRef: Marker): void {
      markerRef.setIcon(this.markerIcons.active)
      markerRef.setAnimation(this.google.maps.Animation.BOUNCE)
    },
    _setMarkerInactive (markerRef: Marker): void {
      markerRef.setIcon(this.markerIcons.default)
      markerRef.setAnimation(-1)
    },
    _resetAllMarkersStatuses (): void {
      const self = this
      this.markers.forEach((marker: MapMarkerData) => {
        self._setMarkerInactive((this.$refs[this.createMarkerRefName(marker.placeId)] as Vue[] & Array<{$markerObject: Marker}>)[0].$markerObject)
      })
    },
    _showPlaceContentInAsideBar (placeId: number): void {
      this.changeAsideComponent({
        component: 'Place',
        props: {
          name: this.places[placeId].name,
          description: this.places[placeId].description,
          gallery: this.places[placeId].gallery
        }
      })
      this.changeNavButtonVisibility(true)
      this.changeAsideBarActiveState(true)
    },
    ...mapActions({
      changeAsideComponent: 'aside-bar/changeAsideComponent',
      changeAsideBarActiveState: 'aside-bar/changeAsideBarActiveState',
      changeNavButtonVisibility: 'app-bar/changeNavButtonVisibility'
    })

  }
})
</script>
