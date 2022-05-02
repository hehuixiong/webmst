const localList = require("../../data/skillsList")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skillsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const skillsList: any = [...localList.data]
    this.setData({
      skillsList: skillsList
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