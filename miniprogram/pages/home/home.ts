// home.ts
const { getTopicCate, getTopicList } = require('../../api/index')
import { NAV_TYPES } from '../../utils/constant'
Page({
  data: {
    navs: [
      {
        icon: 'icon-quanbu',
        label: '全部',
        type: NAV_TYPES.all,
        id: null
      },
      {
        icon: 'icon-daixuanze',
        label: '选择题',
        type: NAV_TYPES.choice,
        id: null
      },
      {
        icon: 'icon-javascript',
        label: 'JavaScript',
        type: NAV_TYPES.javaScript,
        id: null
      },
      {
        icon: 'icon-css',
        label: 'CSS',
        type: NAV_TYPES.css,
        id: null
      },
      {
        icon: 'icon-html',
        label: 'HTML',
        type: NAV_TYPES.html,
        id: null
      },
      {
        icon: 'icon-bianchengti',
        label: '编程题',
        type: NAV_TYPES.programme,
        id: null
      },
      {
        icon: 'icon-reactjs',
        label: 'React.js',
        type: NAV_TYPES.reactJs,
        id: null
      },
      {
        icon: 'icon-vuejs',
        label: 'Vue.js',
        type: NAV_TYPES.vueJs,
        id: null
      },
      {
        icon: 'icon-quweiti',
        label: '趣味题',
        type: NAV_TYPES.interest,
        id: null
      },
      {
        icon: 'icon-leetcode',
        label: 'LeetCode',
        type: NAV_TYPES.leetCode,
        id: null
      },
      {
        icon: 'icon-suanfa',
        label: '算法',
        type: NAV_TYPES.algorithm,
        id: null
      },
      {
        icon: 'icon-jisuanjiwangluo',
        label: '计算机网络',
        type: NAV_TYPES.network,
        id: null
      },
      {
        icon: 'icon-nodejs',
        label: 'Node.js',
        type: NAV_TYPES.nodeJs,
        id: null
      },
      {
        icon: 'icon-typescript',
        label: 'TypeScript',
        type: NAV_TYPES.typeScript,
        id: null
      },
      {
        icon: 'icon-xingnengyouhua',
        label: '性能优化',
        type: NAV_TYPES.performance,
        id: null
      },
      {
        icon: 'icon-qianduananquan',
        label: '前端安全',
        type: NAV_TYPES.security,
        id: null
      },
      {
        icon: 'icon-es6',
        label: 'ES6',
        type: NAV_TYPES.es6,
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
        icon: 'icon-gongju',
        label: '工具',
        type: NAV_TYPES.tools,
        id: null
      },
      {
        icon: 'icon-jisuanjijichu',
        label: '计算机基础',
        type: NAV_TYPES.basis,
        id: null
      },
    ],
    currentTime: '',
    pageTotal: 0
  },
  onLoad() {
    this.getTopicCate()
    getTopicList().then((res: any) => {
      let date = new Date()
      const yyyy = date.getFullYear()
      const mm = date.getMonth() + 1
      const dd = date.getDate()
      this.setData({
        pageTotal: res.data.pageTotal,
        currentTime: `${yyyy}/${mm}/${dd}`
      })
    })
  },
  getTopicCate() {
    getTopicCate().then((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        for (let j = 0; j < this.data.navs.length; j++) {
          if (res.data[i].name === this.data.navs[j].type) {
            let str = 'navs['+ j +'].id'
            this.setData({
              [str]: res.data[i].id
            })
          }
        }
      }
    })
  },
  go() {
    wx.showToast({
      title: '敬请期待...',
      icon: 'none',
      duration: 2000
    })
  },
  addGroup() {
    wx.navigateTo({
      url: '/pages/group/group'
    })
  }
})
