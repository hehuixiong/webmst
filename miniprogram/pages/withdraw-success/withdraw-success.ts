// pages/withdraw-success/withdraw-success.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ amount }: any) {
    this.setData({ amount })
  },

  lianxikefu() {
    wx.openCustomerServiceChat({
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfc01710cfde30f5ee9'
      },
      corpId: 'wwcd77693eaf9afee3'
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