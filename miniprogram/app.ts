// app.ts
import { checkUpdateVersion } from './utils/update'
App<IAppOption>({
  globalData: {},
  onLaunch() {
    checkUpdateVersion()
  }
})