
const { request } = require('../http/request.js')
module.exports = {
  // 获取面试题
  getTopicList: (params) => request('vehicle/index/get_activity_list', 'POST', params),
  getTopicCate: (params) => request('vehicle/index/get_activity_cate', 'POST', params),
  getTopicInfo: (params) => request('vehicle/index/get_activity_info', 'POST', params)
}