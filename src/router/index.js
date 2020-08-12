import Vue from 'vue'
import axios from 'axios'
import {api, apiOption, getApiName} from '@/options/apiOption.js';
import tool, {WB} from './tool.js';
//import msg from '@/components/Wb_Msg'


var _axios = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API,
  timeout: 33000,
  headers: {'Content-Type': 'application/json;charset=UTF-8'},
});

_axios.interceptors.request.use(config => {
  if (config.urlParams) {
    var path = config.url,
      data = config.urlParams,
      reg = /\{{1}(\w+)\}{1}/g;
    config.url = path.replace(reg, (str, $1) => data[$1]);
  }
  return config;
}, err => {
    console.log('网络异常！请稍后再试');
  return Promise.reject({error: err, message: '网络异常！请稍后再试'});
})
_axios.interceptors.response.use(data => {
  return data;
}, err => {
  //console.log(tool.extend({}, err), WB.vm.$route);
  var error = {error: err};
  if (!err.response) {
    error.message = '网络异常！请稍后再试';
  } else if (err.response.status == 401 && WB.vm.$route.name != "Login") {
    error.message = '登录已过期！请重新登录！';
    //error.message = '无权限访问！请重试或联系在线客服';
    //console.log(WB.vm.$router);
    WB.vm.$router.replace({path: "/Login"});
  } else if (err.response.status == 500 && err.config.url != "/api/financing/wx/jsSDKSignInfo") {
    WB.vm.$router.replace({path: `/500?from=${WB.vm.$route.fullPath}`});
    return Promise.reject({error: err, message: '服务器内部错误！', router: {path: "/500"}});
  } else if (err.response.status == 504 || err.response.status == 404) {
    error.message = '服务器异常！请重试或联系在线客服';
  } else {
    error.message = '未知错误！';
  }
  console.log(error.message);
  return Promise.reject(error);
})


const APIS = api;
const API_OPTION = apiOption;
const AJAX_AFTER = function (fn) {
  let self = this;
  const CACHE_DATA = {};

  function Cache(ret, key, option, exports) {
    this.ret = ret;
    this.key = key;
    this.l = "pending";
    this.promise = Promise.resolve();
    this.option = option;
    this.name = getApiName(option.url);
    this.isCache = API_OPTION[this.name] ? API_OPTION[this.name].isCache || false : false;
    this.exports = exports || {};
    this.createTime = new Date().getTime();
    this.reviseTime = this.createTime;
  }

  /*  deleteCache(key)  删除key值对应val */
  /*  deleteCache(name) 删除所有的name的val */

  /*  deleteCache("all")  删除所有 */
  function deleteCache(n) {
    let tag = this,
      isDelAll = n === "all",
      hasKey = n && CACHE_DATA[n];
    if (isDelAll || !hasKey || !n) {//删除所有
      tool.each(CACHE_DATA, function (item, i) {
        // console.log(item === tag, tag, item);
        if (isDelAll || (n && item.name === n) || (!n && item === tag)) delete CACHE_DATA[i]
      })
    } else if (hasKey) {
      delete CACHE_DATA[n];
    }
    return this;
  }

  Cache.prototype.c = CACHE_DATA;
  Cache.prototype.delete = function () {
    return deleteCache.apply(this, arguments);
  };
  /*  overload(true,name1,name2)  找到所有的name 重载 */
  /*  overload(name1,name2)  找到修改时间最近的name 重载 */
  Cache.prototype.overload = function () {
    let tag = arguments[0],
      deep = false,
      i = 0;
    if (typeof tag === "boolean") {
      deep = tag;
      i++;
    }
    for (; i < arguments.length; i++) {
      if ((tag = arguments[i]) != undefined) {
        if (CACHE_DATA[tag]) {
          AJAX(CACHE_DATA[tag].option, true);
        } else {
          let sort = [];
          tool.each(CACHE_DATA, function (item, i) {
            if (item.name === tag) {
              if (deep) AJAX(item.option, true); else sort.push(item);
            }
          });
          if (!deep && sort.length > 0) {
            sort.sort((a, b) => (a.reviseTime - b.reviseTime));
            AJAX(sort[0].option, true);
          }
        }
      }
    }
  };

  return function requireCache(option, isUpdate) {
    //对参数的url进行处理
    let key = option.url
      + (option.params ? JSON.stringify(option.params) : '')
      + (option.data ? JSON.stringify(option.data) : "")
      + (option.urlParams ? JSON.stringify(option.urlParams) : "");
    //isUpdate 为false 或者 不传去缓存的值
    if (CACHE_DATA[key] && CACHE_DATA[key].isCache && (isUpdate ? CACHE_DATA[key].l === "pending" : CACHE_DATA[key].l === "resolve")) {
      CACHE_DATA[key].reviseTime = new Date().getTime();
      //console.log("缓存接口。。",key,"createTime:"+CACHE_DATA[key].createTime,"reviseTime:"+CACHE_DATA[key].reviseTime);
      CACHE_DATA[key].promise.finally(function () {
        fn.cached && fn.cached.call(CACHE_DATA[key].exports, CACHE_DATA[key], CACHE_DATA[key].exports, requireCache);
      });
      return CACHE_DATA[key].promise;
    }

    let ret = self.call(this, option),
      cache = CACHE_DATA[key] = new Cache(ret, key, option, CACHE_DATA[key] && CACHE_DATA[key].exports);
      //console.log(ret)
    //console.log("接口请求中。。",key,"createTime:"+cache.createTime,"reviseTime:"+cache.reviseTime);
    cache.promise = new Promise(function (resolve, reject) {
      ret.then(function (res) {
        //console.log(res)
        cache.response = res;
        cache.l = res.request.status === 200 ? "resolve" : "reject";
        res.cache = cache.exports;
        //console.log(res,cache)
        fn.beforeResolve && fn.beforeResolve.call(cache.exports, cache, cache.exports, requireCache);
        resolve(res);
      })
        .catch(function (res) {
          res.cache = cache.exports;
          cache.l = "reject";
          reject(res);
        })
        .finally(function () {
          if(cache.l==="resolve")fn.resolved && fn.resolved.call(cache.exports, cache, cache.exports, requireCache);

          fn.finally && fn.finally.call(cache.exports, cache, cache.exports, requireCache); //"resolve"
          !cache.isCache && cache.delete();
        })
    });
    cache.promise.custom = function (fun,obj) {
      cache.exports.custom = fun;
      if(obj&&tool.isObject(obj)){
        tool.extend(cache.exports,obj)
      }
      return this;
    };
    return cache.promise;
  };
};
const LOCALHOST = "";
const AJAX = AJAX_AFTER.call(_axios,(function(ary){
    return tool.extend({},...tool.each(ary,function(name,i){
      ary[i] = {[name]:function(cache, exports, requireCache){
          let AO = API_OPTION[cache.name];
          if (AO && AO[name] && tool.isFun(AO[name])) {
            AO[name].call(exports, cache, exports, requireCache);
          }
        }}
    }))
  })(["finally","beforeResolve","resolved","cached",]));

  //console.log(AJAX)
// const AJAX = _axios.after(function (cache, exports, requireCache) {
//   if (cache.l === "resolve") {
//     // console.log(cache)
//     let AO = API_OPTION[cache.name];
//     //console.log(AO)
//     if(exports.custom){
//       cache.exports.custom();
//     }
//     if (AO && AO.custom && tool.isFun(AO.custom)) {
//       AO.custom.call(exports, cache, exports, requireCache);
//     } else if (!AO || (AO && !AO.isCache)) {
//       cache.delete(cache.key);
//     }
//   }
// });


Vue.use({
  install(vue, ajax) {
    Vue.prototype.$post = function (requireData, isUpdate) {
      return ajax(tool.extend({
        method: 'post',
      }, requireData), isUpdate ? true : false)
    };
    Vue.prototype.$get = function (requireData, isUpdate) {
      return ajax(tool.extend({}, requireData, {
        method: 'get',
        params: requireData.data,
        data: null
      }), isUpdate ? true : false)
    };
    Vue.prototype.$ajax = function (requireData, isUpdate) {
      return ajax(requireData, isUpdate ? true : false)
    };
    Vue.prototype.$upload = function (requireData) {
      return _axios(tool.extend({
        cancelToken: new axios.CancelToken(requireData.unloadCancelBack)
      }, requireData))
    };

  }
}, AJAX);