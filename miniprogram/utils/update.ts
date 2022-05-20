/**
 * 检测当前的小程序
 * 是否是最新版本，是否需要下载、更新
 */
export function checkUpdateVersion() {
  //判断微信版本是否 兼容小程序更新机制API的使用
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager();
    //检测版本更新
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启小程序？',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          wx.showModal({
            title: '已有新版本',
            content: '请你删除小程序，重新搜索进入',
            showCancel: false,
            confirmText: '我知道了'
          })
        })
      }
    })
  } else {
    wx.showModal({
      title: '溫馨提示',
      content: '当前小程序版本较低，需重启小程序以使用最新功能',
      showCancel: false,
      confirmText: '我知道了'
    })
  }
}
