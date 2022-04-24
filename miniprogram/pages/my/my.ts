// 获取应用实例
const app = getApp()
const { getTopicCate, getTopicList } = require('../../api/index')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    showgroup: false,
    year: null
  },
  onLoad() {
    this.setUserInfo()
    getTopicCate().then((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].name === 'showgroup') {
          this.setData({ showgroup: true })
        }
      }
    })
    let date = new Date()
    const year: any = date.getFullYear()
    this.setData({ year })
  },
  getUserProfile(e: any) {
    console.log(e)
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        wx.login({
          success: (res) => {
            console.log(res)
          }
        })
        wx.setStorageSync('userInfo', {
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          timeStamp: e.timeStamp,
          hasUserInfo: true
        })
        this.setUserInfo()
      }
    })
  },
  setUserInfo() {
    const { avatarUrl, nickName, timeStamp, hasUserInfo } = wx.getStorageSync('userInfo')
    this.setData({ userInfo: { avatarUrl, nickName, timeStamp }, hasUserInfo })
  },
  go() {
    wx.showToast({
      title: '敬请期待...',
      icon: 'none',
      duration: 2000
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
      content: '嗨！你好，非常感谢你对题材的支持，题材将会做的更好，分享更多有价值的内容，也祝你拿到大offer',
      confirmText: '已了解',
      showCancel: false,
      confirmColor: '#57bd6a',
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
      title: '给你推荐一款非常好用的前端面试题小程序',
      imageUrl: 'https://s-gz-2804-hero-image.oss.dogecdn.com/20220424005002.png'
    }
  }
})
