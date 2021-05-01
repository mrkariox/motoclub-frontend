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
import { MapMarkerData } from '~/types/MapMarkerData'
import { PlacesState } from '~/store/places'
import Marker = google.maps.Marker;

interface DataTypes {
  markerNameBase: string
  center: {
    lat: number,
    lng: number
  },
  markerIcons: typeof googleConfig.markerIcons,
  styles: typeof googleConfig.styles
}

export default Vue.extend({
  data: (): DataTypes => {
    return {
      markerNameBase: 'main_map_marker_',
      center: {
        lat: 52.127956,
        lng: 19.285033
      },
      markerIcons: googleConfig.markerIcons,
      styles: googleConfig.styles
    }
  },
  computed: {
    places () {
      return (this.$store.state.places as PlacesState).places
    },
    activePlaceId () {
      return (this.$store.state.places as PlacesState).activePlaceId
    },
    google (): { maps: typeof google.maps } {
      return gmapApi()
    },
    markers (): MapMarkerData[] {
      return PlaceTransformer.placesGroupToMapMarkerDataArray(this.places)
    }
  },
  watch: {
    activePlaceId (placeId: number) {
      this.markerActivationAction(placeId)
    }
  },
  mounted () {
    this.fetchPlaces()
  },
  methods: {
    handleMarkerClick (_event: Event, placeId: number): void {
      this.setActivePlace(placeId)
    },
    markerActivationAction (placeId: number) {
      this._resetAllMarkersStatuses()
      this._setMarkerActive((this.$refs[this.createMarkerRefName(placeId)] as Array<Vue & {$markerObject: Marker}>)[0].$markerObject)
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
        self._setMarkerInactive((this.$refs[this.createMarkerRefName(marker.placeId)] as Array<Vue & {$markerObject: Marker}>)[0].$markerObject)
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
      fetchPlaces: 'places/fetchPlaces',
      setActivePlace: 'places/setActivePlace',
      changeAsideComponent: 'aside-bar/changeAsideComponent',
      changeAsideBarActiveState: 'aside-bar/changeAsideBarActiveState',
      changeNavButtonVisibility: 'app-bar/changeNavButtonVisibility'
    })

  }
})
</script>
