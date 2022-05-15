
const { request } = require('../http/request.js')
module.exports = {
  // 获取面试题
  getTopicList: (params) => request('vehicle/index/get_activity_list', 'POST', params),
  getTopicCate: (params) => request('vehicle/index/get_activity_cate', 'POST', params),
  getTopicInfo: (params) => request('vehicle/index/get_activity_info', 'POST', params),
  getCollectInfo: (params) => request('vehicle/user/get_activity_info', 'POST', params),
  login: (params) => request('vehicle/login/wx_login', 'POST', params),
  addCollect: (params) => request('vehicle/User/add_collect', 'POST', params),
  getCollectList: (params) => request('vehicle/User/get_collect_list', 'POST', params),
  getVipLevel: (params) => request('/vehicle/index/vip', 'POST', params),
  getUserInfo: (params) => request('vehicle/User/index', 'POST', params),
  orderPay: (params) => request('vehicle/User/order', 'POST', params)
}