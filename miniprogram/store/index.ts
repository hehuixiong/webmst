const { HYEventStore } = require('hy-event-store')
const { getTopicCate } = require('../api/index')

const eventStore = new HYEventStore({
  state: {
    showgroup: wx.getStorageSync('showgroup') || false
  },
  actions: {
    getTopicCate(ctx: any) {
      ctx.showgroup = false
      wx.setStorageSync('showgroup', false)
      getTopicCate().then((res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].name === 'showgroup') {
            ctx.showgroup = true
            wx.setStorageSync('showgroup', true)
          }
        }
      })
    }
  }
})

export {
  eventStore
}