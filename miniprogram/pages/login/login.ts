const { login } = require('../../api/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  getUserProfile(e: any) {
    console.log(e)
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const user = res
        wx.login({
          success: (res) => {
            const code = res.code
            wx.showLoading({
              title: '登录中...'
            })
            login(Object.assign({
              code: code
            }, user)).then((res: any) => {
              wx.setStorageSync('userInfo', {
                avatarUrl: user.userInfo.avatarUrl,
                nickName: user.userInfo.nickName,
                timeStamp: e.timeStamp
              })
              wx.setStorageSync('token', res.data.token)
              wx.setStorageSync('loginStatus', true)
              wx.hideLoading()
              wx.navigateBack()
            })
          }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})