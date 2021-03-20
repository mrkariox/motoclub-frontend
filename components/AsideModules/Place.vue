<template>
  <v-col>
    <h2 class="text-h6 mb-3">
      {{ props.name }}
    </h2>
    <div v-if="props.description" class="text-body-2 mb-5">
      {{ props.description }}
    </div>
    <gallery :images="props.gallery" />
  </v-col>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Gallery from '~/components/Gallery'
import { Image } from '~/types/Image'

interface Props {
  name: string, description: string, gallery: Image[]
}
export default Vue.extend({
  name: 'Place',
  components: {
    Gallery
  },
  props: {
    props: {
      type: Object as PropType<Props>,
      required: true
    }
  }
})
</script>
