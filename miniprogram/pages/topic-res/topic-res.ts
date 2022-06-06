import { handleTime } from '../../utils/util'
const { getTopicInfo, getCollectInfo, addCollect } = require('../../api/index')
// import { setWatcher } from '../../utils/watch'
import { eventStore } from '../../store/index'
const title = '大厂前端面试题，悄悄分享给你！'
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
    last: false,
    topicIndex: 0,
    loading: false,
    id: 0,
    next_id: 0,
    currentTitle: title,
    self: false,
    showBug: false,
    showgroup: false,
    isVip: false,
    is_collect: 0,
    search: '',
    isChoice: false,
    showAnswer: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ id, is_collect, search }: any) {
    this.setData({ id, is_collect, search }, () => this.getTopicInfo())
    // setWatcher(this)
    eventStore.onState('showgroup', (value: any) => {
      this.setData({ showgroup: value })
    })
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
  },

  /**
   * 练习记录（本地缓存）
   */
  practiceRecords(type: any, id: any) {
    const storageRecords = wx.getStorageSync('recordsObj')
    let recordsObj: any = {}
    let ids: any = storageRecords[type] && storageRecords[type].ids.length ? storageRecords[type].ids : []
    ids.push(id)
    recordsObj = Object.assign({}, storageRecords, {
      [type]: {
        ids: [...new Set(ids)]
      }
    })
    let date = new Date()
    const yyyy = date.getFullYear()
    const mm = date.getMonth() + 1
    const dd = date.getDate()
    let storageDay = wx.getStorageSync('recordsDay')
    let yearMonthDay = yyyy + '-' + mm + '-' + dd
    let storageYearMonthDay = wx.getStorageSync('yearMonthDay')
    let recordsDay = 1
    if (yearMonthDay !== storageYearMonthDay) {
      recordsDay = ++storageDay
    } else {
      recordsDay = storageDay
    }
    wx.setStorageSync('recordsObj', recordsObj)
    wx.setStorageSync('recordsDay', recordsDay)
    wx.setStorageSync('yearMonthDay', yearMonthDay)
  },

  // watch: {
  //   // 需要监听的字段
  //   topicIndex(newIndex: any) {
  //     this.setCurrentTopic(newIndex)
  //   }
  // },
  getTopicInfo() {
    this.setData({ loading: true })
    const params: any = { id: this.data.id }
    if (+this.data.is_collect === 1) {
      // 收藏
      getCollectInfo(params).then((res: any) => {
        this.setTopicInfo(res)
      })
    } else {
      // 非收藏
      if (this.data.search) {
        params.search = this.data.search
      }
      getTopicInfo(params).then((res: any) => {
        this.setTopicInfo(res)
      })
    }
  },

  // 设置题目信息
  setTopicInfo(res: any) {
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
      res.data.problem = res.data.problem.replace(/src="/gi, () => {
        return 'src="https://images.weserv.nl/?url='
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
        return 'https://blog.ithhx.cn'
      })
      res.data.content = res.data.content.replace(/<span class="linenumber react-syntax-highlighter-line-number" style="display: inline-block; min-width: (0|[1-9][0-9]*|-[1-9][0-9]*).25em; padding-right: 1em; text-align: right; user-select: none; color: rgb\(124, 124, 124\);">(0|[1-9][0-9]*|-[1-9][0-9]*)<\/span>/gi, () => {
        return ''
      })
      res.data.content = res.data.content.replace(/<blockquote/gi, () => {
        return '<blockquote style="display: none"'
      })
      res.data.content = res.data.content.replace(/src="/gi, () => {
        return 'src="https://images.weserv.nl/?url='
      })
    }
    // 设置可查看权限（html，css 分类）
    const permissions = [2, 3].includes(res.data.cate_id)
    this.setData({
      topic: res.data.problem,
      choice: res.data.choice,
      answer: res.data.content,
      title: res.data.title,
      level: res.data.level,
      next_id: res.data.next_id,
      create_time: handleTime(res.data.create_time),
      topicIndex: res.data.now_num,
      isChoice: res.data.cate_name === 'choice',
      showAnswer: res.data.cate_name !== 'choice',
      permissions: permissions,
      loading: false
    })
    this.setCurrentTopic()
    this.practiceRecords(res.data.cate_name, this.data.id)
  },

  onShowAnswer() {
    this.setData({
      showAnswer: true
    })
  },

  go() {
    wx.showToast({
      title: '敬请期待...',
      icon: 'none',
      duration: 2000
    })
  },

  setCurrentTopic() {
    if (!this.data.next_id) {
      this.setData({ last: true })
    } else {
      this.setData({
        last: false
      })
    }
    // 回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  addCollect() {
    if (!wx.getStorageSync('loginState')) {
      eventStore.dispatch('login')
      return
    }
    addCollect({
      goods_id: this.data.id
    }).then((res: any) => {
      console.log(res)
      wx.showToast({
        title: res.msg
      })
    })
  },
  /**
   * 下题
   */
  nextQuestion() {
    if (this.data.loading) return
    if (this.data.last) {
      wx.showModal({
        title: '提示',
        content: '已经到最后一题啦，题材不定期更新哦~',
        confirmText: '返回列表',
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
    this.getTopicInfo()
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
    this.setData({
      currentTitle: title
    })
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

  onShare(e: any) {
    const { title } = e.target.dataset
    this.setData({
      currentTitle: title
    })
  },

  onBug() {
    this.setData({ showBug: true })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return{
      title: this.data.currentTitle,
      path: `/pages/topic-res/topic-res?id${this.data.id}`
    }
  }
})