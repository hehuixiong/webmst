// pages/study/study.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studyList: [
      {
        title: '最强大、最牛逼的javascript视频教程',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '珠峰2020 JavaScript培训VIP精品课程价值14800',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '兄弟L24集 微信开发VIP教程PHP',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '四大维度解锁 Webpack 3.0 前端工程化',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '视频-理论结合案例，带你打造短视频百万粉丝号',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '尚硅谷Vue硅谷外卖项目视频',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '尚硅谷VUE核心技术视频',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '全网首个微信小程序开发视频教程',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '慕课网 - vue.js高仿饿了么（1-13章全）',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '极客学院 微信小程序进阶实战之分答应用开发',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '基于TypeScript从零重构axios(14章完整版) - 2021年',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '黑马微信小程序在线课堂',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '传智播客前端视频',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '传智播客 WEB前端开发第14期视频教程_2016.12',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '【教程】极客学院小程序视频教程（店主推荐）',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'vue框架',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'vuejs2.0带你入门Vue2.0及学习实战项目',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'vue2构建工具教程',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'vue.js视频教程合集',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'Vue 高级实战-开发移动端音乐WebApp',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '千锋_前端教程_ReactNative项目之美食App（2020首发）',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'MUI视频教程',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'ThinkPHP5.0+微信小程序商城 构建全栈应用完整版',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '撩课学院 Vue2.x+Node.js 拼多多商城项目实战',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'JavaScript 设计模式精讲',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'es6从入门到实战视频',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'ECMAScript6编程艺术',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'CSDN Javascript - ES6 实战视频课程',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '北盟网 SEO-网站搜索引擎优化视频教程',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '2020VUE服务器端渲染-NUXT实战视频（14集）',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '开课吧Web全栈架构师第九期',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: 'uni-app商业级应用实战[next学院]',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '网易云课堂 - uni-app实战仿糗事百科app开发',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '小程序云开发 数据库实战',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '仿腾讯云课堂Vue项目',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '尚硅谷webpack教程（新版）',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '网易云课堂 - uni-app实战社区交友类app开发',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      },
      {
        title: '纯正商业级应用-微信小程序开发实战',
        count: Math.floor(Math.random() * (199 - 10) + 10)
      }
    ],
    currentTitle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
    this.setData({
      currentTitle: ''
    })
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

  onShare(e: any) {
    const { title } = e.target.dataset
    this.setData({
      currentTitle: title
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res: any) {
    console.log(res)
    return{
      title: this.data.currentTitle,
      path:'/pages/study/study'
    }
  }
})