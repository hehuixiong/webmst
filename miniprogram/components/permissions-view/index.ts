// components/permissions-view/index.ts
import { eventStore } from '../../store/index'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    permissions: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isVip: false,
    show: false,
    iosIsPay: false
  },

  attached() {
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
    eventStore.onState('iosIsPay', (value: any) => {
      this.setData({ iosIsPay: value })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showVip() {
      // 修改ios支付相关规则。
      if (app.globalSystemInfo && app.globalSystemInfo.ios) {
        if (this.data.iosIsPay) {
          wx.navigateTo({
            url: '/pages/vip/vip'
          })
        } else {
          wx.showModal({
            title: '友情提示',
            content: '由于相关规范，苹果IOS暂不可用',
            confirmText: '知道了',
            showCancel: false
          })
        }
        return
      }
      this.setData({ show: true })
    },
  }
})
