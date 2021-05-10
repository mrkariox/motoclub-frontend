import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Image } from '~/types/Image'

export const state = () => ({
  galleryToggleFlag: false as boolean,
  imagesForGallery: [] as Image[],
  currentGalleryIndex: 0 as number
})

export type AppGalleryState = ReturnType<typeof state>

export const getters: GetterTree<AppGalleryState, AppGalleryState> = {
  imageUrlsArray: state => state.imagesForGallery.map((image) => {
    return image.sizes['max-image-size']
  })
}

export const mutations: MutationTree<AppGalleryState> = {
  TOGGLE_GALLERY (state) {
    state.galleryToggleFlag = !state.galleryToggleFlag
  },
  SET_IMAGES_FOR_GALLERY (state, images: Image[]) {
    state.imagesForGallery = images
  },
  SET_CURRENT_GALLERY_INDEX (state, index: number) {
    state.currentGalleryIndex = index
  }
}

export const actions: ActionTree<AppGalleryState, AppGalleryState> = {
  toggleGallery ({ commit }) {
    commit('TOGGLE_GALLERY')
  },
  setImagesForGallery ({ commit }, images: Image[]) {
    commit('SET_IMAGES_FOR_GALLERY', images)
  },
  setCurrentGalleryIndex ({ commit }, index: number) {
    commit('SET_CURRENT_GALLERY_INDEX', index)
  }
}
