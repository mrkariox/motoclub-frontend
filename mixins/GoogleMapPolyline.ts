import Vue from 'vue'
import { mapActions } from 'vuex'
import { MapState } from '~/store/map'
import { PlacesState } from '~/store/places'
import PlaceTransformer from '~/transformers/PlaceTransformer'

export default Vue.extend({
  computed: {
    currentTripId () {
      return (this.$store.state.map as MapState).currentTripId
    },
    isPolylineShown () {
      return (this.$store.state.map as MapState).isPolylineShown
    },
    placesForPolyline () {
      return (this.$store.state.map as MapState).placesForPolyline
    }
  },
  methods: {
    setCurrentTripIdAndPlacesForPolyline (tripId: number): boolean {
      const placesForPolyLine = (this.$store.state.places as PlacesState).trips.find((trip) => {
        return trip.id === tripId
      })?.places

      if (placesForPolyLine) {
        this.setCurrentTripId(tripId)
        this.setPlacesCoordsForPolyline(
          PlaceTransformer.placesGroupToCoordsArray(placesForPolyLine)
        )
        return true
      }
      return false
    },
    ...mapActions({
      togglePolyline: 'map/togglePolyline',
      setPlacesCoordsForPolyline: 'map/setPlacesCoordsForPolyline',
      changeIsPolylineShownFlag: 'map/changeIsPolylineShownFlag',
      setCurrentTripId: 'map/setCurrentTripId'
    })
  }
})
