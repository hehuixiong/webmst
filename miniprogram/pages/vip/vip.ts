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
    isIos: false,
    userInfo: {},
    configInfo: {},
    active: 3,
    loginState: false,
    showgroup: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (app.globalSystemInfo && app.globalSystemInfo.ios) {
      this.setData({ isIos: true })
    }
    eventStore.onState('configInfo', (value: any) => {
      this.setData({ configInfo: value })
    })
    eventStore.onState('showgroup', (value: any) => {
      this.setData({ showgroup: value })
    })
    this.getVipLevel()
    this.setUserInfo()
  },

  selectVip(e: any) {
    const { id } = e.currentTarget.dataset
    this.setData({ active: id })
  },

  getVipLevel() {
    getVipLevel().then((res: any) => {
      console.log(res)
      let newVipList: any = []
      res.data.map((item: any) => {
        if (item.title === '月度VIP') {
          item.raw_price = 29
        }
        if (item.title === '年度VIP') {
          item.raw_price = 59
        }
        if (item.title === '永久VIP') {
          item.raw_price = 99
        }
        item.price = Number(item.price).toFixed(0)
        newVipList.unshift(item)
        console.log(item)
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

  setUserInfo() {
    const loginState = wx.getStorageSync('loginState')
    this.setData({ loginState })
    if (loginState) {
      eventStore.dispatch('getUserInfo')
      eventStore.onState('userInfo', (value: any) => {
        this.setData({ userInfo: { avatarUrl: value.head_pic, nickName: value.nick_name } })
      })
    }
  },

  onLogin() {
    eventStore.dispatch('login', () => {
      this.setUserInfo()
    })
  },

  submitVip() {
    if (!wx.getStorageSync('loginState')) {
      this.onLogin()
      return
    }
    wx.showLoading({
      title: '请稍等...'
    })
    orderPay({ id: this.data.active }).then((res: any) => {
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
            content: '支付成功，已成为VIP',
            confirmText: '知道了',
            showCancel: false
          })
        },
        fail: function (e: any) {
          console.info(e)
          wx.showToast({
            title: '支付失败',
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