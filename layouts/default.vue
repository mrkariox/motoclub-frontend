<template>
  <v-app dark>
    <v-navigation-drawer
      :value="isAsideActive"
      disable-resize-watcher
      app
      clipped
      fixed
    >
      <component :is="asideComponent" :content="asideComponentProps" />
    </v-navigation-drawer>
    <v-app-bar
      fixed
      clipped-left
      app
    >
      <v-app-bar-nav-icon
        v-if="isNavButtonVisible"
        @click="toggleAsideBar"
      />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <nuxt keep-alive />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
// eslint-disable-next-line no-unused-vars
import Place from '~/components/AsideModules/Place'

export default {
  data () {
    return {
      place: Place,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Motoclub'
    }
  },
  computed: {
    isAsideActive () {
      return this.$store.state['aside-bar'].isActive
    },
    isNavButtonVisible () {
      return this.$store.state['app-bar'].isNavButtonVisible
    },
    asideComponent () {
      return this[this.$store.state['aside-bar'].asideComponent]
    },
    asideComponentProps () {
      return this.$store.state['aside-bar'].asideComponentProps
    }
  },
  methods: {
    ...mapActions({
      toggleAsideBar: 'aside-bar/toggleAsideBar'
    })
  }
}
</script>
