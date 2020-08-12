
// ******** getters.js是对数据的一层映射
// ******** 他可以是一个函数，函数类似于一个计算属性
// ******** 根据state的不同值计算出一个新的值

// 通过getters做代理，把数据export出去

export const loanDataV = state => state.loanDataV;
export const areaCode = state => state.area;
export const cityCode = state => state.city;


