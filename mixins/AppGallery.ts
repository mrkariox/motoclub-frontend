import Vue from 'vue'
import { mapActions } from 'vuex'
import FsLightbox from 'fslightbox-vue'
import { getters, AppGalleryState } from '~/store/app-gallery'
import { Image } from '~/types/Image'

export default Vue.extend({
  components: { FsLightbox },
  computed: {
    galleryToggleFlag (): boolean {
      return (this.$store.state['app-gallery'] as AppGalleryState).galleryToggleFlag
    },
    imagesForGallery (): Image[] {
      return (this.$store.state['app-gallery'] as AppGalleryState).imagesForGallery
    },
    imageUrlsArray (): string[] {
      return this.$store.getters['app-gallery/imageUrlsArray'] as ReturnType<typeof getters.imageUrlsArray>
    },
    currentGalleryIndex (): number {
      return (this.$store.state['app-gallery'] as AppGalleryState).currentGalleryIndex
    }
  },
  methods: {
    openGallery (images: Image[], index: number) {
      this.setCurrentGalleryIndex(index)
      this.setImagesForGallery(images)
      this.toggleGallery()
    },
    ...mapActions({
      toggleGallery: 'app-gallery/toggleGallery',
      setImagesForGallery: 'app-gallery/setImagesForGallery',
      setCurrentGalleryIndex: 'app-gallery/setCurrentGalleryIndex'
    })
  }
})
