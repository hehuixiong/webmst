const { HYEventStore } = require('hy-event-store')
const { getTopicCate, getUserInfo } = require('../api/index')

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
        console.log('测试')
      })
    },
    async getUserInfo(ctx: any) {
      console.log('擦')
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
    }
  }
})

export {
  eventStore
}