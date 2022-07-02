// home.ts
const { getTopicCate, getAdImage, qiandao } = require('../../api/index')
const app = getApp()
import { NAV_TYPES } from '../../utils/constant'
import { eventStore } from '../../store/index'
Page({
  refresh: false,
  data: {
    swiper: [],
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
        icon: 'icon-quanbu',
        label: '全部分类',
        type: NAV_TYPES.all,
        id: null
      }
    ],
    assist: [
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220100.png',
        label: '简历模板',
        to: '/pages/resume/resume'
      },
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220101.png',
        label: '项目经验',
        to: '/pages/project-list/project-list'
      },
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220102.png',
        label: '面经合集',
        to: '/pages/face-list/face-list'
      },
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220106.png',
        label: '面试技巧',
        to: '/pages/skills-list/skills-list'
      },
      {
        url: 'https://s-gz-2804-hero-image.oss.dogecdn.com/icons/20220501220104.png',
        label: '介绍模板',
        to: '/pages/introduce/introduce'
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
    isNotice: false,
    noticeText: '',
    scrollable: false,
    showSignin: false,
    isSign: false,
    configInfo: {}
  },
  onLoad() {
    this.getTopicCate()
    this.getAdImage()
    eventStore.onState('showgroup', (value: any) => {
      this.setData({ showgroup: value })
    })
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
    eventStore.onState('isSign', (value: any) => {
      this.setData({ isSign: value })
    })
    eventStore.onState('configInfo', (value: any) => {
      this.setData({ configInfo: value })
    })
    eventStore.dispatch('setIsIos', app.globalSystemInfo && app.globalSystemInfo.ios)
  },
  getAdImage() {
    getAdImage().then((res: any) => {
      console.log(res)
      const bannerList = res.data.filter((item: any) => (item.title === 'banner'))
      const noticeList = res.data.filter((item: any) => (item.title === 'notice'))
      if (noticeList.length) {
        this.setData({
          isNotice: true,
          noticeText: noticeList[0].url
        })
        if (this.data.noticeText.indexOf('秒杀') >= 0) {
          this.setData({
            scrollable: true
          })
        }
      }
      this.setData({
        swiper: bannerList
      })
    })
  },
  todaySignin() {
    if (!wx.getStorageSync('loginState')) {
      eventStore.dispatch('login')
      return 
    }
    // 是否已签到
    if (this.data.isSign) {
      wx.showToast({
        title: '今日已经签到，不能重复获取积分',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '请稍等...'
    })
    qiandao().then((res: any) => {
      if (res.code === 200) {
        this.setData({
          showSignin: true
        })
        eventStore.dispatch('getUserInfo')
        wx.hideLoading()
        return
      }
    })
  },
  closeTip() {
    this.setData({ hideTip: true })
    wx.setStorageSync('hideTip', true)
  },
  jumpVip() {
    wx.navigateTo({
      url: '/pages/vip/vip'
    })
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
            this.setData({
              [`category[${j}].id`]: res.data[i].id,
              [`category[${j}].cate_num`]: res.data[i].cate_num
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
    console.log(e, '111')
    const {
      to,
      needLogin
    } = e.currentTarget.dataset.item
    if (!wx.getStorageSync('loginState') && needLogin) {
      eventStore.dispatch('login')
      return 
    }
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
  },
  addGroup() {
    wx.navigateTo({
      url: '/pages/group/group'
    })
  },
  addMsjq() {
    wx.navigateTo({
      url: '/pages/skills-list/skills-list'
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

  init() {
    const timer = setTimeout(() => {
      this.refresh = false;
      wx.stopPullDownRefresh()
      clearTimeout(timer)
    }, 800)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 判断是不是刷新
    if (this.refresh) {
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '您刷新频率过快~',
        icon: 'none',
        duration: 1500,
      })
      return
    }
    this.refresh = true
    this.init()
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
