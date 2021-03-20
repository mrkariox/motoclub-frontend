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
import Vue, { PropType } from 'vue'
import GalleryModal from '@/components/GalleryModal'
import { Image } from '~/types/Image'

export default Vue.extend({
  components: { GalleryModal },
  props: {
    images: {
      type: Array as PropType<Image[]>,
      required: true
    }
  },
  data () {
    return {
      galleryShown: false,
      carouselIndex: 0
    }
  },
  methods: {
    openGallery (index) {
      const self = this
      this.carouselIndex = index
      setTimeout(() => {
        self.galleryShown = true
      }, 200)
    }
  }
})
</script>
