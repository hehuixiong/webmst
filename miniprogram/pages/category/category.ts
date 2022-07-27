// pages/category/category.ts
import { NAV_TYPES } from '../../utils/constant'
const { getTopicCate } = require('../../api/index')
import { eventStore } from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        icon: 'icon-xiaochengxu',
        label: '微信小程序',
        type: NAV_TYPES.miniprogram,
        id: null
      },
      {
        icon: 'icon-nodejs',
        label: 'Node.js',
        type: NAV_TYPES.nodeJs,
        id: null
      },
      {
        icon: 'icon-suanfa',
        label: '算法',
        type: NAV_TYPES.algorithm,
        id: null
      },
      {
        icon: 'icon-gongju',
        label: '工具',
        type: NAV_TYPES.tools,
        id: null
      },
      {
        icon: 'icon-bianchengti',
        label: '编程题',
        type: NAV_TYPES.programme,
        id: null
      },
      {
        icon: 'icon-qianduananquan',
        label: '前端安全',
        type: NAV_TYPES.security,
        id: null
      },
      {
        icon: 'icon-quweiti',
        label: '趣味题',
        type: NAV_TYPES.interest,
        id: null
      },
      {
        icon: 'icon-jisuanjiwangluo',
        label: '计算机网络',
        type: NAV_TYPES.network,
        id: null
      },
      {
        icon: 'icon-xingnengyouhua',
        label: '性能优化',
        type: NAV_TYPES.performance,
        id: null
      },
      {
        icon: 'icon-shejimoshe',
        label: '设计模式',
        type: NAV_TYPES.designMode,
        id: null
      },
      {
        icon: 'icon-gongchenghua',
        label: '工程化',
        type: NAV_TYPES.engineering,
        id: null
      },
      {
        icon: 'icon-jisuanjijichu',
        label: '计算机基础',
        type: NAV_TYPES.basis,
        id: null
      },
      {
        icon: 'icon-leetcode',
        label: 'LeetCode',
        type: NAV_TYPES.leetCode,
        id: null
      },
      {
        icon: 'icon-shenhefangshixuanze',
        label: '选择题',
        type: NAV_TYPES.choice,
        id: null
      }
    ],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },

  setUserInfo() {
    if (wx.getStorageSync('loginState')) {
      eventStore.dispatch('getUserInfo')
      eventStore.onState('userInfo', (value: any) => {
        this.setData({ userInfo: value })
      })
    }
  },

  getTopicCate() {
    getTopicCate().then((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        for (let j = 0; j < this.data.category.length; j++) {
          if (res.data[i].name === this.data.category[j].type) {
            this.setData({
              [`category[${j}].id`]: res.data[i].id,
              [`category[${j}].cate_num`]: res.data[i].cate_num,
              [`category[${j}].has_cate_num`]: res.data[i].has_cate_num
            })
          }
        }
      }
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
    this.setUserInfo()
    this.getTopicCate()
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

  }
})