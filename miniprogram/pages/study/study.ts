// pages/study/study.ts
import { numFormat } from '../../utils/util'
import { eventStore } from '../../store/index'
const list = [
  {
    title: 'Vue2.5-2.6-3.0开发去哪儿网App从零基础入门到实战（最新版）',
    count: '2.0k',
    course: 'https://pan.baidu.com/s/15SGOF67wtePir-PVcIwqeA?pwd=be44'
  },
  {
    title: '最强大、最牛逼的javascript视频教程',
    count: '1.6k',
    course: 'https://pan.baidu.com/s/14VmfWoEu8Gbi61ypqZFJ6A?pwd=ws6n'
  },
  {
    title: '珠峰2020 JavaScript培训VIP精品课程价值14800',
    count: 985,
    course: 'https://pan.baidu.com/s/1043Y89gnDxXf2LM0ruRjdw?pwd=vgn1'
  },
  {
    title: '兄弟L24集 微信开发VIP教程PHP',
    count: 123,
    course: 'https://pan.baidu.com/s/1nQgonnwihzL9OraosCbJCQ?pwd=gb5e'
  },
  {
    title: '四大维度解锁 Webpack 3.0 前端工程化',
    count: 445,
    course: 'https://pan.baidu.com/s/1PPEvGrxjIBisfq9KK3dlWA?pwd=6bof'
  },
  {
    title: '视频-理论结合案例，带你打造短视频百万粉丝号',
    count: 563,
    course: 'https://pan.baidu.com/s/1N2ELx5EPRXyi5gkeKVGgDQ?pwd=mau1'
  },
  {
    title: '尚硅谷Vue硅谷外卖项目视频',
    count: 344,
    course: 'https://pan.baidu.com/s/1N2ELx5EPRXyi5gkeKVGgDQ?pwd=mau1'
  },
  {
    title: '尚硅谷VUE核心技术视频',
    count: 665,
    course: 'https://pan.baidu.com/s/1nUU_AL9WFIEmOf9L1ieJtg?pwd=dv0k'
  },
  {
    title: '全网首个微信小程序开发视频教程',
    count: 776,
    course: 'https://pan.baidu.com/s/19h-aVimUm321Hf7zJ2wziw?pwd=9w7i'
  },
  {
    title: '慕课网 - vue.js高仿饿了么（1-13章全）',
    count: 234,
    course: 'https://pan.baidu.com/s/168jBG90zJxKiNh_dIjiqVA?pwd=n0dr'
  },
  {
    title: '极客学院 微信小程序进阶实战之分答应用开发',
    count: '1.2k',
    course: 'https://pan.baidu.com/s/1FlLd4esqQ7gYf6KnlfZoJQ?pwd=gc5j'
  },
  {
    title: '基于TypeScript从零重构axios(14章完整版) - 2021年',
    count: '1.4k',
    course: 'https://pan.baidu.com/s/1FlLd4esqQ7gYf6KnlfZoJQ?pwd=gc5j'
  },
  {
    title: '黑马微信小程序在线课堂',
    count: 334,
    course: 'https://pan.baidu.com/s/1FlLd4esqQ7gYf6KnlfZoJQ?pwd=gc5j'
  },
  {
    title: '黑马程序员前端视频',
    count: 764,
    course: 'https://pan.baidu.com/s/1S6g7ROk5xkl59_VkySkp1w?pwd=4lq9'
  },
  {
    title: '黑马程序员 WEB前端开发第14期视频教程_2020.12',
    count: 224,
    course: 'https://pan.baidu.com/s/1S6g7ROk5xkl59_VkySkp1w?pwd=4lq9'
  },
  {
    title: '【教程】极客学院小程序视频教程（店主推荐）',
    count: 786,
    course: 'https://pan.baidu.com/s/11lx8szhIEHTBENRjGCPhGA?pwd=tfb5'
  },
  {
    title: '前端vue框架从0到1',
    count: '1.8k',
    course: 'https://pan.baidu.com/s/171178b1K2FH6hfL1VLUirw?pwd=fsww'
  },
  {
    title: 'vuejs2.0带你入门Vue2.0及学习实战项目',
    count: '1.3k',
    course: 'https://pan.baidu.com/s/19XUKN67YCARnsYrJ2yEj-A?pwd=c65g'
  },
  {
    title: 'vue2构建工具教程',
    count: 535,
    course: 'https://pan.baidu.com/s/1VYRh3kUw40g9CaInTasiKQ?pwd=3nqn'
  },
  {
    title: 'vue.js视频教程合集',
    count: 468,
    course: 'https://pan.baidu.com/s/1EM_chLeixblxa28uv37JyA?pwd=8lho'
  },
  {
    title: 'Vue 高级实战-开发移动端音乐WebApp',
    count: '1.6k',
    course: 'https://pan.baidu.com/s/1x8YwWy2yBVPEWKUAWjb4pQ?pwd=d1il'
  },
  {
    title: '千锋_前端教程_ReactNative项目之美食App（2020首发）',
    count: 446,
    course: 'https://pan.baidu.com/s/1icPlglUeOGYZM4wPZKKVXw?pwd=oeqg'
  },
  {
    title: 'MUI视频教程',
    count: 499,
    course: 'https://pan.baidu.com/s/1sFQoxzSKgQxMWzdKuXgeSw?pwd=e3ui'
  },
  {
    title: 'ThinkPHP5.0+微信小程序商城 构建全栈应用完整版',
    count: 775,
    course: 'https://pan.baidu.com/s/1IoLxhF30MPDCffvECcoemA?pwd=oifv'
  },
  {
    title: '撩课学院 Vue2.x+Node.js 拼多多商城项目实战',
    count: 115,
    course: 'https://pan.baidu.com/s/1Pax6KccXAF7QjKVoL06TxQ?pwd=viju'
  },
  {
    title: 'JavaScript 设计模式精讲',
    count: 981,
    course: 'https://pan.baidu.com/s/17Fms6_jzRzzhoLw8JmAOlg?pwd=58ks'
  },
  {
    title: 'es6从入门到实战视频',
    count: '1.2k',
    course: 'https://pan.baidu.com/s/1Zor0xHn-WpijeYzn1nGQAQ?pwd=wdb4'
  },
  {
    title: 'ECMAScript6编程艺术',
    count: 588,
    course: 'https://pan.baidu.com/s/1m7Ytb26yi9wf82ZyKznJug?pwd=qftb'
  },
  {
    title: 'CSDN Javascript - ES6 实战视频课程',
    count: 843,
    course: 'https://pan.baidu.com/s/10BJdV6gg9G8BWIUiBGuI9g?pwd=6c2v'
  },
  {
    title: '北盟网 SEO-网站搜索引擎优化视频教程',
    count: 985,
    course: 'https://pan.baidu.com/s/1EtGt150BR87kXZwRdYVTLw?pwd=kbb5'
  },
  {
    title: '2020VUE服务器端渲染-NUXT实战视频（14集）',
    count: 166,
    course: 'https://pan.baidu.com/s/1xgVKfbc0NoZ7Y5pa47BciA?pwd=p5e9'
  },
  {
    title: '开课吧Web全栈架构师第九期',
    count: 764,
    course: 'https://pan.baidu.com/s/1XG3K7sRUYoJgguoLq3UYAw?pwd=j7pb'
  },
  {
    title: 'uni-app商业级应用实战[next学院]',
    count: 336,
    course: 'https://pan.baidu.com/s/1muuRPYFldYWNWyR6-Y_2Zw?pwd=kgwd'
  },
  {
    title: '网易云课堂 - uni-app实战仿糗事百科app开发',
    count: 935,
    course: 'https://pan.baidu.com/s/1N2XEbp0fH97fRfadOHo1PA?pwd=4jqf'
  },
  {
    title: '小程序云开发 数据库实战',
    count: 369,
    course: 'https://pan.baidu.com/s/1SZqTH5e_-xCGXiAmQO470g?pwd=h506'
  },
  {
    title: '仿腾讯云课堂Vue项目',
    count: '1.4k',
    course: 'https://pan.baidu.com/s/11vzAvdZ3HP8qKTOO8uM3Pg?pwd=vq51'
  },
  {
    title: '尚硅谷webpack教程（新版）',
    count: 559,
    course: 'https://pan.baidu.com/s/1_vmiHkVF7K5RVRShxrKong?pwd=kwup'
  },
  {
    title: '网易云课堂 - uni-app实战社区交友类app开发',
    count: 885,
    course: 'https://pan.baidu.com/s/1J1ws6O1N5O6cr265p_YGxg?pwd=va6n'
  },
  {
    title: '纯正商业级应用-微信小程序开发实战',
    count: 557,
    course: 'https://pan.baidu.com/s/1snQHkkyaTtff6CvBG0kzwA?pwd=1173'
  },
  {
    title: '[实战]前端JavaScript面试技巧',
    count: 449,
    course: 'https://pan.baidu.com/s/1bypOQsnpOJOBNJBViAAfrA?pwd=pacw'
  },
  {
    title: 'Vue全家桶+SSR+Koa2全栈开发美团网',
    count: 663,
    course: 'https://pan.baidu.com/s/1afNk9M7gX8oDrSI-GcGmQw?pwd=hr93'
  },
  {
    title: 'vue3.2+elementPlus快速上手(提供vue3.2学习文档)',
    count: 772,
    course: '链接：https://www.bilibili.com/video/BV1DQ4y1m7K1?p=3&spm_id_from=333.337.top_right_bar_window_history.content.click'
  },
  {
    title: '前端项目/vue项目实战/vue+element-ui/vue经典案例分享/紧贴实战的vue经典案例',
    count: '1.4k',
    course: '链接：https://www.bilibili.com/video/BV1QU4y1E7qo?spm_id_from=333.337.search-card.all.click'
  },
  {
    title: '2022最新WEB前端面试题大汇总前端面试必备',
    count: '1.3k',
    course: '链接：https://www.bilibili.com/video/BV1Xa411z7Hc?spm_id_from=333.337.search-card.all.click'
  },
  {
    title: '2022web前端面试秋招/web前端面试春招/web前端就业/前端自学必刷',
    count: 660,
    course: '链接：https://www.bilibili.com/video/BV1sN411974w?spm_id_from=333.337.search-card.all.click'
  }
]
const title = '大厂前端面试题，悄悄分享给你！'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studyPageList: [],
    studyList: [],
    currentTitle: title,
    page: 1,
    totalPage: 0,
    pageSize: 16,
    isVip: false,
    vipShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const studyList: any = list
    this.setData({
      studyList: studyList,
      totalPage: Math.ceil(list.length / this.data.pageSize) === 0 ? 1 : Math.ceil(list.length / this.data.pageSize)
    })
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
    })
    this.setCurrentPageData()
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
      currentTitle: title
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
    if(this.data.page == this.data.totalPage) {
      this.setData({
        noMore: true
      })
      return
    }

    let { page } = this.data
    this.setData({
      page: ++page,
      loading: true
    })
    const timer = setTimeout(() => {
      this.setCurrentPageData()
      clearTimeout(timer)
    }, Math.floor(Math.random() * (500 - 100) + 100))
  },

  onShare(e: any) {
    const { title } = e.target.dataset
    this.setData({
      currentTitle: title
    })
  },

  /**
   * 立即领取
   */
  immediatelyGet(e: any) {
    if (!wx.getStorageSync('loginState')) {
      eventStore.dispatch('login')
      return
    }
    if (!this.data.isVip) {
      this.setData({ vipShow: true })
      return
    }
    const { title, course, index } = e.target.dataset
    const _this = this
    wx.showModal({
      title: '教程名称',
      content: title,
      confirmText: '复制链接',
      showCancel: false,
      confirmColor: '#ff3d3d',
      success (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: course,
            success: function () {
              wx.getClipboardData({
                //这个api是把拿到的数据放到电脑系统中的
                success: function () {
                  wx.showToast({
                    title: '内容已复制',
                    icon: 'none'
                  })
                  wx.hideToast({
                    success: (res) => {
                      console.log(res)
                    }
                  })
                  wx.showModal({
                    title: '提示',
                    content: '教程下载地址复制成功，请前往浏览器下载。',
                    confirmText: '知道了',
                    showCancel: false
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  /**
   * 处理分页
   */
  setCurrentPageData() {
    let begin = (this.data.page - 1) * this.data.pageSize
    let end = this.data.page * this.data.pageSize
    this.setData({
      studyPageList: [...this.data.studyPageList, ...this.data.studyList.slice(begin, end)],
      loading: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return{
      title: this.data.currentTitle
    }
  }
})