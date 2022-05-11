// pages/skills-res/skills-res.ts
import { setWatcher } from '../../utils/watch'
const localList = require("../../data/skillsList")
const localRes = require("../../data/skillsRes")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    index: 0,
    answer: '',
    sum: 0,
    first: false,
    last: false,
    previous: '',
    later: '',
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ query }: any) {
    const skillsRes = localRes.data
    const { index, id, title }: any = query ? JSON.parse(query) : {}
    this.setData({
      title: title,
      sum: localList.data.length,
      index: Number(index),
      answer: skillsRes[id]
    })
    this.setCurrentSkills(this.data.index)
    setWatcher(this)
  },

  watch: {
    // 需要监听的字段
    index(val: any) {
      this.setCurrentSkills(val)
    }
  },

  setCurrentSkills(val: any) {
    if (val === 0) {
      this.setData({ first: true })
    } else if (val === this.data.sum - 1) {
      this.setData({ last: true })
    } else {
      this.setData({
        first: false,
        last: false
      })
    }
    // 回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    const { title, id } = localList?.data[val]
    this.setData({ title: title, loading: true })
    const timer = setTimeout(() => {
      this.setData({
        answer: localRes.data[id],
        previous: localList?.data[val - 1],
        later: localList?.data[val + 1],
        loading: false
      })
      clearTimeout(timer)
    },  Math.floor(Math.random() * (500 - 100) + 100))
  },

  /**
   * 上一篇
   */
  prevPiece() {
    let val = this.data.index
    this.setData({ index: --val })
  },
  /**
   * 下一篇
   */
  nextPiece() {
    let val = this.data.index
    this.setData({ index: ++val })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const query = { id: this.data.id, index: this.data.index, title: this.data.title }
    return{
      title: '大厂前端面试题，悄悄分享给你！',
      path: `/pages/skills-res/skills-res?query=${JSON.stringify(query)}`
    }
  }
})