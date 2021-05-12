import Vue, { VueConstructor } from 'vue'
import { mapActions } from 'vuex'
import { QueryParam } from '~/enums/QueryParam'
import GoogleMapMarkers from '~/mixins/GoogleMapMarkers'
import GoogleMapPolyline from '~/mixins/GoogleMapPolyline'
import GoogleMap from '~/mixins/GoogleMap'

export default (Vue as VueConstructor<Vue & InstanceType<typeof GoogleMap> & InstanceType<typeof GoogleMapMarkers> & InstanceType<typeof GoogleMapPolyline>>).extend({
  mixins: [
    GoogleMapMarkers,
    GoogleMapPolyline
  ],
  methods: {
    // Loads query params
    setActivePlaceIdFromQueryParam () {
      const placeIdFromQuery = this.$route.query[QueryParam.PLACE_ID] as string
      if (placeIdFromQuery) {
        this.reCenterMap({ lat: this.places[parseInt(placeIdFromQuery)].lat, lng: this.places[parseInt(placeIdFromQuery)].lng })
        this.setActivePlace(parseInt(placeIdFromQuery))
      }
    },
    setTripIdAndMapPolylineFromQueryParam () {
      const tripIdFromQuery = this.$route.query[QueryParam.TRIP_ID] as string

      if (tripIdFromQuery) {
        this.setCurrentTripIdAndPlacesForPolyline(parseInt(tripIdFromQuery))
        this.changeIsPolylineShownFlag(true)
      }
    },
    // Changes query params
    addActivePlaceIdQueryParam (placeId: number) {
      const currentQuery = this.$route.query
      this.$router.push({ query: { ...currentQuery, [QueryParam.PLACE_ID]: `${placeId}` } })
    },
    setCurrentTripIdQueryParam (tripId: number) {
      const currentQuery = this.$route.query
      this.$router.push({ query: { ...currentQuery, [QueryParam.TRIP_ID]: `${tripId}` } })
    },
    resetCurrentTripIdQueryParam () {
      const currentQuery = this.$route.query
      this.$router.push({ query: { ...currentQuery, [QueryParam.TRIP_ID]: null } })
    },
    ...mapActions({
      setActivePlace: 'places/setActivePlace'
    })
  }
})
