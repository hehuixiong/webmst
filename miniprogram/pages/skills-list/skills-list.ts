const localList = require("../../data/skillsList")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skillsPageList: [],
    skillsList: [],
    totalPage: 0,
    pageSize: 16,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const skillsList: any = [...localList.data]
    this.setData({
      skillsList: skillsList
    })
    this.setData({
      totalPage: Math.ceil(this.data.skillsList.length / this.data.pageSize)
    })
    this.setData({
      totalPage: this.data.totalPage === 0 ? 1 : this.data.totalPage
    })
    this.setCurrentPageData()
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
      skillsPageList: [...this.data.skillsPageList, ...this.data.skillsList.slice(begin, end)],
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