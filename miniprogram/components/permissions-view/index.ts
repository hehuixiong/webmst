// components/permissions-view/index.ts
import { eventStore } from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    permissions: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isVip: false,
    show: false
  },

  attached() {
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showVip() {
      wx.navigateTo({
        url: '/pages/vip/vip'
      })
    },
    gofreepre() {
      wx.navigateTo({
        url: '/pages/topic-list/topic-list?id=2&label=HTML&type=html'
      })
    }
  }
})
