
/*
*格式化日期字符串
*接受一个时间戳
*根据给定的格式，格式出一个字符串
*可以直接在filters中使用，例如：
*  filters: {
*    formatDate(time) {
*       let date = new Date(time);
*       return formatDate(date, 'yyyy-MM-dd hh:mm');
*    }
*  }
*/
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
// 前置补零
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
export function formatDate1(date, fmt) {
    return formatDate(new Date(date - 0), fmt)
    // Date.prototype.Format = function (fmt) {
    //     var o = {
    //             "M+": this.getMonth() + 1, // 月份
    //             "d+": this.getDate(), // 日
    //             "h+": this.getHours(), // 小时
    //             "m+": this.getMinutes(), // 分
    //             "s+": this.getSeconds(), // 秒
    //             "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    //             "S": this.getMilliseconds() // 毫秒
    //     };
    //     if (/(y+)/.test(fmt))
    //         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
    //     for (var k in o)
    //         if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    //     return fmt;
    // }
   // new Date(1542274800000).Format('yy-MM-dd hh:mm:ss'); //"2018-11-15 17:40:00"
}
