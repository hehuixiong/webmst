// pages/fans/fans.ts
const { getTuiUser } = require('../../api/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tuiUser: [],
    page: 1,
    pageTotal: 0,
    noMore: false,
    loading: false,
    pageSize: 20,
    empty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getTuiUser()
  },

  getTuiUser() {
    this.setData({ loading: true })
    getTuiUser({ page: this.data.page }).then((res: any) => {
      console.log(res)
      if (res.code === 200) {
        const tuiUser: any = [...this.data.tuiUser, ...res.data.list]
        this.setData({
          pageTotal: Math.ceil(res.data.pageTotal / this.data.pageSize),
          tuiUser: tuiUser,
          loading: false
        })
        this.setData({
          pageTotal: this.data.pageTotal === 0 ? 1 : this.data.pageTotal,
          noMore: this.data.tuiUser.length === res.data.pageTotal,
          empty: res.data.pageTotal === 0
        })
      }
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
    this.getTuiUser()
  }
})