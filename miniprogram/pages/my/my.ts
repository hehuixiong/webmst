import { eventStore } from '../../store/index'
let vipDate: any = null
const app = getApp()
Page({
  data: {
    userInfo: {},
    loginState: false,
    showgroup: false,
    year: null,
    isVip: false,
    vipType: 0,
    rewardShow: false,
    integral: 0
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
        if (value.vip_time) {
          this.setData({ vipType: value.vip })
          vipDate = value.vip_time
        }
        this.setData({ userInfo: { avatarUrl: value.head_pic, nickName: value.nick_name, timeStamp: value.open_id ? value.open_id.slice(5, 15) : '', is_promoter: value.is_promoter } })
      })
      eventStore.onState('integral', (value: any) => {
        this.setData({ integral: value })
      })
    }
  },
  showVipDate() {
    const { vipType } = this.data
    if (!vipType || vipType === 3) {
      return
    }
    const title = vipType === 1 ? '月度' : vipType === 2 ? '年度' : vipType === 3 ? '永久' : ''
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
  onFans() {
    wx.navigateTo({
      url: '/pages/fans/fans'
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
  onIntegral() {
    wx.navigateTo({
      url: '/pages/integral/integral'
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
  onPoster() {
    if (!this.data.loginState) {
      this.onLogin()
      return 
    }
    wx.navigateTo({
      url: '/pages/poster/poster'
    })
  },
  jumpVip() {
    eventStore.onState('iosIsPay', (value: any) => {
      if (value && app.globalSystemInfo && app.globalSystemInfo.ios) {
        wx.openCustomerServiceChat({
          extInfo: {
            url: 'https://work.weixin.qq.com/kfid/kfcd822498b9774ec8f'
          },
          corpId: 'wwcd77693eaf9afee3'
        })
      } else {
        wx.navigateTo({
          url: '/pages/vip/vip'
        })
      }
    })
  },
  addGroup() {
    wx.navigateTo({
      url: '/pages/group/group'
    })
  },
  AboutUs() {
    wx.showModal({
      title: '提示',
      content: '哈喽！感谢你对小程序的支持，我们将会做的更好，分享更多有价值的面试题材，祝你早日拿大offer',
      confirmText: '知道了',
      showCancel: false,
      success (res) {
        if (res.confirm) {
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  contact() {
    wx.openCustomerServiceChat({
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfce566bbbcf0dc5ebb'
      },
      corpId: 'wwcd77693eaf9afee3'
    })
  },
  onRewardAuthor() {
    if (!this.data.loginState) {
      this.onLogin()
      return 
    }
    this.setData({ rewardShow: true })
  },
  onShare() {}
})
