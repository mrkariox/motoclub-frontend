<template>
  <v-row v-if="images" no-gutters>
    <v-col
      v-for="image in images"
      :key="image"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="image.sizes['thumbnail-square']"
        aspect-ratio="1"
        class="grey lighten-2"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    images: Array
  }
}
</script>
