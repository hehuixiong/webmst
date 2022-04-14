// pages/study/study.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studyList: [
      {
        title: '最强大、最牛逼的javascript视频教程',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/14VmfWoEu8Gbi61ypqZFJ6A?pwd=ws6n 提取码: ws6n',
        id: 1
      },
      {
        title: '珠峰2020 JavaScript培训VIP精品课程价值14800',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1043Y89gnDxXf2LM0ruRjdw?pwd=vgn1 提取码: vgn1',
        id: 2
      },
      {
        title: '兄弟L24集 微信开发VIP教程PHP',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1nQgonnwihzL9OraosCbJCQ?pwd=gb5e 提取码: gb5e',
        id: 3
      },
      {
        title: '四大维度解锁 Webpack 3.0 前端工程化',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1PPEvGrxjIBisfq9KK3dlWA?pwd=6bof 提取码: 6bof',
        id: 4
      },
      {
        title: '视频-理论结合案例，带你打造短视频百万粉丝号',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1N2ELx5EPRXyi5gkeKVGgDQ?pwd=mau1 提取码: mau1',
        id: 5
      },
      {
        title: '尚硅谷Vue硅谷外卖项目视频',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1N2ELx5EPRXyi5gkeKVGgDQ?pwd=mau1 提取码: mau1',
        id: 6
      },
      {
        title: '尚硅谷VUE核心技术视频',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1nUU_AL9WFIEmOf9L1ieJtg?pwd=dv0k 提取码: dv0k',
        id: 7
      },
      {
        title: '全网首个微信小程序开发视频教程',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/19h-aVimUm321Hf7zJ2wziw?pwd=9w7i 提取码: 9w7i',
        id: 8
      },
      {
        title: '慕课网 - vue.js高仿饿了么（1-13章全）',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/168jBG90zJxKiNh_dIjiqVA?pwd=n0dr 提取码: n0dr',
        id: 9
      },
      {
        title: '极客学院 微信小程序进阶实战之分答应用开发',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1FlLd4esqQ7gYf6KnlfZoJQ?pwd=gc5j 提取码: gc5j',
        id: 10
      },
      {
        title: '基于TypeScript从零重构axios(14章完整版) - 2021年',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1FlLd4esqQ7gYf6KnlfZoJQ?pwd=gc5j 提取码: gc5j',
        id: 11
      },
      {
        title: '黑马微信小程序在线课堂',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1FlLd4esqQ7gYf6KnlfZoJQ?pwd=gc5j 提取码: gc5j',
        id: 12
      },
      {
        title: '传智播客前端视频',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1S6g7ROk5xkl59_VkySkp1w?pwd=4lq9 提取码: 4lq9',
        id: 13
      },
      {
        title: '传智播客 WEB前端开发第14期视频教程_2020.12',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1S6g7ROk5xkl59_VkySkp1w?pwd=4lq9 提取码: 4lq9',
        id: 14
      },
      {
        title: '【教程】极客学院小程序视频教程（店主推荐）',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/11lx8szhIEHTBENRjGCPhGA?pwd=tfb5 提取码: tfb5',
        id: 15
      },
      {
        title: '前端vue框架从0到1',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/171178b1K2FH6hfL1VLUirw?pwd=fsww 提取码: fsww',
        id: 16
      },
      {
        title: 'vuejs2.0带你入门Vue2.0及学习实战项目',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/19XUKN67YCARnsYrJ2yEj-A?pwd=c65g 提取码: c65g',
        id: 17
      },
      {
        title: 'vue2构建工具教程',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1VYRh3kUw40g9CaInTasiKQ?pwd=3nqn 提取码: 3nqn',
        id: 18
      },
      {
        title: 'vue.js视频教程合集',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1EM_chLeixblxa28uv37JyA?pwd=8lho 提取码: 8lho',
        id: 19
      },
      {
        title: 'Vue 高级实战-开发移动端音乐WebApp',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1x8YwWy2yBVPEWKUAWjb4pQ?pwd=d1il 提取码: d1il',
        id: 20
      },
      {
        title: '千锋_前端教程_ReactNative项目之美食App（2020首发）',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1icPlglUeOGYZM4wPZKKVXw?pwd=oeqg 提取码: oeqg',
        id: 21
      },
      {
        title: 'MUI视频教程',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1sFQoxzSKgQxMWzdKuXgeSw?pwd=e3ui 提取码: e3ui',
        id: 22
      },
      {
        title: 'ThinkPHP5.0+微信小程序商城 构建全栈应用完整版',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1IoLxhF30MPDCffvECcoemA?pwd=oifv 提取码: oifv',
        id: 23
      },
      {
        title: '撩课学院 Vue2.x+Node.js 拼多多商城项目实战',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1Pax6KccXAF7QjKVoL06TxQ?pwd=viju 提取码: viju',
        id: 24
      },
      {
        title: 'JavaScript 设计模式精讲',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/17Fms6_jzRzzhoLw8JmAOlg?pwd=58ks 提取码: 58ks',
        id: 25
      },
      {
        title: 'es6从入门到实战视频',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1Zor0xHn-WpijeYzn1nGQAQ?pwd=wdb4 提取码: wdb4',
        id: 26
      },
      {
        title: 'ECMAScript6编程艺术',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1m7Ytb26yi9wf82ZyKznJug?pwd=qftb 提取码: qftb',
        id: 27
      },
      {
        title: 'CSDN Javascript - ES6 实战视频课程',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/10BJdV6gg9G8BWIUiBGuI9g?pwd=6c2v 提取码: 6c2v',
        id: 28
      },
      {
        title: '北盟网 SEO-网站搜索引擎优化视频教程',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1EtGt150BR87kXZwRdYVTLw?pwd=kbb5 提取码: kbb5',
        id: 29
      },
      {
        title: '2020VUE服务器端渲染-NUXT实战视频（14集）',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1xgVKfbc0NoZ7Y5pa47BciA?pwd=p5e9 提取码: p5e9',
        id: 30
      },
      {
        title: '开课吧Web全栈架构师第九期',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1XG3K7sRUYoJgguoLq3UYAw?pwd=j7pb 提取码: j7pb',
        id: 31
      },
      {
        title: 'uni-app商业级应用实战[next学院]',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1muuRPYFldYWNWyR6-Y_2Zw?pwd=kgwd 提取码: kgwd',
        id: 32
      },
      {
        title: '网易云课堂 - uni-app实战仿糗事百科app开发',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1N2XEbp0fH97fRfadOHo1PA?pwd=4jqf 提取码: 4jqf',
        id: 33
      },
      {
        title: '小程序云开发 数据库实战',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1SZqTH5e_-xCGXiAmQO470g?pwd=h506 提取码: h506',
        id: 34
      },
      {
        title: '仿腾讯云课堂Vue项目',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/11vzAvdZ3HP8qKTOO8uM3Pg?pwd=vq51 提取码: vq51',
        id: 35
      },
      {
        title: '尚硅谷webpack教程（新版）',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1_vmiHkVF7K5RVRShxrKong?pwd=kwup 提取码: kwup',
        id: 36
      },
      {
        title: '网易云课堂 - uni-app实战社区交友类app开发',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1J1ws6O1N5O6cr265p_YGxg?pwd=va6n 提取码: va6n',
        id: 37
      },
      {
        title: '纯正商业级应用-微信小程序开发实战',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1snQHkkyaTtff6CvBG0kzwA?pwd=1173 提取码: 1173',
        id: 38
      },
      {
        title: '[实战]前端JavaScript面试技巧',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1bypOQsnpOJOBNJBViAAfrA?pwd=pacw 提取码: pacw',
        id: 39
      },
      {
        title: 'Vue全家桶+SSR+Koa2全栈开发美团网',
        count: Math.floor(Math.random() * (199 - 10) + 10),
        course: '链接: https://pan.baidu.com/s/1afNk9M7gX8oDrSI-GcGmQw?pwd=hr93 提取码: hr93',
        id: 40
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
   * 立即领取
   */
  immediatelyGet(e: any) {
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
                    title: '温馨提示',
                    content: '教程下载地址复制成功，请前往浏览器下载。',
                    confirmText: '我知道了',
                    showCancel: false,
                    confirmColor: '#57bd6a',
                    success (res) {
                      if (res.confirm) {
                        let { count } = _this.data.studyList[index]
                        const setKey =  `studyList[${index}].count`
                        if (count === 0) return
                        _this.setData({
                          [setKey]: --count
                        })
                      }
                    }
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