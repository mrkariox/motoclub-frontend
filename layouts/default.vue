<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="isAsideActive"
      disable-resize-watcher
      app
      clipped
      fixed
    >
      <component :is="asideComponent" v-if="isAsideComponentReady" :content="asideComponentProps" />
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
      title: 'Motoclub'
    }
  },
  computed: {
    isAsideActive: {
      get () {
        return this.$store.state['aside-bar'].isActive
      },
      set (value) {
        this.changeAsideBarActiveState(value)
      }
    },
    isAsideComponentReady () {
      return this.$store.state['aside-bar'].isAsideComponentReady
    },
    isNavButtonVisible () {
      return this.$store.state['app-bar'].isNavButtonVisible
    },
    asideComponent () {
      if (!this.$store.state['aside-bar'].asideComponent) {
        return
      }
      return () => import('../components/AsideModules/' + this.$store.state['aside-bar'].asideComponent)
    },
    asideComponentProps () {
      return this.$store.state['aside-bar'].asideComponentProps
    }
  },
  methods: {
    ...mapActions({
      toggleAsideBar: 'aside-bar/toggleAsideBar',
      changeAsideBarActiveState: 'aside-bar/changeAsideBarActiveState'
    })
  }
}
</script>
