<template>
  <v-col>
    {{ content.title }}
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
