
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
  getVipLevel: (params) => request('vehicle/index/vip', 'POST', params),
  getUserInfo: (params) => request('vehicle/User/index', 'POST', params),
  orderPay: (params) => request('vehicle/User/order', 'POST', params),
  getAdImage: (params) => request('vehicle/index/get_ad_list', 'POST', params),
  reward: (params) => request('vehicle/user/reward', 'POST', params),
  rewardLog: (params) => request('vehicle/index/get_reward_log', 'POST', params),
  qiandao: (params) => request('vehicle/user/qiandao', 'POST', params),
  readVideo: (params) => request('vehicle/user/read_video', 'POST', params),
  getSearchs: (params) => request('vehicle/user/get_search_list', 'POST', params),
  clearSearch: (params) => request('vehicle/user/clear_search', 'POST', params),
  deductIntegral: (params) => request('vehicle/user/use_jifen', 'POST', params),
  setProblemBug: (params) => request('vehicle/user/set_problem_err', 'POST', params),
  duihuanma: (params) => request('vehicle/user/duihuanma', 'POST', params),
  getConfig: (params) => request('vehicle/index/get_info', 'POST', params),
  getTuiList: (params) => request('vehicle/user/tui_list', 'POST', params),
  getTuiUser: (params) => request('vehicle/user/tui_user', 'POST', params),
  getCashList: (params) => request('vehicle/user/cash_list', 'POST', params),
  withdraw: (params) => request('vehicle/user/cash', 'POST', params),
  getContList: (params) => request('vehicle/index/get_content_list', 'POST', params),
  getContDetail: (params) => request('vehicle/index/get_content_detail', 'POST', params),
}