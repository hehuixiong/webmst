// components/topic-list/index.ts
import { eventStore } from '../../store/index'
// 在页面中定义激励视频广告
let rewardedVideoAd: any = null
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showgroup: false,
    topicAd: false,
    isVip: false
  },

  attached() {
    eventStore.onState('showgroup', (value: any) => {
      this.setData({ showgroup: value })
    })
    eventStore.onState('topicAd', (value: any) => {
      this.setData({ topicAd: value })
      this.showRewardedVideoAd()
    })
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showRewardedVideoAd() {
      if (this.data.showgroup && !this.data.isVip) {
        if (wx.createRewardedVideoAd) {
          rewardedVideoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-92cc5ea0105da417'
          })
          rewardedVideoAd.onLoad(() => {
            console.log('onload rewardedVideoAd')
          })
          rewardedVideoAd.onError((err: any) => {
            console.log('onError rewardedVideoAd', err)
          })
          rewardedVideoAd.onClose((res: any) => {
            console.log('onClose rewardedVideoAd', res)
            if (res && res.isEnded) {
              console.log('观看完成')
              wx.showModal({
                title: '提示',
                content: '已完成，祝君早日拿到心动offer',
                confirmText: '知道了',
                showCancel: false
              })
              this.setAdDate()
            }
          })
        }
      }
    },
    setAdDate() {
      // 设置年月日
      let date = new Date()
      const yyyy = date.getFullYear()
      const mm = date.getMonth() + 1
      const dd = date.getDate()
      const currentDate = `${yyyy}-${mm}-${dd}`
      const storageMsg = wx.getStorageSync('adDateMsg')
      let adDateMsg: any = Object.assign({}, storageMsg, {
        ['topic']: currentDate
      })
      wx.setStorageSync('adDateMsg', adDateMsg)
    },
    /**
     * 题目跳转
     */
    handleJump(e: any) {
      const { id } = e.currentTarget.dataset
      const storageMsg = wx.getStorageSync('adDateMsg')
      let date = new Date()
      const yyyy = date.getFullYear()
      const mm = date.getMonth() + 1
      const dd = date.getDate()
      const currentDate = `${yyyy}-${mm}-${dd}`
      if (storageMsg['topic'] && storageMsg['topic'] === currentDate || (!this.data.showgroup || !this.data.topicAd || this.data.isVip)) {
        console.log('拥有访问权限')
        wx.navigateTo({
          url: `/pages/topic-res/topic-res?id=${id}&search=${this.data.search}&is_collect=${this.data.is_collect}`
        })
        this.setAdDate()
      } else {
        console.log('今天没有看过广告')
        wx.showModal({
          title: '友情提示',
          content: '观看精彩视频，本题材24小时无广告刷题哦！',
          confirmText: '观看视频',
          cancelText: '下次再说',
          success (res) {
            if (res.confirm) {
              // 用户触发广告后，显示激励视频广告
              if (rewardedVideoAd) {
                rewardedVideoAd.show().catch(() => {
                  // 失败重试
                  rewardedVideoAd.load()
                    .then(() => rewardedVideoAd.show())
                    .catch(() => {
                      console.log('激励视频 广告显示失败')
                    })
                })
              }
            }
          }
        })
      }
    }
  }
})
