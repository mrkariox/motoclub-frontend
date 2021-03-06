<template>
  <v-col>
    <v-row justify="space-between">
      <v-col cols="9">
        <h2 class="text-h6 mb-3">
          {{ props.name }}
        </h2>
      </v-col>
      <v-col cols="3" class="d-flex" style="justify-content: flex-end">
        <v-tooltip right>
          <template v-slot:activator="{on}">
            <v-btn
              color="primary"
              elevation="2"
              fab
              x-small
              v-on="on"
              @click="handleShowTrackOnMap"
            >
              <v-icon
                dark
              >
                mdi-road-variant
              </v-icon>
            </v-btn>
          </template>
          {{ tooltipText }}
        </v-tooltip>
      </v-col>
    </v-row>
    <div v-if="props.description" class="text-body-2 mb-5">
      {{ props.description }}
    </div>
    <gallery :images="props.gallery" />
  </v-col>
</template>

<script lang="ts">
import Vue, { PropOptions, VueConstructor } from 'vue'
import Gallery from '@/components/Gallery.vue'
import { Image } from '~/types/Image'
import { PlacesState } from '~/store/places'
import GoogleMapPolyline from '~/mixins/GoogleMapPolyline'
import GoogleMapQueryParamHandlers from '~/mixins/GoogleMapQueryParamHandlers'

const props: PropOptions<{ placeId: number, name: string, description: string, gallery: Image[] }> = {
  required: true
}

export default (Vue as VueConstructor<Vue & InstanceType<typeof GoogleMapPolyline> & InstanceType<typeof GoogleMapQueryParamHandlers>>).extend({
  name: 'Place',
  components: {
    Gallery
  },
  mixins: [
    GoogleMapPolyline,
    GoogleMapQueryParamHandlers
  ],
  props: {
    props
  },
  computed: {
    tooltipText (): string {
      return this.isPolylineShown && this.isTripIdOfCurrentPlaceEqualToCurrentTripShownOnMap ? 'Ukryj trasę' : 'Pokaż całą trasę'
    },
    tripIdOfCurrentPlace (): number {
      return (this.$store.state.places as PlacesState).places[(this.props.placeId as number)].tripId
    },
    isTripIdOfCurrentPlaceEqualToCurrentTripShownOnMap (): boolean {
      return this.tripIdOfCurrentPlace === this.currentTripId
    }
  },
  methods: {
    handleShowTrackOnMap () {
      if (!this.isPolylineShown || !this.isTripIdOfCurrentPlaceEqualToCurrentTripShownOnMap) {
        if (this.setCurrentTripIdAndPlacesForPolyline(this.tripIdOfCurrentPlace)) {
          this.setCurrentTripIdQueryParam(this.tripIdOfCurrentPlace)
          return this.changeIsPolylineShownFlag(true)
        }
      }

      this.resetCurrentTripIdQueryParam()
      this.changeIsPolylineShownFlag(false)
    }
  }
})
</script>
