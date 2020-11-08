<template>
  <v-row v-if="images" no-gutters>
    <v-col
      v-for="(image, index) in images"
      :key="image.name"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="image.sizes['thumbnail-square']"
        aspect-ratio="1"
        @click="openGallery(index)"
      />
    </v-col>
    <gallery-modal v-model="galleryShown" :images="images" :index="carouselIndex" />
  </v-row>
</template>

<script>
import GalleryModal from '@/components/GalleryModal'
export default {
  components: { GalleryModal },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    images: Array
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
}
</script>
