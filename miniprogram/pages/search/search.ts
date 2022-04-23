// pages/search/search.ts
const { getTopicList } = require('../../api/index')
import { handleTime } from '../../utils/util'
const PAGE_SIZE = 20
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    searchList: [],
    topicSum: 0,
    page: 1,
    pageTotal: 0,
    noMore: false,
    loading: false,
    empty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },

  getSearchList() {
    this.setData({ loading: true })
    const params: any = {
      page: this.data.page,
      search: this.data.keyword
    }
    getTopicList(params).then((res: any) => {
      let list = res.data.list
      list = this.removeDuplicateObj(list)
      for (let i = 0; i < list.length; i++) {
        list[i].create_time = handleTime(list[i].create_time)
      }
      const searchList: any = [...this.data.searchList, ...list]
      this.setData({
        pageTotal: Math.ceil(res.data.pageTotal / PAGE_SIZE),
        searchList: searchList,
        loading: false,
        topicSum: res.data.pageTotal,
        empty: res.data.pageTotal === 0
      })
      this.setData({
        pageTotal: this.data.pageTotal === 0 ? 1 : this.data.pageTotal
      })
    })
  },

  removeDuplicateObj(arr: any) {
    let obj: any = {}
    arr = arr.reduce((newArr: any, next: any) => {
      obj[next.resume] ? "" : (obj[next.resume] = true && newArr.push(next))
      return newArr
    }, [])
    return arr
  },

  onSearch() {
    if (!this.data.keyword) {
      wx.showToast({
        title: '请输入关键字',
        icon: 'error'
      })
      return
    }
    this.setData({
      searchList: [],
      page: 1
    })
    this.getSearchList()
  },

  bindInput(e: any) {
    this.setData({
      [e.currentTarget.dataset.key]: e.detail.value
    })
  },

  clearInput() {
    this.setData({ keyword: '' })
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
      title: '给你推荐一款非常好用的前端面试题小程序',
      imageUrl: 'https://s-gz-2804-hero-image.oss.dogecdn.com/20220424005002.png'
    }
  }
})