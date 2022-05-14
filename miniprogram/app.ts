// app.ts
import { checkUpdateVersion } from './utils/update'
import { eventStore } from './store/index'
App<IAppOption>({
  globalData: {
  },
  onLaunch() {
    checkUpdateVersion()
  },
  onShow() {
    eventStore.dispatch('getTopicCate')
  }
})
