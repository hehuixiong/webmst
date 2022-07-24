// pages/integral/integral.ts
const { duihuanma } = require('../../api/index')
import { eventStore } from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    configInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    eventStore.onState('configInfo', (value: any) => {
      this.setData({ configInfo: value })
    })
  },

  submit() {
    if (!this.data.value) {
      wx.showToast({
        title: '请输入兑换码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '请稍等...'
    })
    duihuanma({
      code: this.data.value
    }).then(() => {
      wx.showToast({
        title: '兑换成功',
        duration: 2000
      })
      this.setData({
        value: ''
      })
    })
  },

  bindInput(e: any) {
    this.setData({
      [e.currentTarget.dataset.key]: e.detail.value
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

  }
})