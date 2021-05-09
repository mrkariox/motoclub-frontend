import Vue from 'vue'
import { mapActions } from 'vuex'
import { MapState } from '~/store/map'

export default Vue.extend({
  computed: {
    isPolylineShown () {
      return (this.$store.state.map as MapState).isPolylineShown
    },
    placesForPolyline () {
      return (this.$store.state.map as MapState).placesForPolyline
    }
  },
  methods: {
    ...mapActions({
      togglePolyline: 'map/togglePolyline',
      setPlacesForPolyline: 'map/setPlacesForPolyline',
      changeIsPolylineShownFlag: 'map/changeIsPolylineShownFlag',
      setCurrentTripId: 'map/setCurrentTripId'
    })
  }
})
