<template>
  <div class="search">
    <v-autocomplete
      :disabled="disabled"
      :items="searchItems"
      rounded
      solo
      clearable
      :value="activePlaceId"
      :no-data-text="noDataText"
      :placeholder="placeholderText"
      @change="handleChange"
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
  disabled: boolean
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
      placeholderText: 'Wyszukaj miejsce...',
      disabled: false
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
  },
  methods: {
    handleChange ($event: Event) {
      this.$emit('change', $event)
      this.unFocusInput()
    },
    unFocusInput () {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 100)
    }
  }
})
</script>
