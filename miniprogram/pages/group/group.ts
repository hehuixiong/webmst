// pages/group/group.ts
const { getAdImage } = require('../../api/index')
import { eventStore } from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isVip: false,
    jlqewm: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getAdImage()
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
  },

  getAdImage() {
    getAdImage().then((res: any) => {
      const jlqewm = res.data.filter((item: any) => (item.title === '前端面试交流2群'))
      console.log(jlqewm)
      if (jlqewm.length) {
        this.setData({
          jlqewm: jlqewm[0].thumb
        })
      }
    })
  },

  showImg(e: any) {
    let { src } = e.currentTarget.dataset
    wx.previewImage({
      current: src,
      urls: [src]
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
      title: '大厂前端面试题，悄悄分享给你！',
      imageUrl: 'https://s-gz-2804-hero-image.oss.dogecdn.com/20220427140039.png'
    }
  }
})