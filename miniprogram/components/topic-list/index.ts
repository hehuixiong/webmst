// components/topic-list/index.ts
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
    type: {
      type: String
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
    /**
   * 题目跳转
   */
  handleJump(e: any) {
    const { id, index, topicsum } = e.currentTarget.dataset
      const queryTopic = {
        id: id,
        index: index,
        topicSum: topicsum
      }
      // 添加缓存
      wx.setStorageSync('queryTopic', queryTopic)
      wx.navigateTo({
        url: '/pages/topic-res/topic-res'
      })
    }
  }
})