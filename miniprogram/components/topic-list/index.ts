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
    is_collect: {
      type: Number,
      value: 0
    },
    is_topic_limit: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showgroup: false,
    topicVip: false,
    isVip: false
  },

  attached() {
    eventStore.onState('showgroup', (value: any) => {
      this.setData({ showgroup: value })
    })
    eventStore.onState('topicVip', (value: any) => {
      this.setData({ topicVip: value })
    })
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
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
      const { id, cate_id } = e.currentTarget.dataset.item
      // 控制（除了html与css分类）其他分类必须要vip才能访问
      console.log('是否html与css分类', [2, 3].includes(id))
      console.log('是否vip', this.data.isVip)
      if (this.data.topicVip && ![2, 3].includes(cate_id) && !this.data.isVip && this.data.is_topic_limit) {
        wx.showToast({
          title: 'VIP专属权益',
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.navigateTo({
        url: `/pages/topic-res/topic-res?id=${id}&search=${this.data.search}&is_collect=${this.data.is_collect}`
      })
    }
  }
})
