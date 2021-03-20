<template>
  <v-dialog
    v-if="isVisible && images"
    v-model="isVisible"
    max-width="1280"
    content-class="bg-dark-gray"
  >
    <v-carousel :value="currentIndex" height="auto">
      <v-carousel-item
        v-for="(image,i) in images"
        :key="i"
        eager
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-img
          :src="image.sizes['max-image-size']"
          eager
        />
      </v-carousel-item>
    </v-carousel>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Image } from '~/types/Image'

const images: PropOptions<Image[]> = {
  type: Array
}

export default Vue.extend({
  name: 'GalleryModal',
  props: {
    value: Boolean,
    images,
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    isVisible: {
      get (): boolean {
        return this.value
      },
      set (): void {
        this.$emit('input', false)
      }
    },
    currentIndex () {
      return this.index ? this.index : 0
    }
  }
})
</script>
