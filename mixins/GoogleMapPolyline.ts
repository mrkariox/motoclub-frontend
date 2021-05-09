import Vue from 'vue'
import { mapActions } from 'vuex'
import { PlacesState } from '~/store/places'

export default Vue.extend({
  computed: {
    isPolylineShown () {
      return (this.$store.state.places as PlacesState).isPolylineShown
    },
    placesForPolyline () {
      return (this.$store.state.places as PlacesState).placesForPolyline
    }
  },
  methods: {
    ...mapActions({
      togglePolyline: 'places/togglePolyline',
      setPlacesForPolyline: 'places/setPlacesForPolyline',
      changeIsPolylineShownFlag: 'places/changeIsPolylineShownFlag'
    })
  }
})
