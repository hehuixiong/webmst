const { getTopicList } = require('../../api/index')
import { handleTime } from '../../utils/util'
const PAGE_SIZE = 20
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topicList : [],
    page: 1,
    totalPage: 0,
    noMore: false,
    loading: false,
    id: null,
    label: null,
    topicSum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ label, id }: any) {
    this.data.id = id
    this.data.label = label
    // 动态改变标题
    wx.setNavigationBarTitle({
      title: label || ''
    })
    this.getTopicList()
  },
  getTopicList() {
    this.setData({ loading: true })
    const params: any = {
      page: this.data.page
    }
    if (this.data.id !== 'null') {
      params.cate_id = this.data.id
    }
    getTopicList(params).then((res: any) => {
      for (let i = 0; i < res.data.list.length; i++) {
        res.data.list[i].create_time = handleTime(res.data.list[i].create_time)
      }
      const topicList: any = [...this.data.topicList, ...res.data.list]
      this.setData({
        totalPage: Math.ceil(res.data.pageTotal / PAGE_SIZE),
        topicList: topicList,
        loading: false,
        label: this.data.label,
        topicSum: res.data.pageTotal
      })
      this.setData({
        totalPage: this.data.totalPage === 0 ? 1 : this.data.totalPage
      })
    })
  },
  /**
   * 题目跳转
   */
  handleJump(e: any) {
    const { id, index, topicsum } = e.currentTarget.dataset
    const queryTopic = {
      id: id,
      index: index,
      topicSum: topicsum
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
    if(this.data.page == this.data.totalPage) {
      this.setData({
        noMore: true
      })
      return
    }

    let { page } = this.data
    this.setData({
      page: ++page
    })
    this.getTopicList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})