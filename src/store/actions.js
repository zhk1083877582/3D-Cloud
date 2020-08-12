
// action.js是对mutation的封装，
// 通过一个action同步调用mutations.js的多个方法
import * as types from './mutation-types';

export const saveLoanDataRtn = function ({commit, state}, obj) {
  commit(types.setLoanDataRtn, obj);
};
// export const saveCityCode = function ({commit, state}, str) {
//   commit(types.setCityCode, str);
// };
export const saveCity = function ({commit, state}, obj) {
  commit(types.setCity, obj);
};
export const saveArea = function ({commit, state}, obj) {
  commit(types.setArea, obj);
};
export const saveUserInfo = function ({commit, state}, obj) {
  commit(types.setUserInfo, obj);
};
export const saveIsShowHead = function ({commit, state}, bl) {
  commit(types.setIsShowHead, bl);
};

export const saveIsLoading = function ({commit, state}, flag) {
  commit(types.setIsLoading, flag);
};
export const saveIsShowDownload  = function ({commit, state}, flag) {
  commit(types.setIsShowDownload, flag);
};
