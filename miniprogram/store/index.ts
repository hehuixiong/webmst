const { HYEventStore } = require('hy-event-store')
const { getConfig, getUserInfo } = require('../api/index')
const { login } = require('../api/index')
import { handleTime } from '../utils/util'

const eventStore = new HYEventStore({
  state: {
    // 用户信息
    userInfo: wx.getStorageSync('userInfo') || {},
    // 配置信息
    configInfo: wx.getStorageSync('configInfo') || {},
    // 当前积分
    integral: 0,
    // 控制交流群展示（用于提审）
    showgroup: false,
    // 控制是否开通vip才能访问题材（html，css免费开放）
    topicVip: false,
    // 控制ios是否可以支付（）
    iosIsPay: false,
    // 是否vip用户
    isVip: null,
    // 是否新用户
    isNewUser: false,
    // 是否ios设备
    isIos: null,
    // 是否已签到
    isSign: false
  },
  actions: {
    async getConfig(ctx: any) {
      await getConfig().then((res: any) => {
        ctx.showgroup = res.data.jlq_open.toString() === '1'
        // ctx.topicVip = res.data.vip_open.toString() === '1'
        // ctx.iosIsPay = res.ios_open.toString() === '1'
        ctx.configInfo = res.data
        wx.setStorageSync('configInfo', res.data)
      })
    },
    async getUserInfo(ctx: any) {
      if (wx.getStorageSync('loginState')) {
        await getUserInfo().then((res: any) => {
          console.log(res, '用户信息')
          ctx.isVip = res.data.vip_time !== ''
          ctx.isSign = Boolean(res.data.is_sign)
          ctx.integral = res.data.jifen
          ctx.userInfo = res.data
          wx.setStorageSync('userInfo', res.data)
          // 判断是否新用户
          const create_time = handleTime(res.data.create_time)
          let date = new Date()
          const yyyy = date.getFullYear()
          const mm = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
          const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
          let yearMonthDay = yyyy + '-' + mm + '-' + dd
          const isNewUser = create_time.toString() === yearMonthDay.toString()
          ctx.isNewUser = isNewUser
        })
      } else {
        console.log('未登录')
      }
    },
    setIsIos(ctx: any, isIos: any) {
      ctx.isIos = isIos
    },
    setJifenReduce(ctx: any) {
      ctx.integral--
    },
    login(ctx: any, callback: any) {
      console.log(ctx)
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          const user = res
          wx.login({
            success: (res) => {
              const code = res.code
              wx.showLoading({
                title: '登录中...'
              })
              login(Object.assign({
                code: code,
                isIos: ctx.isIos ? 1 : 0
              }, user)).then((res: any) => {
                if (res.data.token) {
                  wx.setStorageSync('token', res.data.token)
                  wx.setStorageSync('loginState', true)
                  wx.showToast({
                    title: '登录成功',
                    duration: 2000
                  })
                  if (callback) {
                    console.log('我的页面会进来')
                    callback && callback()
                  } else {
                    eventStore.dispatch('getUserInfo')
                  }
                } else {
                  wx.showToast({
                    title: '登录异常，请联系客服处理',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }).catch(() => {
                wx.showToast({
                  title: '登录失败，请重试',
                  icon: 'none',
                  duration: 2000
                })
              })
            }
          })
        }
      })
    }
  }
})

export {
  eventStore
}