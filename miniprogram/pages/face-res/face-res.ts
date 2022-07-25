// pages/face-res/face-res.ts
const { getContDetail } = require('../../api/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    title: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ id }: any) {
    this.getContDetail(id)
  },

  getContDetail(id: any) {
    wx.showLoading({
      title: '数据加载中...'
    })
    getContDetail({ id }).then((res: any) => {
      if (res.code === 200) {
        console.log(res)
        this.setData({
          title: res.data.title,
          content: res.data.content
        })
        wx.hideLoading()
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

  }
})