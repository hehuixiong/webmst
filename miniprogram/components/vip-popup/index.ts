Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean
    },
    title: {
      type: String,
      value: '积分消耗完毕'
    },
    desc: {
      type: String,
      value: '开通VIP无积分限制，全部功能可用'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({
        show: false
      })
    },
    jumpVip() {
      wx.navigateTo({
        url: '/pages/vip/vip'
      })
    }
  }
})
