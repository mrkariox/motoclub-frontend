import { gmapApi } from 'vue2-google-maps'
import Vue from 'vue'
import { google as googleConfig } from '~/config/google'
import PlaceTransformer from '~/transformers/PlaceTransformer'
import { MapMarkerData } from '~/types/MapMarkerData'
import { PlacesState } from '~/store/places'
import { Cords } from '~/types/Cords'
import Marker = google.maps.Marker;
import Point = google.maps.Point;

interface DataTypes {
  markerNameBase: string
  center: Cords,
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
      styles: googleConfig.styles
    }
  },
  computed: {
    places () {
      return (this.$store.state.places as PlacesState).places
    },
    google (): { maps: typeof google.maps } {
      return gmapApi()
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
    reCenterMap (cords: Cords) {
      this.center = cords
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
    }
  }
})
