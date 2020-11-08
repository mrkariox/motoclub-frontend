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
    <v-dialog
      v-model="galleryShown"
      max-width="1280"
      content-class="bg-dark-gray"
    >
      <v-carousel v-model="carouselIndex" height="auto">
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
  </v-row>
</template>

<script>
export default {
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
