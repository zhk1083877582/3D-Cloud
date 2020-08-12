/**
* 解析url参数
* @example?id=123232&a=b
* @return Object {id:12323, a:b}
**/
export function urlParse () {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=123232', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}
/** 抖动消除函数封装 截流执行, 例子：
*   绑定监听query，截流执行，延迟200ms派发事件
*   this.$watch('query', debounce((newQuery) => {
*       this.$emit('query', newQuery);
*   }, 200));
**/
export function debounce (func, delay) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
// 实现深拷贝
export function deepCopy (target) {
  if (typeof target !== 'object' || target == null) { return }
  let newObj = target instanceof Array ? [] : {}
  for (let item in target) {
    if (target.hasOwnProperty(item)) {
      newObj[item] = typeof target[item] === 'object' ? deepCopy(target[item]) : target[item]
    }
  }
  return newObj
}
// 动态设置浏览器 title
export const setTitle = function(title) {
  title = title ? `${title}` : '同策网'
  window.document.title = title
}
