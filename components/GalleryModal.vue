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

<script>
export default {
  name: 'GalleryModal',
  props: {
    value: Boolean,
    // eslint-disable-next-line
    images: Array,
    // eslint-disable-next-line
    index: Number
  },
  computed: {
    isVisible: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', false)
      }
    },
    currentIndex () {
      return this.index ? this.index : 0
    }
  }
}
</script>
