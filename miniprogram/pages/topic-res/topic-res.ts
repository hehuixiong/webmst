import { handleTime } from '../../utils/util'
const { getTopicInfo } = require('../../api/index')
import { setWatcher } from '../../utils/watch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    topic: '',
    choice: '',
    answer: '',
    level: 0,
    create_time: '',
    answerShow: false,
    first: false,
    last: false,
    topicIndex: 0,
    topicSum: 0,
    loading: false,
    id: 0,
    next_id: 0,
    prev_id: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const { index, id, topicSum } = wx.getStorageSync('queryTopic')
    this.setData({
      topicIndex: Number(index),
      topicSum: topicSum,
      id: id
    })
    this.setCurrentTopic(index)
    setWatcher(this)
  },

  watch: {
    // 需要监听的字段
    topicIndex(newIndex: any) {
      this.setCurrentTopic(newIndex)
    }
  },
  getTopicInfo() {
    this.setData({ loading: true })
    getTopicInfo({id: this.data.id}).then((res: any) => {
      if (res.data.problem) {
        res.data.problem = res.data.problem.replace(/<button class="copyBtn___3UMAO">复制<\/button>/gi, () => {
          return ''
        })
        res.data.problem = res.data.problem.replace(/<span class="linenumber/gi, () => {
          return '\n<span class="linenumber'
        })
        res.data.problem = res.data.problem.replace(/<span class="linenumber react-syntax-highlighter-line-number" style="display: inline-block; min-width: (0|[1-9][0-9]*|-[1-9][0-9]*).25em; padding-right: 1em; text-align: right; user-select: none; color: rgb\(124, 124, 124\);">(0|[1-9][0-9]*|-[1-9][0-9]*)<\/span>/gi, () => {
          return ''
        })
      }
      if (res.data.content) {
        res.data.content = res.data.content.replace(/<button class="copyBtn___3UMAO">复制<\/button>/gi, () => {
          return ''
        })
        res.data.content = res.data.content.replace(/<span class="linenumber/gi, () => {
          return '\n<span class="linenumber'
        })
        res.data.content = res.data.content.replace(/前端面试题宝典/gi, () => {
          return '前端面试题材'
        })
        res.data.content = res.data.content.replace(/https:\/\/fe.ecool.fun\//gi, () => {
          return 'https://www.ithhx.cn'
        })
        res.data.content = res.data.content.replace(/<span class="linenumber react-syntax-highlighter-line-number" style="display: inline-block; min-width: (0|[1-9][0-9]*|-[1-9][0-9]*).25em; padding-right: 1em; text-align: right; user-select: none; color: rgb\(124, 124, 124\);">(0|[1-9][0-9]*|-[1-9][0-9]*)<\/span>/gi, () => {
          return ''
        })
      }
      this.setData({
        topic: res.data.problem,
        choice: res.data.choice,
        answer: res.data.content,
        title: res.data.title,
        level: res.data.level,
        next_id: res.data.next_id,
        prev_id: res.data.prev_id,
        create_time: handleTime(res.data.create_time),
        loading: false
      })
    })
  },

  go() {
    wx.showToast({
      title: '敬请期待...',
      icon: 'none',
      duration: 2000
    })
  },

  setCurrentTopic(index: any) {
    if (index === 0) {
      this.setData({ first: true })
    } else if (index === this.data.topicSum - 1) {
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
    this.getTopicInfo()
  },
  /**
   * 上一题
   */
  prevQuestion() {
    if (this.data.loading) return
    this.data.id = this.data.prev_id
    let newIndex = this.data.topicIndex
    this.setData({ topicIndex: --newIndex, answerShow: false })
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
    this.data.id = this.data.next_id
    let newIndex = this.data.topicIndex
    this.setData({ topicIndex: ++newIndex, answerShow: false })
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