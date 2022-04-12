// pages/topic/topic.ts
const localTopic = require("../../data/topicList")
import { NAV_TYPES } from '../../utils/constant'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicList: [],
    topicKey: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ type, name }) {
    const index = Object.values(NAV_TYPES).filter((item) => item === Number(type))[0]
    const key = Object.keys(NAV_TYPES)[index]
    if (key.toString() === 'all') {
      let topicList: any = []
      Object.values(localTopic.topicList).forEach((item: any) => item.map((v: any) => topicList.push(v)))
      this.setData({
        topicList: topicList,
        topicKey: key
      })
    } else {
      this.setData({
        topicList: localTopic.topicList[key],
        topicKey: key
      })
    }
    // 动态改变标题
    wx.setNavigationBarTitle({
      title: name || ''
    })
  },
  /**
   * 题目跳转
   */
  handleJump(e: any) {
    const { exercisekey, title, index } = e.currentTarget.dataset
    const queryTopic = {
      exerciseKey: exercisekey,
      topicKey: this.data.topicKey,
      title: title,
      index: index
    }
    // 添加缓存
    wx.setStorageSync('queryTopic', queryTopic)
    wx.navigateTo({
      url: '/pages/topic-res/topic-res'
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

  }
})