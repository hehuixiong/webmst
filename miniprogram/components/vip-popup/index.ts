const app = getApp()
import { eventStore } from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean
    },
    title: {
      type: String,
      value: '您当前不是VIP'
    },
    desc: {
      type: String,
      value: '开通后即可查看所有功能'
    },
    noTab: {
      type: Boolean,
      value: true
    },
    sign: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIos: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({
        show: false
      })
      this.triggerEvent('childFun')
    },
    jumpVip() {
      this.setData({
        show: false
      })
      eventStore.onState('iosIsPay', (value: any) => {
        if (value && app.globalSystemInfo && app.globalSystemInfo.ios) {
          wx.openCustomerServiceChat({
            extInfo: {
              url: 'https://work.weixin.qq.com/kfid/kfcd822498b9774ec8f'
            },
            corpId: 'wwcd77693eaf9afee3'
          })
        } else {
          wx.navigateTo({
            url: '/pages/vip/vip'
          })
        }
      })
    },
    goSign() {
      this.setData({
        show: false
      })
      wx.navigateTo({
        url: '/pages/sign/sign'
      })
    }
  }
})
