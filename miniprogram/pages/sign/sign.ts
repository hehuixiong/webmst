// pages/sign/sign.ts
const { qiandao } = require('../../api/index')
import { eventStore } from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSignin: false,
    isSign: false,
    configInfo: {},
    integral: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    eventStore.onState('isSign', (value: any) => {
      this.setData({ isSign: value })
    })
    eventStore.onState('configInfo', (value: any) => {
      this.setData({ configInfo: value })
    })
    eventStore.onState('integral', (value: any) => {
      this.setData({ integral: value })
    })
    if (!this.data.isSign) {
      this.qiandao()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  qiandao() {
    // 是否已签到
    if (this.data.isSign) {
      wx.showToast({
        title: '今日已经签到，不能重复获取积分',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '请稍等...'
    })
    qiandao().then((res: any) => {
      if (res.code === 200) {
        this.setData({
          showSignin: true
        })
        eventStore.dispatch('getUserInfo')
        wx.hideLoading()
        return
      }
    })
  },

  onwatch() {
    wx.showToast({
      title: '暂未开放',
      icon: 'none',
      duration: 2000
    })
  },

  onIntegral() {
    wx.navigateTo({
      url: '/pages/integral/integral'
    })
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

  }
})