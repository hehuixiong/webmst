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
    topicKey: '',
    level: 0,
    updateAt: '',
    loading: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const { exerciseKey, title, index, topicKey, level, updateAt } = wx.getStorageSync('queryTopic')
    this.setData({
      topic: localTopicRes?.topicRes[exerciseKey]?.topic,
      answer: localTopicRes?.topicRes[exerciseKey]?.answer,
      title: title,
      topicIndex: Number(index),
      topicKey: topicKey,
      topicSum: localTopicList.topicList[topicKey].length,
      level: level,
      updateAt: updateAt
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
    // 回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    this.setData({ loading: true })
    const timer = setTimeout(() => {
      // 设置题目
      const { exerciseKey, title } = localTopicList?.topicList[this.data.topicKey][val]
      this.setData({
        topic: localTopicRes?.topicRes[exerciseKey]?.topic || '',
        answer: localTopicRes?.topicRes[exerciseKey]?.answer || '',
        title: title,
        loading: false
      })
      clearTimeout(timer)
    }, Math.floor(Math.random() * (500 - 100) + 100))
  },
  /**
   * 上一题
   */
  prevQuestion() {
    if (this.data.loading) return
    let val = this.data.topicIndex
    this.setData({ topicIndex: --val, answerShow: false })
  },
  /**
   * 下一题
   */
  nextQuestion() {
    if (this.data.loading) return
    if (this.data.last) {
      wx.showModal({
        title: '提示',
        content: '已经到最后一题啦，题材不定期更新哦~',
        confirmText: '返回列表',
        confirmColor: '#57bd6a',
        success (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
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