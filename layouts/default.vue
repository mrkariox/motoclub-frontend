<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="isAsideActive"
      disable-resize-watcher
      app
      clipped
      fixed
    >
      <component :is="asideComponent" />
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

export default {
  data () {
    return {
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
    isAsideActive: {
      get () {
        return this.$store.state['aside-bar'].isActive
      },
      set () {
        // required by v-navigation-drawer
      }
    },
    isNavButtonVisible () {
      return this.$store.state['app-bar'].isNavButtonVisible
    },
    asideComponent () {
      return this.$store.state['aside-bar'].asideComponent
    }
  },
  methods: {
    ...mapActions({
      toggleAsideBar: 'aside-bar/toggleAsideBar'
    })
  }
}
</script>
