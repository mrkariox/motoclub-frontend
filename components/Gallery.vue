<template>
  <v-row v-if="images" no-gutters>
    <v-col
      v-for="(image, index) in images"
      :key="image.name"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        class="cursor-pointer"
        :src="image.sizes['thumbnail-square']"
        aspect-ratio="1"
        @click="handleImageClick(index)"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropOptions, VueConstructor } from 'vue'
import { Image } from '~/types/Image'
import AppGallery from '~/mixins/AppGallery'

const images: PropOptions<Image[]> = {
  required: true
}

export default (Vue as VueConstructor<Vue & InstanceType<typeof AppGallery>>).extend({
  name: 'Gallery',
  mixins: [AppGallery],
  props: {
    images
  },
  methods: {
    handleImageClick (index: number) {
      this.openGallery(this.images, index)
    }
  }
})
</script>
