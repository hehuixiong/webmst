// components/vip-popup/index.ts
import { eventStore } from '../../store/index'
const DEFAULT_Id = 3
const { getVipLevel, orderPay } = require('../../api/index')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    show: function (val) {
      if (val) {
        this.setData({
          currentId: DEFAULT_Id
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentId: DEFAULT_Id,
    vipList: []
  },

  attached() {
    this.getVipLevel()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getVipLevel() {
      getVipLevel().then((res: any) => {
        const vipList: any = res.data.map((item: any) => {
          if (item.title === '包月会员') {
            item.type_name = '普通会员'
            item.desc = '祝你面试马到功成'
          }
          if (item.title === '包年会员') {
            item.type_name = '钻石会员'
            item.desc = '祝你轻松拿到大offer'
          }
          if (item.title === '永久会员') {
            item.type_name = '至尊会员'
            item.desc = '祝你工作无忧又高薪'
          }
          return item
        })
        this.setData({ vipList: vipList })
      })
    },
    onClose() {
      this.setData({ show: false })
    },
    changeVip(e: any) {
      const { index } = e.currentTarget.dataset
      this.setData({
        currentId: Number(index)
      })
    },
    submitVip() {
      if (!wx.getStorageSync('loginState')) {
        wx.navigateTo({
          url: '/pages/login/login'
        })
        return
      }
      wx.showLoading({
        title: '请稍等...'
      })
      orderPay({ id: this.data.currentId }).then((res: any) => {
        const jsConfig = res.data
        const _this = this
        wx.requestPayment({
          appid: jsConfig.appid,
          timeStamp: jsConfig.timeStamp,
          nonceStr: jsConfig.nonceStr,
          package: jsConfig.package,
          signType: jsConfig.signType,
          paySign: jsConfig.paySign,
          success: function (res: any) {
            console.log(res)
            wx.hideLoading()
            _this.onClose()
            eventStore.dispatch('getUserInfo')
            wx.showModal({
              title: '提示',
              content: '已开通VIP功能',
              confirmText: '知道了',
              showCancel: false
            })
          },
          fail: function (e: any) {
            console.info(e)
            wx.hideLoading()
            console.log('取消支付')
          },
          complete: function () {
            const timer = setTimeout(() => {
              wx.hideLoading()
              clearTimeout(timer)
            }, 2000)
          }
        })
      })
    }
  }
})
