// pages/vip/vip.ts
import { eventStore } from '../../store/index'
const { getVipLevel, orderPay } = require('../../api/index')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipList: [],
    iosIsPay: false,
    isIos: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getVipLevel()
    eventStore.onState('iosIsPay', (value: any) => {
      this.setData({ iosIsPay: value })
    })
    if (app.globalSystemInfo && app.globalSystemInfo.ios) {
      this.setData({ isIos: true })
    }
  },
  showPrivilege(e: any) {
    const { title, content, desc } = e.currentTarget.dataset.item
    wx.showModal({
      title: title,
      content: content + desc,
      confirmText: '知道了',
      showCancel: false
    })
  },

  getVipLevel() {
    getVipLevel().then((res: any) => {
      console.log(res)
      let newVipList: any = []
      res.data.map((item: any) => {
        if (item.title === '月度VIP') {
          item.desc = '祝你面试马到功成'
        }
        if (item.title === '年度VIP') {
          item.desc = '祝你轻松拿到大offer'
        }
        if (item.title === '永久VIP') {
          item.desc = '祝你工作无忧又高薪'
        }
        item.price = Number(item.price).toFixed(0)
        if (item.title !== '月度VIP') {
          newVipList.unshift(item)
        }
      })
      this.setData({ vipList: newVipList })
    })
  },
  copyWX() {
    wx.setClipboardData({
      data: 'NetEngine666',
      success: function () {
        wx.getClipboardData({
          //这个api是把拿到的数据放到电脑系统中的
          success: function () {
            wx.showToast({
              title: '微信号已复制',
              icon: 'none'
            })
          }
        })
      }
    })
  },

  submitVip(e: any) {
    if (!wx.getStorageSync('loginState')) {
      eventStore.dispatch('login')
      return
    }
    wx.showLoading({
      title: '请稍等...'
    })
    const { id } = e.currentTarget.dataset
    orderPay({ id }).then((res: any) => {
      wx.hideLoading()
      const jsConfig = res.data
      wx.requestPayment({
        appid: jsConfig.appid,
        timeStamp: jsConfig.timeStamp,
        nonceStr: jsConfig.nonceStr,
        package: jsConfig.package,
        signType: jsConfig.signType,
        paySign: jsConfig.paySign,
        success: function () {
          eventStore.dispatch('getUserInfo')
          wx.showModal({
            title: '提示',
            content: '赞赏成功，已成为VIP',
            confirmText: '知道了',
            showCancel: false
          })
        },
        fail: function (e: any) {
          console.info(e)
          wx.showToast({
            title: '赞赏失败',
            icon: 'none',
            duration: 2000
          })
          console.log('取消支付')
        },
        complete: function () {
          const timer = setTimeout(() => {
            clearTimeout(timer)
          }, 2000)
        }
      })
    })
  },

  showImg(e: any) {
    let { src } = e.currentTarget.dataset
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return{
      title: '大厂前端面试题，悄悄分享给你！',
      imageUrl: 'https://s-gz-2804-hero-image.oss.dogecdn.com/20220427140039.png'
    }
  }
})