<template>
  <view class="content hall">
    <nav-aside></nav-aside>
    <view class="top-nav"></view>
    <view class="hall-main">
      <view class="hall-title">
        <text class="title-text">{{$t("hall.title")}}</text>
        <uni-icons type="close" size="40" @click="$Router.back()"></uni-icons>
      </view>
      <no-data></no-data>
    </view>
  </view>
</template>
<script>
export default {
  name:"hall",
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
.hall {
.top-nav {
height: 50px;
}
.hall-main {
    padding: 14px;
    .hall-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      .title-text {
        font-size: 15px;
        font-weight: 700;
      }
      .uni-icons {
        color: var(--close-color) !important;
      }
    }
  }
}
</style>
