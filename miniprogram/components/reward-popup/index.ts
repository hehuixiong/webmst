const { reward, rewardLog, orderPay, getVipLevel } = require('../../api/index')
import { checkNum } from '../../utils/util'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    priceList: [2, 5, 10, 20, 50, 100],
    otherPrice: 1,
    latelyList: [],
    vipList: [],
    otherShow: false,
    focus: true,
    price: null
  },

  observers: {
    show: function (val) {
      if (val) {
        this.rewardLog()
        this.getVipLevel()
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({ show: false })
    },
    onPay(e: any) {
      const { price } = e.currentTarget.dataset
      this.setData({
        price: price
      }, () => {
        this.rewardAuthor()
      })
    },
    rewardLog() {
      rewardLog().then((res: any) => {
        this.setData({
          latelyList: res.data
        })
      })
    },
    getVipLevel() {
      getVipLevel().then((res: any) => {
        let newVipList: any = []
        for (let i = 0; i < res.data.length; i++) {
          newVipList.push({ id: res.data[i].id, price: res.data[i].price })
        }
        this.setData({ vipList: newVipList})
      })
    },
    rewardAuthor() {
      if (!this.data.price) {
        return
      }
      const price = Number(this.data.price)
      if (price < 1) {
        wx.showToast({
          title: '最低打赏金额1元哦',
          icon:'none'
        })
        return
      }
      wx.showLoading({
        title: '请稍等...'
      })
      let payId = null
      for (let i = 0; i < this.data.vipList.length; i++) {
        if (price === Number(this.data.vipList[i].price)) {
          payId = this.data.vipList[i].id
        }
      }
      if (payId) {
        orderPay({ id: payId }).then((res: any) => {
          this.pullupPayment(res)
        })
      } else {
        reward({ price: price }).then((res: any) => {
          this.pullupPayment(res)
        })
      }
    },

    pullupPayment(res: any) {
      const _this = this
      const jsConfig = res.data
      wx.hideLoading()
      wx.requestPayment({
        appid: jsConfig.appid,
        timeStamp: jsConfig.timeStamp,
        nonceStr: jsConfig.nonceStr,
        package: jsConfig.package,
        signType: jsConfig.signType,
        paySign: jsConfig.paySign,
        success: function (res: any) {
          console.log(res)
          wx.showModal({
            title: '提示',
            content: '感谢支持，我会继续努力的',
            confirmText: '知道了',
            showCancel: false
          })
          _this.setData({
            price: null
          })
          _this.onClose()
        },
        fail: function (e: any) {
          console.info(e)
          wx.showToast({
            title: '打赏失败',
            icon: 'none',
            duration: 2000
          })
          _this.setData({
            price: null
          })
          console.log('取消支付')
        },
        complete: function () {
          const timer = setTimeout(() => {
            clearTimeout(timer)
          }, 2000)
        }
      })
    },
  
    bindInput(e: any) {
      this.setData({
        price: checkNum(e)
      })
    },
    onBlur() {
      this.setData({
        otherShow: false
      })
      this.rewardAuthor()
    },
    showOther() {
      this.setData({
        otherShow: true
      })
    }
  }
})
