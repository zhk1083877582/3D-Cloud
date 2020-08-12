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
      hotTag:[{"id":"1","name":"镇远县"},{"id":"2","name":"剑河县"},{"id":"3","name":"台江县"},{"id":"4","name":"岑巩县"},{"id":"5","name":"黎平"},{"id":"6","name":"丹寨县"},{"id":"7","name":"凯里市"},{"id":"8","name":"榕江县"},{"id":"9","name":"黄平县"},{"id":"10","name":"雷山县"},
      {"id":"11","name":"镇远县"},{"id":"12","name":"剑河县"},{"id":"13","name":"台江县"},{"id":"14","name":"岑巩县"},{"id":"15","name":"黎平"},{"id":"16","name":"丹寨县"},{"id":"17","name":"凯里市"},{"id":"18","name":"榕江县"},{"id":"19","name":"黄平县"},{"id":"20","name":"雷山县"},
      {"id":"11","name":"镇远县"},{"id":"12","name":"剑河县"},{"id":"13","name":"台江县"},{"id":"14","name":"岑巩县"},{"id":"15","name":"黎平"},{"id":"16","name":"丹寨县"},{"id":"17","name":"凯里市"},{"id":"18","name":"榕江县"},{"id":"19","name":"黄平县"},{"id":"20","name":"雷山县"},
      {"id":"11","name":"镇远县"},{"id":"12","name":"剑河县"},{"id":"13","name":"台江县"},{"id":"14","name":"岑巩县"},{"id":"15","name":"黎平"},{"id":"16","name":"丹寨县"},{"id":"17","name":"凯里市"},{"id":"18","name":"榕江县"},{"id":"19","name":"黄平县"},{"id":"20","name":"雷山县"},
      {"id":"11","name":"镇远县"},{"id":"12","name":"剑河县"},{"id":"13","name":"台江县"},{"id":"14","name":"岑巩县"},{"id":"15","name":"黎平"},{"id":"16","name":"丹寨县"},{"id":"17","name":"凯里市"},{"id":"18","name":"榕江县"},{"id":"19","name":"黄平县"},{"id":"20","name":"雷山县"},
      ]
    }
  },
  methods: {
    clickTagItem (tag) {
      // TODO
    }
  }
}
```
