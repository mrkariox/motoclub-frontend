import { gmapApi } from 'vue2-google-maps'
import Vue from 'vue'
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
    google (): { maps: typeof google.maps } {
      return gmapApi()
    },
    markers (): MapMarkerData[] {
      return PlaceTransformer.placesGroupToMapMarkerDataArray(this.places)
    }
  },
  methods: {
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
    }
  }
})
