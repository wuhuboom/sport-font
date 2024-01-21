<template>
  <view class="no-data">
      <image src="@/static/images/empty.png"></image>
      <text>No data yet</text>
  </view>
</template>
<script>
export default {
  name:"no-data",
  components:{},
  props:{},
  data(){
    return{}
  },
  computed:{},
  methods:{},
  watch:{},
  onLoad(){},
}
</script>
<style scoped lang="scss">
.no-data {
  height: 530px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  uni-image {
    height: 100px;
    width: 150px;
  }
  uni-text {
    color: #999;
    margin-top: 26px;
  }
}
</style>
