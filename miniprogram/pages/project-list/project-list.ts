import { eventStore } from '../../store/index'
const { getContList } = require('../../api/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectList: [],
    isVip: false,
    vipShow: false,
    page: 1,
    pageTotal: 0,
    noMore: false,
    loading: false,
    pageSize: 20,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getContList()
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
  },

  getContList() {
    this.setData({ loading: true })
    getContList({ cate_id: 1, page: this.data.page }).then((res: any) => {
      if (res.code === 200) {
        const projectList: any = [...this.data.projectList, ...res.data.list]
        this.setData({
          pageTotal: Math.ceil(res.data.pageTotal / this.data.pageSize),
          projectList: projectList,
          loading: false
        })
        this.setData({
          pageTotal: this.data.pageTotal === 0 ? 1 : this.data.pageTotal,
          noMore: this.data.projectList.length === res.data.pageTotal,
          empty: res.data.pageTotal === 0
        })
      }
    })
  },

  goSkip(e: any) {
    if (!wx.getStorageSync('loginState')) {
      eventStore.dispatch('login')
      return
    }
    const { id } = e.currentTarget.dataset
    if (!this.data.isVip) {
      this.setData({ vipShow: true })
      return
    }
    wx.navigateTo({
      url: `/pages/project-res/project-res?id=${id}`
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
    this.getContList()
  }
})