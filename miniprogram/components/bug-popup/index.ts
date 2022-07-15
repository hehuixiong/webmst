// components/bug-popup/index.ts
const { setProblemBug } = require('../../api/index')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    topicId: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bugMsgList: [
      { type: 1, label: '题干有误' },
      { type: 2, label: '答案有误' },
      { type: 3, label: '内容不全' },
      { type: 4, label: '排版问题' },
      { type: 5, label: '有错别字' },
      { type: 6, label: '题干/答案看不懂' },
      { type: 7, label: '其他（请补充）' }
    ],
    active: 1,
    fileList:[],
    value: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({ show: false })
      const timer = setTimeout(() => {
        this.setData({ value: '', fileList: [], active: 1 })
        clearTimeout(timer)
      }, 300)
    },
    remove(array: any, index: any) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] == index) {
          array.splice(i, 1)
        }
      }
      return []
    },
    deleteImg(event: any) {
      const { index } = event.detail
      let { fileList }: any = this.data
      fileList = this.remove(fileList, index)
      this.setData({ fileList })
    },
    afterRead(event: any) {
      const { file } = event.detail
      console.log(file.url)
      const _this = this
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.uploadFile({
        url: 'https://webmst.ithhx.cn/vehicle/index/upload_img', // 仅为示例，非真实的接口地址
        filePath: file.url,
        name: 'file',
        formData: {
          'name': 'activity'
        },
        success(res) {
          // 上传完成需要更新 fileList
          const result = JSON.parse(res.data)
          console.log(result?.data?.data?.img)
          const { fileList = [] }: any = _this.data
          fileList.push({ ...file, url: result?.data?.data?.img })
          _this.setData({ fileList })
        }
      })
    },
    onClick(event: any) {
      const { type } = event.currentTarget.dataset
      this.setData({ active: type })
    },
    onInput(event: any) {
      const { value } = event.detail
      this.setData({ value })
    },
    submit() {
      if (!this.data.value) {
        wx.showToast({
          title: '请补充说明',
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.showLoading({
        title: '请稍等...'
      })
      const image: any = this.data.fileList.length && this.data.fileList[0]
      console.log(image.url)
      console.log(this.data)
      setProblemBug({
        id: this.data.topicId,
        content: this.data.value,
        type: this.data.active,
        img: image.url
      }).then(() => {
        wx.showToast({
          title: '感谢你的反馈',
          duration: 2000
        })
        this.onClose()
      })
    }
  }
})
