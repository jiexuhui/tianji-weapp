// const ApiRootUrl = 'https://top.v-islands.com/api/';
const ApiRootUrl = 'http://127.0.0.1:3010/api/';

module.exports = {
  IndexUrl: ApiRootUrl + 'index/index', //首页数据接口

  AuthLoginByWeixin: ApiRootUrl + 'loginByWeixin', //微信登录
  GetActivityInfo: ApiRootUrl + 'getActivityInfo', //获取活动信息
  SelectTeam: ApiRootUrl + 'selectTeam', //选择队伍

  MatchList: ApiRootUrl + 'matchlist', //赛事列表
  GetMatchArticle: ApiRootUrl + 'getMatchArticle', //赛事相关文章
};