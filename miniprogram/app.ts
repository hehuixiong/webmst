// app.ts
import { checkUpdateVersion } from './utils/update'
import { eventStore } from './store/index'
App<IAppOption>({
  globalData: {
  },
  onLaunch() {
    checkUpdateVersion()
  },
  async onShow() {
    await eventStore.dispatch('getTopicCate')
    await eventStore.dispatch('getUserInfo')
  }
})
/**
 * {
      "pagePath": "pages/vip/vip",
      "text": "增值",
      "iconPath": "images/icon_vip.png",
      "selectedIconPath": "images/icon_vip_active.png"
    },
 */