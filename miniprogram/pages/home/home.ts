// home.ts
const { getTopicCate } = require('../../api/index')
import { NAV_TYPES } from '../../utils/constant'
import { eventStore } from '../../store/index'
Page({
  data: {
    swiper: [
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/20220323233900.png',
        to: '/pages/skills-list/skills-list'
      },
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/20220323233900.png',
        to: '/pages/skills-list/skills-list'
      }
    ],
    category: [
      {
        icon: 'icon-html',
        label: 'HTML',
        type: NAV_TYPES.html,
        id: null
      },
      {
        icon: 'icon-css',
        label: 'CSS',
        type: NAV_TYPES.css,
        id: null
      },
      {
        icon: 'icon-javascript',
        label: 'JavaScript',
        type: NAV_TYPES.javaScript,
        id: null
      },
      {
        icon: 'icon-vuejs',
        label: 'Vue.js',
        type: NAV_TYPES.vueJs,
        id: null
      },
      {
        icon: 'icon-reactjs',
        label: 'React.js',
        type: NAV_TYPES.reactJs,
        id: null
      },
      {
        icon: 'icon-es6',
        label: 'ES6',
        type: NAV_TYPES.es6,
        id: null
      },
      {
        icon: 'icon-typescript',
        label: 'TypeScript',
        type: NAV_TYPES.typeScript,
        id: null
      },
      {
        icon: 'icon-suanfa',
        label: '算法',
        type: NAV_TYPES.algorithm,
        id: null
      },
      {
        icon: 'icon-bianchengti',
        label: '编程题',
        type: NAV_TYPES.programme,
        id: null
      },
      {
        icon: 'icon-xingnengyouhua',
        label: '性能优化',
        type: NAV_TYPES.performance,
        id: null
      },
      {
        icon: 'icon-gongju',
        label: '工具',
        type: NAV_TYPES.tools,
        id: null
      },
      {
        icon: 'icon-quanbu',
        label: '更多分类',
        type: NAV_TYPES.all,
        id: null
      }
    ],
    assist: [
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220100.png',
        label: '简历推荐'
      },
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220101.png',
        label: '项目经验'
      },
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220102.png',
        label: '企业真题',
        to: '/pages/share-list/share-list'
      },
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220106.png',
        label: '面试技巧',
        to: '/pages/skills-list/skills-list'
      },
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220104.png',
        label: '介绍模板'
      },
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220105.png',
        label: '我的收藏',
        to: '/pages/collect/collect',
        needLogin: true
      }
    ],
    current: 0,
    titLoading: true,
    hideTip: true,
    currentTime: '',
    topicSum: 0,
    showgroup: false,
    isVip: false,
    show: false
  },
  onLoad() {
    this.getTopicCate()
    eventStore.onState('showgroup', (value: any) => {
      this.setData({ showgroup: value })
    })
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
  },
  closeTip() {
    this.setData({ hideTip: true })
    wx.setStorageSync('hideTip', true)
  },
  showVip() {
    this.setData({ show: true })
  },
  swiperChange(e: any) {
    if (!this.data.swiper.length) {
      return
    }
    this.setData({
      current: e.detail.current
    })
  },
  getTopicCate() {
    getTopicCate().then((res: any) => {
      let topicSum = 0
      for (let i = 0; i < res.data.length; i++) {
        topicSum += res.data[i].cate_num
        for (let j = 0; j < this.data.category.length; j++) {
          if (res.data[i].name === this.data.category[j].type) {
            let str = 'category['+ j +'].id'
            this.setData({
              [str]: res.data[i].id
            })
          }
        }
      }
      const hideTip = wx.getStorageSync('hideTip')
      let date = new Date()
      const yyyy = date.getFullYear()
      const mm = date.getMonth() + 1
      const dd = date.getDate()
      this.setData({
        topicSum: topicSum,
        currentTime: `${yyyy}/${mm}/${dd}`,
        hideTip: hideTip,
        titLoading: false
      })
    })
  },
  go(e: any) {
    const { to } = e.currentTarget.dataset
    if (to) {
      return
    }
    wx.showToast({
      title: '敬请期待...',
      icon: 'none',
      duration: 2000
    })
  },
  onRoute(e: any) {
    const {
      to,
      needLogin
    } = e.currentTarget.dataset.item
    if (wx.getStorageSync('loginState') || !needLogin) {
      if (to) {
        wx.navigateTo({
          url: to
        })
      } else {
        wx.showToast({
          title: '敬请期待...',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  addGroup() {
    wx.navigateTo({
      url: '/pages/group/group'
    })
  },
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return{
      title: '大厂前端面试题，悄悄分享给你！',
      imageUrl: 'https://s-gz-2804-hero-image.oss.dogecdn.com/20220427140039.png'
    }
  },
  onShareTimeline() {
    return{
      title: '哇，真的想不到！！！'
    }
  }
})
