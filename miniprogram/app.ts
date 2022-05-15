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
