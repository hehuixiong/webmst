// pages/search/search.ts
const { getTopicList } = require('../../api/index')
import { handleTime } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    searchList: [],
    page: 1,
    pageTotal: 0,
    noMore: false,
    loading: false,
    empty: true,
    pageSize: 20,
    focus: true,
    historyData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getHistory()
  },

  getHistory() {
    const storageHistory = wx.getStorageSync('historyArr') || []
    const historyData: any = this.overturnArray(storageHistory)
    this.setData({
      historyData: historyData
    })
  },

  getSearchList() {
    this.setData({ loading: true })
    const params: any = {
      page: this.data.page,
      search: this.data.keyword
    }
    getTopicList(params).then((res: any) => {
      let list = res.data.list
      for (let i = 0; i < list.length; i++) {
        list[i].create_time = handleTime(list[i].create_time)
      }
      const searchList: any = [...this.data.searchList, ...list]
      this.setData({
        pageTotal: Math.ceil(res.data.pageTotal / this.data.pageSize),
        searchList: searchList,
        loading: false,
        empty: res.data.pageTotal === 0
      })
      this.setData({
        pageTotal: this.data.pageTotal === 0 ? 1 : this.data.pageTotal,
        noMore: this.data.searchList.length === res.data.pageTotal
      })
      this.addHistoryRecord(this.data.keyword)
    })
  },

  addHistoryRecord(keyword: any) {
    const max = 10
    const storageHistory = wx.getStorageSync('historyArr')
    console.log(storageHistory)
    let tempArr = []
    tempArr.push(keyword)
    let resultArr = [...new Set([...storageHistory, ...tempArr])]
    if (resultArr.length > max) {
      resultArr.splice(0, 1)
    }
    wx.setStorageSync('historyArr', resultArr)
    this.getHistory()
  },

  overturnArray(arr: any) {
    var result = []
    for (var i = arr.length - 1; i >=  0; i--) {
      result[result.length] = arr[i]
    }
    return result
  },

  onSearch(e: any) {
    const { keyword } = e.currentTarget.dataset
    if (keyword) {
      this.setData({ keyword })
    }
    if (!this.data.keyword) {
      wx.showToast({
        title: '请输入关键字',
        icon: 'error'
      })
      return
    }
    this.setData({
      searchList: [],
      page: 1,
      focus: false
    })
    this.getSearchList()
  },

  bindInput(e: any) {
    this.setData({
      [e.currentTarget.dataset.key]: e.detail.value
    })
  },

  clearInput() {
    this.setData({
      keyword: '',
      focus: true,
      searchList: [],
      page: 1,
      empty: true
    })
  },

  clearHistory() {
    wx.removeStorageSync('historyArr')
    this.getHistory()
    this.clearInput()
  },

  onFocus() {},

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
    if (this.data.searchList.length === 0) {
      return
    }
    if(this.data.page == this.data.pageTotal) {
      this.setData({
        noMore: true
      })
      return
    }

    let { page } = this.data
    this.setData({
      page: ++page
    })
    this.getSearchList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return{
      title: '大厂前端面试题，悄悄分享给你！',
      imageUrl: 'https://s-gz-2804-hero-image.oss.dogecdn.com/20220427140039.png'
    }
  }
})