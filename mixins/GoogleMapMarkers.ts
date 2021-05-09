import Vue from 'vue'
import { gmapApi } from 'vue2-google-maps'
import { PlacesState } from '~/store/places'
import { MapMarkerData } from '~/types/MapMarkerData'
import PlaceTransformer from '~/transformers/PlaceTransformer'
import { google as googleConfig } from '~/config/google'

import Point = google.maps.Point;
import Marker = google.maps.Marker;

interface DataTypes {
  markerNameBase: string
}

export default Vue.extend({
  data: (): DataTypes => {
    return {
      markerNameBase: 'main_map_marker_'
    }
  },
  computed: {
    google (): { maps: typeof google.maps } {
      return gmapApi()
    },
    places () {
      return (this.$store.state.places as PlacesState).places
    },
    markers (): MapMarkerData[] {
      return PlaceTransformer.placesGroupToMapMarkerDataArray(this.places)
    },
    markerIcons (): {default: typeof googleConfig.markerIcons.default & {anchor: Point}, active: typeof googleConfig.markerIcons.active & {anchor: Point}} {
      return {
        default: { ...googleConfig.markerIcons.default, anchor: new this.google.maps.Point(16.5, 46) },
        active: { ...googleConfig.markerIcons.active, anchor: new this.google.maps.Point(16.5, 46) }
      }
    }
  },
  methods: {
    createMarkerRefName (index: number): string {
      return this.markerNameBase + index
    },
    setMarkerActive (markerRef: Marker): void {
      markerRef.setIcon(this.markerIcons.active)
      markerRef.setAnimation(this.google.maps.Animation.BOUNCE)
    },
    setMarkerInactive (markerRef: Marker): void {
      markerRef.setIcon(this.markerIcons.default)
      markerRef.setAnimation(-1)
    },
    resetAllMarkersStatuses (): void {
      const self = this
      this.markers.forEach((marker: MapMarkerData) => {
        self.setMarkerInactive((this.$refs[this.createMarkerRefName(marker.placeId)] as Array<Vue & {$markerObject: Marker}>)[0].$markerObject)
      })
    }
  }
})
