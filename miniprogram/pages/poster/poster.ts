// pages/poster/poster.ts
import { eventStore } from '../../store/index'
const { getVipLevel, getTuiList } = require('../../api/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    jiangli: 0,
    qtsheBackground: '',
    shareImagePath: '',
    maskHidden: false,
    userName: '',
    userHeadUrl: '',
    qrcode: '',
    tuiList: [],
    page: 1,
    pageTotal: 0,
    noMore: false,
    loading: false,
    pageSize: 20,
    moreText: '人家也是有底线的哦~'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getTuiList()
    eventStore.onState('userInfo', (value: any) => {
      this.setData({ userInfo: value, qrcode: value.qrcode })
    })
    eventStore.onState('configInfo', (value: any) => {
      getVipLevel().then((res: any) => {
        const newArr = res.data.filter((item: any) => item.title === '永久VIP')
        if (newArr.length) {
          this.setData({
            jiangli: Number(value.jiangli) * newArr[0].price / 100
          })
        }
      })
    })
    console.log(wx.getSystemInfo)
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
    wx.getImageInfo({
      src: "https://s-gz-2804-hero-image.oss.dogecdn.com/20220724101600.jpg",
      success: (res) => {
        console.log("banner临时路径:" + res.path)
        this.setData({
          qtsheBackground: res.path
        })
      }
    })
    wx.getImageInfo({
      src: this.data.qrcode,
      success: (res) => {
        console.log("⼆维码:" + res.path)
        this.setData({
          qrcode: res.path
        })
      }
    })
  },

  getTuiList() {
    this.setData({ loading: true })
    getTuiList({ page: this.data.page }).then((res: any) => {
      console.log(res)
      if (res.code === 200) {
        const tuiList: any = [...this.data.tuiList, ...res.data.list]
        this.setData({
          pageTotal: Math.ceil(res.data.pageTotal / this.data.pageSize),
          tuiList: tuiList,
          loading: false
        })
        this.setData({
          pageTotal: this.data.pageTotal === 0 ? 1 : this.data.pageTotal,
          noMore: this.data.tuiList.length === res.data.pageTotal
        })
        if (this.data.tuiList.length === 0) {
          this.setData({
            moreText: '亲，暂无收益明细哦~'
          })
        }
      }
    })
  },

  onWithdraw() {
    wx.navigateTo({
      url: '/pages/withdraw/withdraw'
    })
  },

  onFans() {
    wx.navigateTo({
      url: '/pages/fans/fans'
    })
  },

  //点击⽣成海报
  formSubmit: function () {
    wx.showToast({
      title: '海报⽣成中...',
      icon: 'loading'
    })
    this.createNewImg()
    setTimeout(() => {
      wx.hideToast({
        success: (res) => {
          console.log(res)
        }
      })
      this.setData({
        maskHidden: true
      })
    }, 800)
  },
  //将小程序码绘制到固定位置
  setQrcode(context: any) {
    let path = this.data.qrcode //小程序码
    context.drawImage(path, 291, 266, 61, 61)
  },
  //将昵称绘制到canvas的固定位置
  setName(context: any) {
    if (this.data.userName.length >= 8) {
      var title = this.data.userName.substring(0, 7) + '...' + '的邀请函'
    } else {
      var title = this.data.userName + '的邀请函'
    }
    context.setFontSize(16)
    context.setFillStyle('#fff')
    context.fillText(title, (375 - context.measureText(title).width) / 2, 30)
  },
  //绘制用户头像
  setAvatarUrl(context: any) {
    let cx = 30 + 25
    let cy = 320 + 25
    context.arc(cx, cy, 25, 0, 2 * Math.PI)
    context.clip()
    let path = this.data.userHeadUrl
    context.drawImage(path, 30, 320, 52, 52)
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg() {
    let context = wx.createCanvasContext('mycanvas')
    let path = this.data.qtsheBackground
    context.drawImage(path, 0, 0, 375, 532) //以iPhone 6尺寸大小为标准绘制图片
    this.setQrcode(context)
    // this.setName(context)
    // this.setAvatarUrl(context)
    //绘制图片
    context.draw()
    context.save()
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        fileType: 'png',
        width: 375,
        height: 532,
        success: (res) => {
          wx.hideLoading()
          console.log(res.tempFilePath)
          this.setData({
            shareImagePath: res.tempFilePath
          })
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      }, this)
    }, 500)
  },
  //点击保存到相册
  save() {
    wx.showToast({
      icon: 'loading',
      title: '正在保存图⽚',
      duration: 1000
    })
    wx.getSetting({
      success: (res) => {
        // 如果已授权
        if (res.authSetting['scope.writePhotosAlbum']) {
          this.savePhoto()
          // 如果没有授权 
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          // 调起用户授权
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              this.savePhoto()
            },
            fail() {
              wx.showToast({
                title: '您没有授权，无法保存到相册',
                icon: 'none'
              })
            }
          })
          // 如果之前授权已拒绝
        } else {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.writePhotosAlbum']) {
                this.savePhoto()
              } else {
                wx.showToast({
                  title: '您没有授权，无法保存到相册',
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    })
  },
  //保存图⽚到相册，提⽰保存成功
  savePhoto() {
    setTimeout(() => {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.shareImagePath,
        success: () => {
          wx.showToast({
            title: '保存成功，快去分享赚佣金吧',
            icon: 'none',
            duration: 3000
          })
        }
      })
    }, 100)
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
    if(this.data.page == this.data.pageTotal) {
      this.setData({
        noMore: true
      })
      return
    }

    let { page } = this.data
    this.setData({
      page: ++page
    })
    this.getTuiList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '大厂前端面试题，悄悄分享给你！',
      imageUrl: 'https://s-gz-2804-hero-image.oss.dogecdn.com/20220427140039.png',
      path: `/pages/home/home?scene=${this.data.userInfo.uid}`
    }
  }
})