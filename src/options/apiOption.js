//var getRecordTime = null;
//import tool from "../plugins/tool.js"

const API_OPTION = {
  detail:'/building/buildingHouseType/detail'
};

var keyObj = {};
var UrlObj = {};
for (let key in API_OPTION) {
  let url = typeof API_OPTION[key] === "object" ? API_OPTION[key].url : API_OPTION[key];
  keyObj[key] = url;
  UrlObj[url] = key;
}

export const getApiName = function (url) {
  return UrlObj[url];
};

export const apiOption = API_OPTION;
export const api = keyObj;