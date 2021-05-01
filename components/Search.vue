<template>
  <div class="search">
    <v-autocomplete
      :items="searchItems"
      rounded
      solo
      clearable
      :value="activePlaceId"
      :no-data-text="noDataText"
      :placeholder="placeholderText"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { PlaceGroup } from '~/types/PlaceGroup'
import Place from '~/models/Place'
import { AutocompleteItem } from '~/types/AutocompleteItem'

interface DataType {
  noDataText: string,
  placeholderText: string,
}

const places: PropOptions<PlaceGroup> = {
  required: true
}

const activePlaceId: PropOptions<number> = {
  required: true
}

export default Vue.extend({
  name: 'Search',
  props: {
    places,
    activePlaceId
  },
  data: (): DataType => {
    return {
      noDataText: 'Nie udało się odnaleźć takiego miejsca.',
      placeholderText: 'Wyszukaj miejsce...'
    }
  },
  computed: {
    searchItems (): AutocompleteItem[] {
      const items = []
      for (const placeId in this.places) {
        if (Object.prototype.hasOwnProperty.call(this.places, placeId)) {
          items.push({
            text: (this.places[placeId] as Place).name,
            value: (this.places[placeId] as Place).id
          })
        }
      }
      return items
    }
  }
})
</script>
