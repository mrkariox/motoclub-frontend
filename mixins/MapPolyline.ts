import Vue from 'vue'
import { PlacesState } from '~/store/places'

export default Vue.extend({
  computed: {
    isPolylineShown () {
      return (this.$store.state.places as PlacesState).isPolylineShown
    },
    placesForPolyline () {
      return (this.$store.state.places as PlacesState).placesForPolyline
    }
  }
})
