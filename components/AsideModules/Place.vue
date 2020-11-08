<template>
  <v-col>
    <h2 class="text-h6 mb-3">
      {{ content.name }}
    </h2>
    <div v-if="content.description" class="text-body-2 pb-2">
      {{ content.description }}
    </div>
    <gallery :images="content.gallery" />
  </v-col>
</template>

<script>
import Gallery from '~/components/Gallery'

export default {
  name: 'Place',
  components: {
    Gallery
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    content: Object
  }
}
</script>
