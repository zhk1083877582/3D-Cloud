export default {
    method: 'post',
    // 基础url前缀
    baseURL: '',
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 10000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: 'json',
    baseURL: {
        target: 'http://172.16.9.58:9501', // 开发版接口
        // target: 'https://tcwgwdev.tospur.com',  // 开发版本接口
        // target: 'https://tcwgwtest.tospur.com', // 测试版接口
        //  target: 'https://tcwgwstag.tospur.com', // 预发布接口
        // target: 'https://tcstag.tospur.com',
        //  target: 'https://tcwgwprod.tospurhf.com', // 正式环境接口
    }
}