// components/ad-popup/index.ts
const { getAdImage } = require('../../api/index')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    adv_image: '',
    router: ''
  },

  attached() {
    this.getAdImage()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({ show: false })
    },
    go() {
      wx.navigateTo({
        url: this.data.router
      })
      this.close()
    },
    getAdImage() {
      getAdImage().then((res: any) => {
        const advHome = res.data.filter((item: any) => (item.title === 'adv-home'))
        if (advHome.length) {
          console.log(advHome)
          this.setData({
            adv_image: advHome[0].thumb,
            router: advHome[0].url
          })
        }
      })
    }
  }
})
