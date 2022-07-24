// pages/search/search.ts
const { getTopicList, getSearchs, clearSearch } = require('../../api/index')
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
    getSearchs().then((res: any) => {
      if (res) {
        this.setData({
          historyData: res.data
        })
      }
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
      this.getHistory()
    })
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
    clearSearch().then(() => {
      this.getHistory()
      this.clearInput()
    })
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
  }
})