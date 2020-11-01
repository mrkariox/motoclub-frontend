<template>
  <v-col>
    <h2 class="text-h6">
      {{ content.title }}
    </h2>
    <div :v-html="content.description" />
    <gallery />
  </v-col>
</template>

<script>
import Gallery from '~/components/Gallery'

export default {
  name: 'Place',
  components: {
    Gallery
  },
  props: ['content']
}
</script>
