import Vue from 'vue'
import { google as googleConfig } from '~/config/google'
import { Cords } from '~/types/Cords'

interface DataTypes {
  center: Cords,
  styles: typeof googleConfig.styles
}

export default Vue.extend({
  data: (): DataTypes => {
    return {
      center: {
        lat: 52.127956,
        lng: 19.285033
      },
      styles: googleConfig.styles
    }
  },
  methods: {
    reCenterMap (cords: Cords) {
      this.center = cords
    }
  }
})
