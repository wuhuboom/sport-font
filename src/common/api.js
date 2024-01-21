import request from "@/utils/request";

// 登陆注册
export default {
  // Auth 登录/注册
  getVerifyCode: () =>
    request.get("/auth/verify_code", {}, { noAuth: true, noLoading: true }),
  checkVerifyCode: (data) =>
    request.get("/auth/verify_code_check/", data, { noAuth: true }),
  login: (data) => request.post("/auth/login", data, { noAuth: true }),
  loginNew: (data) => request.post("/auth/login_new", data, { noAuth: true }),
  getRegistConf: () => request.get("/auth/sys_config", {}, { noAuth: true }),
  regist: (data) => request.post("/auth/regist", data, { noAuth: true }),
  logout: () => request.get("/auth/logout"),
  editPwd: (data) => request.post("/auth/editPwd", data),

  // Home 首页

  getAppUrl: () => request.get("/home/app_url", {}, { noAuth: true }),
  appCount: (data) =>
    request.get("/home/app_url_count?id" + data, {}, { noAuth: true }),
  getServTmp: () => request.get("/home/serv_tmp", {}, { noAuth: true }),
  getServ: () => request.get("/home/serv"),
  getHot: () => request.get("/home/hot"),
  getNotice: (data) => request.get("/home/notice", data),
  getReadedNotice: (data) => request.get("/home/notice/read", data),
  getSlider: (data) => request.get("/home/slider", data),
  getSwiper: (data) => request.get("/home/swiper", data),

  // Player Report 个人报表
  aimList: (data) => request.post("/aim/list", data),
  inactiveList: (data) => request.post("/inactive/list", data),
  rechargeLog: (data) => request.post("/recharge_log", data),
  report: (data) => request.post("/report_form", data),
  teamReport: (data) => request.post("/report_form_team", data),
  subPlayer: (data) => request.post("/sub_players", data),
  withdrawalLog: (data) => request.post("/withdrawal_log", data),

  // Game 赛事
  gemeDetail: (data) => request.get("/game", data),
  gameList: (data) => request.post("/game", data),
  gameFinish: (data) => request.post("/game/finished", data),

  // Bet 下注
  bet: (data) => request.post("/bet", data),
  betPre: (data) => request.post("/bet/pre", data),
  //邮件验证
  mailBind: (data) => request.post("/mail/bind", data),
  mailCode: (data) => request.post("/mail/code", data),
  mailChangePwd: (data) => request.post("/mail/change_pwd", data),
  getmailCode: () => request.get("/mail/code"),
  // Bingo 抽奖
  bingo: () => request.get("/home"),

  // Player data 个人数据
  getBalanceChange: (data) => request.post("/balance_change", data),
  getBets: (data) => request.post("/bets", data),
  getBetInfo: (data) => request.get("/betInfo", data),
  getBetsToday: (data) => request.get("/bets/today", data),
  unsetBet: (data) => request.get("/unbet", data),
  getTeamData: (index, data) => request.post("/data_center/" + index, data),
  getSubData: (data) => request.post("/data_center/detail", data),
  getSubDetail: (data) => request.post("/data_center/detail2", data),
  editPayPwd: (data) => request.post("/editPwdPay", data),
  checkPayPwd: () => request.get("/getPwdPay"),
  getInfo: () => request.get("/player_info"),
  // rebateDraw: (data) => request.post('/rebate_draw', data), //未使用
  getRebateList: (data) => request.post("/rebate_list", data),
  getRebateStatis: () => request.get("/rebate_statis"),
  recharge: (data) => request.post("/recharge", data),
  rechargePre: () => request.get("/recharge_pre"),
  setPayPwd: (data) => request.post("/setPwdPay", data),
  withdrawalPre: () => request.get("/withdrawal_pre"),
  withdrawal: (data) => request.post("/withdrawal", data),
  groupUnaim: (data) => request.post("/group/unaim", data),

  // Pay 支付
  getCardInfo: () => request.get("/bank_card_info"),
  getBank: () => request.get("/banks"),
  bindCard: (data) => request.post("/bind_bank_card", data),
  editCard: (data) => request.post("/bind_bank_card_edit", data),
  bindSim: (data) => request.post("/bind_sim_card", data),
  editSim: (data) => request.post("/bind_sim_card_edit", data),
  getSimInfo: () => request.get("/sim_card_info"),
  getVirtualList: () => request.post("/virtual_currency_list"),
  bindVirtual: (data) => request.post("/virtual_currency_add", data),
  editVirtual: (data) => request.post("/virtual_currency_edit", data),
  delVirtual: (data) => request.post("/virtual_currency_del", data),
  wallet: (data) => request.post("/wallet", data),
  walletInfo: () => request.get("/wallet_info"),
  walletUpate: (data) => request.post("/wallet_edit", data),

  // Phone 手机验证
  changePwd: (data) => request.post("/v2/change_pwd_online", data),
  changePayPwd: (data) => request.post("/v2/change_pwd_pay", data),
  bindPhone: (data) => request.post("/v2/phone_bind", data),
  changePwdNoLogin: (data) => request.post("/v2/phone_change_pwd", data),
  changePayPwdwithSms: (data) => request.post("/v2/phone_change_pwd_pay", data),
  getCode: (data) => request.post("/v2/phone_code", data),
  getCodeNoLogin: (data) => request.post("/v2/phone_code/change_pwd", data),
  getCodeOnline: () => request.post("/v2/phone_code/online"),
  getCodeWithName: (data) => request.post("/v2/phone_code/username", data),

  //保险柜
  safeInfo: () => request.get("/safe/info"),
  safeConf: () => request.get("/safe/conf"),
  safeRechargePre: () => request.get("/safe/recharge_pre"),
  safeRecharge: (data) => request.post("/safe/recharge", data),
  safeTransfer: (data) => request.post("/safe/transfer", data),
  safeToBalance: (data) => request.post("/safe/toBalance", data),
  safeChangeLog: (data) => request.post("/safe/changeLog", data),
  safeTransferLog: (data) => request.post("/safe/transferLog", data),
  //抽奖
  playerBingo: (data) => request.post("/bingo", data),
  bingoCount: () => request.get("/bingo/count"),
  bingoRank: () => request.get("/bingo/rank"),
  //商户
  fbConfig: () => request.get("/fb/conf"), //配置
  saler: (data) => request.post("/fb/info/saler", data), //卖家信息

  //商户交易
  saleList: (data) => request.post("/fb/sale_list", data), //商户列表
  fbBuy: (data) => request.post("/fb/buy/", data), //下单
  fbBuyCancel: (data) => request.post("/fb/buy/cancel", data), //取消订单
  fbBuyEnd: (data) => request.post("/fb/buy/end", data), //标记已放款
  fbBuyPayed: (data) => request.post("/fb/buy/payed", data), //已付款
  fbBuy1: (data) => request.post("/fb/buy1", data), //获取支付方式
  fbBuy2: (data) => request.post("/fb/buy2", data), //选择支付方式
  fbResale: (data) => request.post("/fb/resale", data), //上架
  fbSale: (data) => request.post("/fb/sale", data), //新增收款方式
  fbSaleMe: (data) => request.post("/fb/sale/me", data), //我的收款列表
  fbSaleMerOrder: (data) => request.post("/fb/sale/mer/order", data), //商户交易列表
  fbSaleOrderDetail: (data) => request.post("/fb/sale/order/detail", data), //订单详情
  fbSalePlayerOrder: (data) => request.post("/fb/sale/player/order", data), //会员交易列表
  fbSoldout: (data) => request.post("/fb/soldout", data), //下架
  fbWsInfo: (data) => request.post("/fb/ws_info", data), //购买会话ws说明,
};
