// components/topic-list/index.ts
import { eventStore } from '../../store/index'
Component({
  externalClasses:['my-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array
    },
    topicSum: {
      type: Number,
      value: 0
    },
    loading: {
      type: Boolean,
      value: false
    },
    noMore: {
      type: Boolean,
      value: false
    },
    search: {
      type: String,
      value: ''
    },
    collectPage: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isVip: false,
    vipShow: false,
    integral: 0
  },

  attached() {
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
    eventStore.onState('integral', (value: any) => {
      this.setData({ integral: value })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 题目跳转
     */
    handleJump(e: any) {
      if (!wx.getStorageSync('loginState')) {
        eventStore.dispatch('login')
        return
      }
      if (!this.data.isVip && +this.data.integral <= 0) {
        this.setData({ vipShow: true })
        return
      }
      const { id } = e.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/topic-res/topic-res?id=${id}&search=${this.data.search}&collectPage=${this.data.collectPage}`
      })
    }
  }
})
