// components/vip-popup/index.ts
const DEFAULT_INDEX = 2
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    show: function (val) {
      if (val) {
        this.setData({
          currentIndex: DEFAULT_INDEX
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: DEFAULT_INDEX
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({ show: false })
    },
    changeVip(e: any) {
      const { index } = e.currentTarget.dataset
      this.setData({
        currentIndex: Number(index)
      })
    },
    submitVip() {
      wx.showToast({
        title: '努力开发中，敬请期待...',
        icon: 'none',
        duration: 2000
      })
    }
  }
})
