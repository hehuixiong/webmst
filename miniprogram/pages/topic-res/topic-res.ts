const localTopicRes = require("../../data/topicRes")
const localTopicList = require("../../data/topicList")
import { setWatcher } from '../../utils/watch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    topic: '',
    answer: '',
    answerShow: false,
    first: false,
    last: false,
    topicIndex: 0,
    topicSum: 0,
    topicKey: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const { exerciseKey, title, index, topicKey } = wx.getStorageSync('queryTopic')
    this.setData({
      topic: localTopicRes?.topicRes[exerciseKey]?.topic,
      answer: localTopicRes?.topicRes[exerciseKey]?.answer,
      title: title,
      topicIndex: Number(index),
      topicKey: topicKey,
      topicSum: localTopicList.topicList[topicKey].length
    })
    this.setCurrentTopic(this.data.topicIndex)
    setWatcher(this)
  },

  watch: {
    // 需要监听的字段
    topicIndex(val: any) {
      this.setCurrentTopic(val)
    }
  },

  setCurrentTopic(val: any) {
    if (val === 0) {
      this.setData({ first: true })
    } else if (val === this.data.topicSum - 1) {
      this.setData({ last: true })
    } else {
      this.setData({
        first: false,
        last: false
      })
    }
    // 设置题目
    const { exerciseKey, title } = localTopicList?.topicList[this.data.topicKey][val]
    this.setData({
      topic: localTopicRes?.topicRes[exerciseKey]?.topic || '',
      answer: localTopicRes?.topicRes[exerciseKey]?.answer || '',
      title: title
    })
    // 回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  /**
   * 上一题
   */
  prevQuestion() {
    let val = this.data.topicIndex
    this.setData({ topicIndex: --val, answerShow: false })
  },
  /**
   * 下一题
   */
  nextQuestion() {
    let val = this.data.topicIndex
    this.setData({ topicIndex: ++val, answerShow: false })
  },

  onShowAnswer() {
    this.setData({ answerShow: true })
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