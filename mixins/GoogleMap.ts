import Vue from 'vue'
import { google as googleConfig } from '~/config/google'
import { Cords } from '~/types/Cords'

interface DataTypes {
  center: Cords,
  config: typeof googleConfig
}

export default Vue.extend({
  data: (): DataTypes => {
    return {
      center: {
        lat: 52.127956,
        lng: 19.285033
      },
      config: googleConfig
    }
  },
  methods: {
    reCenterMap (cords: Cords) {
      this.center = cords
    }
  }
})
