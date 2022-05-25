import { eventStore } from '../../store/index'
const app = getApp()
let vipDate: any = null
Page({
  data: {
    userInfo: {},
    loginState: false,
    showgroup: false,
    iosIsPay: false,
    year: null,
    show: false,
    isVip: false,
    vipType: 0
  },
  onLoad() {
    this.setUserInfo()
    let date = new Date()
    const year: any = date.getFullYear()
    this.setData({ year })
    eventStore.onState('showgroup', (value: any) => {
      this.setData({ showgroup: value })
    })
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
    eventStore.onState('iosIsPay', (value: any) => {
      this.setData({ iosIsPay: value })
    })
  },
  onShow() {
    this.setUserInfo()
  },
  setUserInfo() {
    const loginState = wx.getStorageSync('loginState')
    this.setData({ loginState })
    if (loginState) {
      eventStore.dispatch('getUserInfo')
      eventStore.onState('userInfo', (value: any) => {
        console.log(value)
        if (value.vip_time) {
          this.setData({ vipType: value.vip })
          vipDate = value.vip_time
        }
        this.setData({ userInfo: { avatarUrl: value.head_pic, nickName: value.nick_name, timeStamp: value.open_id ? value.open_id.slice(5, 15) : '' } })
      })
    }
    console.log('setUserInfo')
  },
  showVipDate() {
    const { vipType } = this.data
    if (!vipType || vipType === 3) {
      return
    }
    const title = vipType === 1 ? '包月' : vipType === 2 ? '年度' : vipType === 3 ? '永久' : ''
    const newDate = vipDate.split(' ')[0]
    wx.showModal({
      title: title + 'VIP',
      content: `有效期至：${newDate}`,
      confirmText: '知道了',
      showCancel: false
    })
  },
  copyUID(e: any) {
    const { uid } = e.currentTarget.dataset
    wx.setClipboardData({
      data: uid,
      success: function () {
        wx.getClipboardData({
          //这个api是把拿到的数据放到电脑系统中的
          success: function () {
            wx.showToast({
              title: '用户ID已复制',
              icon: 'none'
            })
          }
        })
      }
    })
  },
  go() {
    wx.showToast({
      title: '敬请期待...',
      icon: 'none',
      duration: 2000
    })
  },
  onLogin() {
    eventStore.dispatch('login', () => {
      this.setUserInfo()
    })
  },
  onRoute() {
    if (!this.data.loginState) {
      this.onLogin()
      return 
    }
    wx.navigateTo({
      url: '/pages/collect/collect'
    })
  },
  showVip() {
    if (app.globalSystemInfo && app.globalSystemInfo.ios) {
      if (this.data.iosIsPay) {
        wx.navigateTo({
          url: '/pages/vip/vip'
        })
      } else {
        wx.showModal({
          title: '友情提示',
          content: '由于相关规范，苹果IOS暂不可用',
          confirmText: '知道了',
          showCancel: false
        })
      }
      return
    }
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
