<template>
  <v-row v-if="images" no-gutters>
    <v-col
      v-for="(image, index) in images"
      :key="image.name"
      class="d-flex child-flex"
      cols="4"
    >
      <div class="cursor-pointer">
        <v-img
          :src="image.sizes['thumbnail-square']"
          aspect-ratio="1"
          @click="openGallery(index)"
        />
      </div>
    </v-col>
    <gallery-modal v-model="galleryShown" :images="images" :index="carouselIndex" />
  </v-row>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import GalleryModal from '@/components/GalleryModal.vue'
import { Image } from '~/types/Image'

const images: PropOptions<Image[]> = {
  required: true
}

export default Vue.extend({
  name: 'Gallery',
  components: { GalleryModal },
  props: {
    images
  },
  data () {
    return {
      galleryShown: false,
      carouselIndex: 0
    }
  },
  methods: {
    openGallery (index: number) {
      const self = this
      this.carouselIndex = index
      setTimeout(() => {
        self.galleryShown = true
      }, 200)
    }
  }
})
</script>
