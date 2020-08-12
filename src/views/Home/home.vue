<!-- 首页 -->
<template>
  <div class='home_warp'>
    <div class="cloud_warp">
      <tag-cloud :data="hotTag" @clickTag="clickTagItem"></tag-cloud>
    </div>
    
  </div>
</template>

<script>
import tagCloud from "@/components/cloud/tagCloud"
export default {
components: {
  tagCloud
},
data() {
return {
  hotTag:[{"id":"1","name":"镇远县"},{"id":"2","name":"剑河县"},{"id":"3","name":"台江县"},{"id":"4","name":"岑巩县"},{"id":"5","name":"黎平"},{"id":"6","name":"丹寨县"},{"id":"7","name":"凯里市"},{"id":"8","name":"榕江县"},{"id":"9","name":"黄平县"},{"id":"10","name":"雷山县"},
    {"id":"11","name":"镇远县"},{"id":"12","name":"剑河县"},{"id":"13","name":"台江县"},{"id":"14","name":"岑巩县"},{"id":"15","name":"黎平"},{"id":"16","name":"丹寨县"},{"id":"17","name":"凯里市"},{"id":"18","name":"榕江县"},{"id":"19","name":"黄平县"},{"id":"20","name":"雷山县"},
    {"id":"11","name":"镇远县"},{"id":"12","name":"剑河县"},{"id":"13","name":"台江县"},{"id":"14","name":"岑巩县"},{"id":"15","name":"黎平"},{"id":"16","name":"丹寨县"},{"id":"17","name":"凯里市"},{"id":"18","name":"榕江县"},{"id":"19","name":"黄平县"},{"id":"20","name":"雷山县"},
    {"id":"11","name":"镇远县"},{"id":"12","name":"剑河县"},{"id":"13","name":"台江县"},{"id":"14","name":"岑巩县"},{"id":"15","name":"黎平"},{"id":"16","name":"丹寨县"},{"id":"17","name":"凯里市"},{"id":"18","name":"榕江县"},{"id":"19","name":"黄平县"},{"id":"20","name":"雷山县"},
    {"id":"11","name":"镇远县"},{"id":"12","name":"剑河县"},{"id":"13","name":"台江县"},{"id":"14","name":"岑巩县"},{"id":"15","name":"黎平"},{"id":"16","name":"丹寨县"},{"id":"17","name":"凯里市"},{"id":"18","name":"榕江县"},{"id":"19","name":"黄平县"},{"id":"20","name":"雷山县"},
    ]
};
},
computed: {},
watch: {},
methods: {
  clickTagItem (tag) {
    // TODO
    console.log(tag,11)
  }
},
created() {

},
mounted() {

},
beforeCreate() {}, 
beforeMount() {}, 
beforeUpdate() {}, 
updated() {}, 
beforeDestroy() {}, 
destroyed() {},
activated() {}, 
}
</script>
<style lang='scss' scoped>
// .home_warp{
//   position: relative;
//   .cloud_warp{
//     position: absolute;
//     top: 20px;
//     height: 100%;
//     width: 100%;
//   }
// }

</style>