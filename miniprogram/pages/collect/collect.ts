const { getCollectList } = require('../../api/index')
import { handleTime } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: [],
    page: 1,
    pageTotal: 0,
    noMore: false,
    loading: false,
    empty: false,
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getCollectList()
  },

  getCollectList() {
    this.setData({ loading: true })
    getCollectList({
      page: this.data.page
    }).then((res: any) => {
      for (let i = 0; i < res.data.list.length; i++) {
        res.data.list[i].create_time = handleTime(res.data.list[i].create_time)
      }
      const collectList: any = [...this.data.collectList, ...res.data.list]
      console.log(res)
      this.setData({
        pageTotal: Math.ceil(res.data.pageTotal / this.data.pageSize),
        collectList: collectList,
        loading: false,
        empty: res.data.pageTotal === 0
      })
      this.setData({
        pageTotal: this.data.pageTotal === 0 ? 1 : this.data.pageTotal,
        noMore: this.data.collectList.length === res.data.pageTotal
      })
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
    this.getCollectList()
  }
})