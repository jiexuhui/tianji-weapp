const util = require('../utils/util.js');
const api = require('../config/api.js');

function getActivityInfo(params) {
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.GetActivityInfo, params, 'POST').then(res => {
      if (res.code === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

function selectTeam(params) {
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.SelectTeam, params, 'POST').then(res => {
      if (res.code === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

function matchList(params) {
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.MatchList, params, 'POST').then(res => {
      if (res.code === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

function getMatchArticles(params) {
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.GetMatchArticle, params, 'POST').then(res => {
      if (res.code === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports = {
  getActivityInfo,
  selectTeam,
  matchList,
  getMatchArticles
};
