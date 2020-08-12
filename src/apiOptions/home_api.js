import Vue from 'vue'
import {apiRequestList} from "@/plugins/axios"
const discover = '/base/capp/appStart/banner/list';

export const getDetail = (url,params,flag)=>{
    return apiRequestList.$post(url,params,flag)
};
export const getHomeList = (url,params)=>{
    return apiRequestList.$post(url,params)
};
//首页banner
export const getHomeBanner = (url,params)=>{
    return apiRequestList.$post(url,params)
};
//首页列表数据
export const getHomeListData = (url,params)=>{
    return apiRequestList.$post(url,params)
};

export const getCity = (url,params)=>{
    return apiRequestList.$post(url,params)
};
//获取位置信息
export const getCityData = (url,params)=>{
    return apiRequestList.$get(url)
};
 
 
