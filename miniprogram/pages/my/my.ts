import { eventStore } from '../../store/index'

Page({
  data: {
    userInfo: {},
    loginState: false,
    showgroup: false,
    year: null,
    show: false
  },
  onLoad() {
    this.setUserInfo()
    let date = new Date()
    const year: any = date.getFullYear()
    this.setData({ year })
    eventStore.onState('showgroup', (value: any) => {
      this.setData({ showgroup: value })
    })
  },
  onShow() {
    this.setUserInfo()
  },
  setUserInfo() {
    const { avatarUrl, nickName, timeStamp } = wx.getStorageSync('userInfo')
    const loginState = wx.getStorageSync('loginStatus')
    console.log(loginState)
    this.setData({ userInfo: { avatarUrl, nickName, timeStamp }, loginState })
  },
  go() {
    wx.showToast({
      title: '敬请期待...',
      icon: 'none',
      duration: 2000
    })
  },
  onRoute() {
    if (this.data.loginState) {
      wx.navigateTo({
        url: '/pages/collect/collect'
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  showVip() {
    this.setData({ show: true })
  },
  addGroup() {
    wx.navigateTo({
      url: '/pages/group/group'
    })
  },
  AboutUs() {
    wx.showModal({
      title: '提示',
      content: '嗨！你好，非常感谢你对题材的支持，题材将会做的更好，分享更多有价值的内容，也祝你拿到大offer',
      confirmText: '已了解',
      showCancel: false,
      success (res) {
        if (res.confirm) {
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShare() {},
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
