// pages/withdraw/withdraw.ts
import { eventStore } from '../../store/index'
const { getCashList, withdraw } = require('../../api/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    totalAmount: 0,
    cashList: [],
    page: 1,
    pageTotal: 0,
    noMore: false,
    loading: false,
    pageSize: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    eventStore.onState('userInfo', (value: any) => {
      const totalAmount: any = (+value.amount + +value.cash_amount).toFixed(2)
      this.setData({ userInfo: value, totalAmount  })
    })
  },

  getCashList() {
    this.setData({ loading: true })
    getCashList({ page: this.data.page }).then((res: any) => {
      console.log(res)
      if (res.code === 200) {
        const cashList: any = [...this.data.cashList, ...res.data.list]
        this.setData({
          pageTotal: Math.ceil(res.data.pageTotal / this.data.pageSize),
          cashList: cashList,
          loading: false
        })
        this.setData({
          pageTotal: this.data.pageTotal === 0 ? 1 : this.data.pageTotal,
          noMore: this.data.cashList.length === res.data.pageTotal
        })
      }
    })
  },

  withdraw() {
    const { amount }: any = this.data.userInfo
    if (amount <= 0) {
      wx.showToast({
        title: '余额不足，快去推广吧~',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '请稍等...'
    })
    withdraw({ price: amount }).then((res: any) => {
      if (res.code === 200) {
        wx.navigateTo({
          url: `/pages/withdraw-success/withdraw-success?amount=${amount}`
        })
        wx.hideLoading()
      }
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
    this.setData({ page: 1, cashList: [] })
    this.getCashList()
    eventStore.dispatch('getUserInfo')
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
    console.log(page)
    this.getCashList()
  }
})