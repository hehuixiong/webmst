const baseUrl = 'https://webmst.ithhx.cn/'
module.exports = {
  request : function(url, method = 'GET', data = {}){
    let fullUrl = `${baseUrl}${url}`
    let token = wx.getStorageSync('token') ? wx.getStorageSync('token')  : ''
    return new Promise((resolve,reject)=>{
      wx.request({
        url: fullUrl,
        method,
        data,
        header: {
          'content-type': 'application/json',
          'token': token
        },
        success(res){
          if (res.data.code == 200) {
            resolve(res.data)
          } else if (res.data.code === 402) {
            // token失效，重新去登录
            wx.showToast({
              title: '信息失效，请重新登录',
              icon:'none'
            })
            clearTimeout(timer)
            const timer = setTimeout(() => {
              wx.navigateTo({
                url: '/pages/login/login'
              })
            }, 500)
          } else {
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
            reject(res.data.message)
          }
        },
        fail(){
          wx.showToast({
            title: '接口请求错误',
            icon:'none'
          })
          reject('接口请求错误')
        }
      })
    })
  }
}