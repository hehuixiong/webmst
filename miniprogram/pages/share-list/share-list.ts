// pages/share-list/share-list.ts
import { eventStore } from '../../store/index'
const localShareList = require("../../data/shareList")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharePageList: [],
    shareList: [],
    totalPage: 0,
    pageSize: 16,
    noMore: false,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const shareList: any = [...localShareList.data]
    this.setData({
      shareList: shareList
    })
    this.setData({
      totalPage: Math.ceil(this.data.shareList.length / this.data.pageSize)
    })
    this.setData({
      totalPage: this.data.totalPage === 0 ? 1 : this.data.totalPage
    })
    this.setCurrentPageData()
  },

  /**
   * 处理分页
   */
  setCurrentPageData() {
    let begin = (this.data.page - 1) * this.data.pageSize
    let end = this.data.page * this.data.pageSize
    this.setData({
      sharePageList: [...this.data.sharePageList, ...this.data.shareList.slice(begin, end)],
      loading: false
    })
  },

  go() {
    if (!wx.getStorageSync('loginState')) {
      eventStore.dispatch('login')
      return
    }
    wx.showToast({
      title: '开发中，敬请期待',
      icon: 'none'
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
    return{
      title: '大厂前端面试题，悄悄分享给你！'
    }
  }
})