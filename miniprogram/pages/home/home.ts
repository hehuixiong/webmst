// home.ts
import { NAV_TYPES } from '../../utils/constant'
Page({
  data: {
    navs: [
      {
        icon: 'icon-quanbu',
        name: '全部',
        type: NAV_TYPES.all
      },
      {
        icon: 'icon-daixuanze',
        name: '选择题',
        type: NAV_TYPES.choice
      },
      {
        icon: 'icon-javascript',
        name: 'JavaScript',
        type: NAV_TYPES.javaScript
      },
      {
        icon: 'icon-css',
        name: 'CSS',
        type: NAV_TYPES.css
      },
      {
        icon: 'icon-html',
        name: 'HTML',
        type: NAV_TYPES.html
      },
      {
        icon: 'icon-bianchengti',
        name: '编程题',
        type: NAV_TYPES.programme
      },
      {
        icon: 'icon-reactjs',
        name: 'React.js',
        type: NAV_TYPES.reactJs
      },
      {
        icon: 'icon-vuejs',
        name: 'Vue.js',
        type: NAV_TYPES.vueJs
      },
      {
        icon: 'icon-quweiti',
        name: '趣味题',
        type: NAV_TYPES.interest
      },
      {
        icon: 'icon-leetcode',
        name: 'LeetCode',
        type: NAV_TYPES.leetCode
      },
      {
        icon: 'icon-suanfa',
        name: '算法',
        type: NAV_TYPES.algorithm
      },
      {
        icon: 'icon-jisuanjiwangluo',
        name: '计算机网络',
        type: NAV_TYPES.network
      },
      {
        icon: 'icon-nodejs',
        name: 'Node.js',
        type: NAV_TYPES.nodeJs
      },
      {
        icon: 'icon-typescript',
        name: 'TypeScript',
        type: NAV_TYPES.typeScript
      },
      {
        icon: 'icon-xingnengyouhua',
        name: '性能优化',
        type: NAV_TYPES.performance
      },
      {
        icon: 'icon-qianduananquan',
        name: '前端安全',
        type: NAV_TYPES.security
      },
      {
        icon: 'icon-es6',
        name: 'ES6',
        type: NAV_TYPES.es6
      },
      {
        icon: 'icon-shejimoshe',
        name: '设计模式',
        type: NAV_TYPES.designMode
      },
      {
        icon: 'icon-gongchenghua',
        name: '工程化',
        type: NAV_TYPES.engineering
      },
      {
        icon: 'icon-gongju',
        name: '工具',
        type: NAV_TYPES.tools
      },
      {
        icon: 'icon-jisuanjijichu',
        name: '计算机基础',
        type: NAV_TYPES.basis
      },
    ],
    currentTime: ''
  },
  onLoad() {
    let date = new Date()
    const yyyy = date.getFullYear()
    const mm = date.getMonth() + 1
    const dd = date.getDate()
    this.setData({
      currentTime: `${yyyy}/${mm}/${dd}`
    })
  },
  go() {
    wx.showToast({
      title: '敬请期待...',
      icon: 'none',
      duration: 2000
    })
  }
})
