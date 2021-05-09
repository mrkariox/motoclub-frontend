<template>
  <div style="width: 100%; height: 100%; position: relative">
    <map-search-wrapper>
      <search
        :places="places"
        :active-place-id="activePlaceId"
        @change="handleSearchChange"
      />
    </map-search-wrapper>
    <gmap-map
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
        styles:config.styles,
        fullscreenControl: false
      }"
    >
      <gmap-marker
        v-for="(m) in markers"
        :key="m.placeId"
        :ref="createMarkerRefName(m.placeId)"
        :position="m.position"
        :clickable="true"
        :visible="true"
        :icon="markerIcons.default"
        @click="handleMarkerClick($event, m.placeId)"
      />
      <gmap-polyline v-if="isPolylineShown" :path="placesForPolyline" :editable="false" :options="config.polylineOptions" />
    </gmap-map>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { mapActions } from 'vuex'
import Search from '~/components/Search.vue'
import MapSearchWrapper from '~/components/MapSearchWrapper.vue'
import { PlacesState } from '~/store/places'
import GoogleMap from '~/mixins/GoogleMap'
import GoogleMapMarkers from '~/mixins/GoogleMapMarkers'
import GoogleMapPolyline from '~/mixins/GoogleMapPolyline'
import Marker = google.maps.Marker;

interface DataType {
  placeIdQueryParamName: string
}

export default (Vue as VueConstructor<Vue & InstanceType<typeof GoogleMap> & InstanceType<typeof GoogleMapMarkers> & InstanceType<typeof GoogleMapPolyline>>).extend({
  components: { MapSearchWrapper, Search },
  mixins: [
    GoogleMap,
    GoogleMapMarkers,
    GoogleMapPolyline
  ],
  data: (): DataType => {
    return {
      placeIdQueryParamName: 'place-id'
    }
  },
  computed: {
    activePlaceId (): number {
      return (this.$store.state.places as PlacesState).activePlaceId
    }
  },
  watch: {
    activePlaceId (placeId: number) {
      this.markerActivationAction(placeId)
    }
  },
  mounted () {
    this.fetchTrips().then((_trips) => {
      this.setActivePlaceIdFromQueryParam()
    })
  },
  methods: {
    handleSearchChange (placeId: number | null) {
      if (placeId !== null) {
        this.reCenterMap({ lat: this.places[placeId].lat, lng: this.places[placeId].lng })
        this.setActivePlace(placeId)
      }
    },
    handleMarkerClick (_event: Event, placeId: number): void {
      this.setActivePlace(placeId)
    },
    setActivePlaceIdFromQueryParam () {
      const placeIdFromQuery = this.$route.query[this.placeIdQueryParamName] as string
      if (placeIdFromQuery) {
        this.reCenterMap({ lat: this.places[parseInt(placeIdFromQuery)].lat, lng: this.places[parseInt(placeIdFromQuery)].lng })
        this.setActivePlace(parseInt(placeIdFromQuery))
      }
    },
    markerActivationAction (placeId: number) {
      this.resetAllMarkersStatuses()
      this.setMarkerActive((this.$refs[this.createMarkerRefName(placeId)] as Array<Vue & {$markerObject: Marker}>)[0].$markerObject)
      this.showPlaceContentInAsideBar(placeId)
      this.addActivePlaceIdQueryParam(placeId)
    },
    addActivePlaceIdQueryParam (placeId: number) {
      this.$router.push({ query: { [this.placeIdQueryParamName]: `${placeId}` } })
    },
    showPlaceContentInAsideBar (placeId: number): void {
      this.changeAsideComponent({
        component: 'Place',
        props: {
          placeId,
          name: this.places[placeId].name,
          description: this.places[placeId].description,
          gallery: this.places[placeId].gallery
        }
      })
      this.changeNavButtonVisibility(true)
      setTimeout(() => {
        this.changeAsideBarActiveState(true)
      }, 100)
    },
    ...mapActions({
      setActivePlace: 'places/setActivePlace',
      fetchTrips: 'places/fetchTrips',
      changeAsideComponent: 'aside-bar/changeAsideComponent',
      changeAsideBarActiveState: 'aside-bar/changeAsideBarActiveState',
      changeNavButtonVisibility: 'app-bar/changeNavButtonVisibility'
    })
  }
})
</script>
