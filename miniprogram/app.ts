// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})

/**
 * "tabBar": {
    "color": "#999",
    "selectedColor": "#ff3d3d",
    "backgroundColor": "#fff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/home/home",
        "text": "首页",
        "iconPath": "images/icon_home.png",
        "selectedIconPath": "images/icon_home_active.png"
      },
      {
        "pagePath": "pages/study/study",
        "text": "学习",
        "iconPath": "images/icon_study.png",
        "selectedIconPath": "images/icon_study_active.png"
      },
      {
        "pagePath": "pages/vip/vip",
        "text": "增值",
        "iconPath": "images/icon_vip.png",
        "selectedIconPath": "images/icon_vip_active.png"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的",
        "iconPath": "images/icon_my.png",
        "selectedIconPath": "images/icon_my_active.png"
      }
    ]
  }
 */