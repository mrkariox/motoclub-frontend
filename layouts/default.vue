<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="isAsideActive"
      disable-resize-watcher
      app
      clipped
      fixed
    >
      <component :is="asideComponent" v-if="isAsideComponentReady" :props="asideComponentProps" />
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
    <fs-lightbox
      :toggler="galleryToggleFlag"
      :sources="imageUrlsArray"
      :types="imageUrlsArray.map(image=>{return 'image'})"
      :source-index="currentGalleryIndex"
    />
  </v-app>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { mapActions } from 'vuex'
import { AsideBarState } from '@/store/aside-bar'
import { AppBarState } from '@/store/app-bar'
import AppGallery from '~/mixins/AppGallery'

interface DataType {
  title: string
}

export default (Vue as VueConstructor<Vue & InstanceType<typeof AppGallery>>).extend({
  name: 'Default',
  mixins: [AppGallery],
  data: (): DataType => {
    return {
      title: 'Motoclub'
    }
  },
  computed: {
    isAsideActive: {
      get (): boolean {
        return (this.$store.state['aside-bar'] as AsideBarState).isActive
      },
      set (value: boolean) {
        this.changeAsideBarActiveState(value)
      }
    },
    isAsideComponentReady () {
      return (this.$store.state['aside-bar'] as AsideBarState).isAsideComponentReady
    },
    isNavButtonVisible () {
      return (this.$store.state['app-bar'] as AppBarState).isNavButtonVisible
    },
    asideComponent () {
      if (!(this.$store.state['aside-bar'] as AsideBarState).asideComponent) {
        return null
      }
      return () => import('../components/AsideModules/' + this.$store.state['aside-bar'].asideComponent)
    },
    asideComponentProps () {
      return (this.$store.state['aside-bar'] as AsideBarState).asideComponentProps
    }
  },
  methods: {
    ...mapActions({
      toggleAsideBar: 'aside-bar/toggleAsideBar',
      changeAsideBarActiveState: 'aside-bar/changeAsideBarActiveState'
    })
  }
})
</script>
