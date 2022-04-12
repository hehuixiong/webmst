// pages/topic/topic.ts
const localTopic = require("../../data/topicList")
import { NAV_TYPES } from '../../utils/constant'
import { handleTime } from '../../utils/util'
const PAGE_SIZE = 16
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topicList: [],
    topicPageList: [],
    topicKey: '',
    page: 1,
    totalPage: 0,
    noMore: false,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ type, name }: any) {
    const index = Object.values(NAV_TYPES).filter((item: any) => item === Number(type))[0]
    const key = Object.keys(NAV_TYPES)[index]
    if (key.toString() === 'all') {
      let topicList: any = []
      Object.values(localTopic.topicList).forEach((arr: any) => arr.map((item: any) => topicList.push(
        Object.assign({}, item, { updateAt: handleTime(item.updateAt) })
      )))
      this.setData({
        topicList: topicList,
        topicKey: key
      })
    } else {
      this.setData({
        topicList: localTopic.topicList[key].map((item: any) => {
          return Object.assign({}, item, { updateAt: handleTime(item.updateAt) })
        }),
        topicKey: key
      })
    }
    // 动态改变标题
    wx.setNavigationBarTitle({
      title: name || ''
    })

    this.setData({
      totalPage: Math.ceil(this.data.topicList.length / PAGE_SIZE)
    })
    this.setData({
      totalPage: this.data.totalPage === 0 ? 1 : this.data.totalPage
    })
    this.setCurrentPageData()
  },
  /**
   * 题目跳转
   */
  handleJump(e: any) {
    const { exercisekey, title, index, level, updateat } = e.currentTarget.dataset
    const queryTopic = {
      exerciseKey: exercisekey,
      title: title,
      index: index,
      level: level,
      updateAt: updateat,
      topicKey: this.data.topicKey
    }
    // 添加缓存
    wx.setStorageSync('queryTopic', queryTopic)
    wx.navigateTo({
      url: '/pages/topic-res/topic-res'
    })
  },
  /**
   * 处理分页
   */
  setCurrentPageData() {
    let begin = (this.data.page - 1) * PAGE_SIZE
    let end = this.data.page * PAGE_SIZE
    this.setData({
      topicPageList: [...this.data.topicPageList, ...this.data.topicList.slice(begin, end)],
      loading: false
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
    if(this.data.page == this.data.totalPage) {
      this.setData({
        noMore: true
      })
      return
    }

    let { page } = this.data
    this.setData({
      page: ++page,
      loading: true
    })
    const timer = setTimeout(() => {
      this.setCurrentPageData()
      clearTimeout(timer)
    }, Math.floor(Math.random() * (500 - 100) + 100))
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})