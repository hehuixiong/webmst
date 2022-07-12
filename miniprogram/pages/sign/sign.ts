// pages/sign/sign.ts
const { qiandao, readVideo } = require('../../api/index')
import { eventStore } from '../../store/index'
// 在页面中定义激励视频广告
let rewardedVideoAd: any = null
let videoAdPushStatus = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSignin: false,
    isSign: false,
    isVideo: false,
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
    eventStore.onState('isVideo', (value: any) => {
      this.setData({ isVideo: value })
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

    this.showRewardedVideoAd()
  },

  showRewardedVideoAd() {
    if (wx.createRewardedVideoAd) {
      rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-92cc5ea0105da417'
      })
      rewardedVideoAd.onLoad(() => {
        videoAdPushStatus = true
        console.log('onload rewardedVideoAd')
      })
      rewardedVideoAd.onError((err: any) => {
        console.log('onError rewardedVideoAd', err)
      })
      rewardedVideoAd.onClose((res: any) => {
        console.log('onClose rewardedVideoAd', res)
        if (res && res.isEnded) {
          console.log('观看完成')
          this.exeVideo()
        }
      })
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

  exeVideo() {
    wx.showLoading({
      title: '请稍等...'
    })
    readVideo().then((res: any) => {
      if (res.code === 200) {
        const { video_jifen }: any = this.data.configInfo
        wx.showToast({
          title: `观看成功，获取${video_jifen}积分`,
          icon: 'none',
          duration: 2000
        })
        eventStore.dispatch('getUserInfo')
        return
      }
    })
  },

  onVideo() {
    if (this.data.isVideo) {
      wx.showToast({
        title: '今日已经观看，不能重复获取积分',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (rewardedVideoAd && videoAdPushStatus) {
      rewardedVideoAd.show().catch(() => {
        // 失败重试
        rewardedVideoAd.load()
          .then(() => rewardedVideoAd.show())
          .catch(() => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  },

  goVip() {
    wx.navigateTo({
      url: '/pages/vip/vip'
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