# tagCloud

#### 项目介绍
Vue标签云UI组件

### 结果样式
![示例](http://oztg5bt5t.bkt.clouddn.com//blog/images/tagCloud%E7%A4%BA%E4%BE%8B.gif)
#### 安装教程

1. ```npm install v-tag-cloud -S```
2. 在main.js中
```js
import tagCloud from 'v-tag-cloud'
Vue.use(tagCloud)
```

#### 使用说明

**props**
1. data

Object数组。name属性是显示的标签名，其他自行扩展。

2. config

Object对象，配置项。有下面几个参数：


|参数|默认值|说明|
|- | :-: | -:|
|radius|120|滚动半径，Number，单位px|
|maxFont|24|最大字体大小|
|color|null|字体颜色。为null时随机|
|rotateAngleXbase|600|X方向旋转速度基数，数越小速度越快|
|rotateAngleYbase|600|Y方向旋转速度基数，数越小速度越快|
|hover|true|是否开启悬浮联动|

**方法**

|方法名|参数|说明|
|- | :-: | -:|
|clickTag|tag|点击标签的方法。返回整个标签|

**调用用例**

```html
<!-- template -->
<tag-cloud :data="hotTag" @clickTag="clickTagItem"></tag-cloud>
```

```js
// Vue实例
export default {
  data () {
    return {
      hotTag: [{"id":"05023f8da31c4b4187cc6899e2a3aec2","name":"镇远县"},{"id":"0ef028e5278f4f5ca31f99f1bd22b1cc","name":"剑河县"},{"id":"1a32ef04d3c548eaa6777abb46da32f2","name":"台江县"},{"id":"2c26488325bd493687d16315fe0e5fdd","name":"岑巩县"},{"id":"3a786111828a4b9f89ae9da25753eedd","name":"黎平"},{"id":"4ed593eed91b4244969995237f5c96c5","name":"丹寨县"},{"id":"615d2c178f1a47cb8d473823e74f5386","name":"凯里市"},{"id":"76f652df03db43349272a9aff492b065","name":"榕江县"},{"id":"8ff29d0d35e548feb945063b34ed9c9b","name":"黄平县"},{"id":"a8ac2170008746fdadc05ea461bc5e37","name":"雷山县"}]
    }
  },
  methods: {
    clickTagItem (tag) {
      // TODO
    }
  }
}
```
