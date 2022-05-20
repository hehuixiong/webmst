const { HYEventStore } = require('hy-event-store')
const { getTopicCate, getUserInfo } = require('../api/index')
const { login } = require('../api/index')

const eventStore = new HYEventStore({
  state: {
    showgroup: wx.getStorageSync('showgroup') || false,
    topicAd: wx.getStorageSync('topicAd') || false,
    isVip: wx.getStorageSync('isVip') || false,
    userInfo: wx.getStorageSync('userInfo') || {}
  },
  actions: {
    async getTopicCate(ctx: any) {
      ctx.showgroup = false
      wx.setStorageSync('showgroup', false)
      wx.setStorageSync('topicAd', false)
      await getTopicCate().then((res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].name === 'showgroup') {
            ctx.showgroup = true
            wx.setStorageSync('showgroup', true)
          }
          if (res.data[i].name === 'topicAd') {
            ctx.topicAd = true
            wx.setStorageSync('topicAd', true)
          }
        }
      })
    },
    async getUserInfo(ctx: any) {
      if (wx.getStorageSync('loginState')) {
        await getUserInfo().then((res: any) => {
          ctx.isVip = res.data.vip_time !== ''
          ctx.userInfo = res.data
          wx.setStorageSync('isVip', ctx.isVip)
          wx.setStorageSync('userInfo', res.data)
          console.log('是否vip', ctx.isVip)
        })
      } else {
        console.log('未登录')
      }
    },
    login(ctx: any, cb: any) {
      console.log(ctx)
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
                wx.setStorageSync('token', res.data.token)
                wx.setStorageSync('loginState', true)
                wx.showToast({
                  title: '登录成功',
                  duration: 2000
                })
                cb && cb()
              }).catch(() => {
                wx.showToast({
                  title: '登录失败，请重试',
                  icon: 'none',
                  duration: 2000
                })
              })
            }
          })
        }
      })
    }
  }
})

export {
  eventStore
}