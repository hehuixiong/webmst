import { eventStore } from '../../store/index'
const localProjectList = require("../../data/projectList")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectPageList: [],
    projectList: [],
    totalPage: 0,
    pageSize: 16,
    isVip: false,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const projectList: any = [...localProjectList.data]
    this.setData({
      projectList: projectList
    })
    this.setData({
      totalPage: Math.ceil(this.data.projectList.length / this.data.pageSize)
    })
    this.setData({
      totalPage: this.data.totalPage === 0 ? 1 : this.data.totalPage
    })
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
    this.setCurrentPageData()
  },

  goSkip(e: any) {
    if (!wx.getStorageSync('loginState')) {
      eventStore.dispatch('login')
      return
    }
    if (!this.data.isVip) {
      wx.showToast({
        title: 'VIP专属权益...',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const { id, index, title } = e.currentTarget.dataset
    const query = { id, index, title }
    wx.navigateTo({
      url: `/pages/project-res/project-res?query=${JSON.stringify(query)}`
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
   * 处理分页
   */
  setCurrentPageData() {
    let begin = (this.data.page - 1) * this.data.pageSize
    let end = this.data.page * this.data.pageSize
    this.setData({
      projectPageList: [...this.data.projectPageList, ...this.data.projectList.slice(begin, end)],
      loading: false
    })
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