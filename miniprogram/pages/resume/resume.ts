// pages/resume/resume.ts
import { eventStore } from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeList: [
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627114418.png',
        download: '链接: https://pan.baidu.com/s/1P_dvdwIYI7LFzxSQKlXDAg?pwd=i6ug 提取码: i6ug'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627114839.png',
        download: '链接: https://pan.baidu.com/s/1X5AxP2Kuz9ZMG1-8F_habA?pwd=lerg 提取码: lerg'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627115115.png',
        download: '链接: https://pan.baidu.com/s/1n_D42mDn2Aq_2x91RRn1gA?pwd=hvft 提取码: hvft'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627115357.png',
        download: '链接: https://pan.baidu.com/s/19lDsleDaoDQ5LzGAlCJNNA?pwd=ghq2 提取码: ghq2'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627115531.png',
        download: '链接: https://pan.baidu.com/s/1qF-f5Y0YdkHlKbvvdUEzPg?pwd=7h0d 提取码: 7h0d'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627115647.png',
        download: '链接: https://pan.baidu.com/s/1rjMMd8MbulxOaC9RCwn5cg?pwd=cw4d 提取码: cw4d'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627115811.png',
        download: '链接: https://pan.baidu.com/s/15wR8RAXUpntuXSQN2XPS0g?pwd=q5dh 提取码: q5dh'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627115933.png',
        download: '链接: https://pan.baidu.com/s/18aUMXDmbq0BFlLaCQqMPyQ?pwd=0m5e 提取码: 0m5e'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627120104.png',
        download: '链接: https://pan.baidu.com/s/1e8q99a_O0HKTq4JPB_B_ZQ?pwd=cglo 提取码: cglo'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627120257.png',
        download: '链接: https://pan.baidu.com/s/1Fr-Nyqt3_wbNxjV_4WpDJA?pwd=rpd9 提取码: rpd9'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627133551.png',
        download: '链接: https://pan.baidu.com/s/1JRwGq3IG5rq8RxlJEiiNSw?pwd=3eia 提取码: 3eia'
      },
      {
        image: 'https://s-gz-2804-hero-image.oss.dogecdn.com/resume/20220627134033.png',
        download: '链接: https://pan.baidu.com/s/1erXkK8h45RjODyV-EtbgoA?pwd=febu 提取码: febu'
      },
    ],
    isVip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    eventStore.onState('isVip', (value: any) => {
      this.setData({ isVip: value })
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

  showImg(e: any) {
    let { current } = e.currentTarget.dataset
    wx.previewImage({
      current: current,
      urls: this.data.resumeList.map(item => item.image)
    })
  },

  download(e: any) {
    let { download } = e.currentTarget.dataset
    if (!this.data.isVip) {
      wx.showModal({
        title: '友情提示',
        content: '你还不是VIP哦，开通VIP免费下载',
        confirmText: '去开通',
        cancelText: '下次再说',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/vip/vip'
            })
          }
        }
      })
      return
    }
    this.getLink(download)
  },

  getLink (download: any) {
    wx.setClipboardData({
      data: download,
      success: function () {
        wx.getClipboardData({
          success: function () {
            wx.showToast({
              title: '简历模板下载已复制',
              icon: 'none'
            })
            wx.hideToast({
              success: (res) => {
                console.log(res)
              }
            })
            wx.showModal({
              title: '提示',
              content: '简历模板下载链接复制成功，请前往浏览器下载。',
              confirmText: '知道了',
              showCancel: false
            })
          }
        })
      }
    })
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