<template>
  <div style="width: 100%; height: 100%; position: relative">
    <map-search-wrapper>
      <search
        :places="places"
        :active-place-id="activePlaceId"
        @change="handleSearchChange"
      />
    </map-search-wrapper>
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
        styles:styles,
        fullscreenControl: false
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
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { mapActions } from 'vuex'
import Search from '~/components/Search.vue'
import MapSearchWrapper from '~/components/MapSearchWrapper.vue'
import MapAndMarkers from '~/mixins/MapAndMarkers'
import { PlacesState } from '~/store/places'
import Marker = google.maps.Marker;

export default (Vue as VueConstructor<Vue & InstanceType<typeof MapAndMarkers>>).extend({
  components: { MapSearchWrapper, Search },
  mixins: [
    MapAndMarkers
  ],
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
    this.fetchPlaces()
  },
  methods: {
    handleSearchChange (placeId: number | null) {
      if (placeId !== null) {
        this.setActivePlace(placeId)
      }
    },
    handleMarkerClick (_event: Event, placeId: number): void {
      this.setActivePlace(placeId)
    },
    markerActivationAction (placeId: number) {
      this._resetAllMarkersStatuses()
      this._setMarkerActive((this.$refs[this.createMarkerRefName(placeId)] as Array<Vue & {$markerObject: Marker}>)[0].$markerObject)
      this._showPlaceContentInAsideBar(placeId)
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
