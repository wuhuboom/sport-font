<template>
  <view class="tab-bar">
    <view class="bar-view" @click="toggleBar(0)">
      <view
        :class="ecTableBarActive == 0 ? 'bar-image-buy-a' : 'bar-image-buy'"
      ></view>
      <view :class="ecTableBarActive == 0 ? 'bar-tx-a' : 'bar-tx'">C2C</view>
    </view>
    <view class="bar-view" @click="toggleBar(1)">
      <view
        :class="ecTableBarActive == 1 ? 'bar-image-order-a' : 'bar-image-order'"
      ></view>
      <view :class="ecTableBarActive == 1 ? 'bar-tx-a' : 'bar-tx'">订单</view>
    </view>
    <view class="bar-view" @click="toggleBar(2)">
      <view
        :class="ecTableBarActive == 2 ? 'bar-image-my-a' : 'bar-image-my'"
      ></view>
      <view :class="ecTableBarActive == 2 ? 'bar-tx-a' : 'bar-tx'">我的</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "cetabbar",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    toggleBar(index) {
      if (index == this.active) {
        return;
      }
      this.$updateStore("ecTableBarActive", index);
      if (index == 0) {
        this.$Router.push("/cebuy");
      } else if (index == 1) {
        this.$Router.push("/ceorder");
      } else {
        this.$Router.push("/ecmy");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tab-bar {
  position: fixed;
  background-color: rgb(43, 43, 43);
  //background-color: rgb(232, 118, 62);
  width: 90%;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 30px;
  height: 70px;
  border-radius: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .bar-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    .bar-image-buy {
      display: inline-block;
      width: 25px;
      height: 25px;
      background-image: url("/static/images/ce/tabbar/buy.png");
      background-size: 100% 100%;
    }
    .bar-image-buy-a {
      display: inline-block;
      width: 25px;
      height: 25px;
      background-color: rgb(232, 118, 62);
      -webkit-mask: url("/static/images/ce/tabbar/buy.png") no-repeat;
      mask: url("/static/images/ce/tabbar/buy.png") no-repeat;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }
    .bar-image-order {
      display: inline-block;
      width: 25px;
      height: 25px;
      background-image: url("/static/images/ce/tabbar/order.png");
      background-size: 100% 100%;
    }
    .bar-image-order-a {
      display: inline-block;
      width: 25px;
      height: 25px;
      background-color: rgb(232, 118, 62);
      -webkit-mask: url("/static/images/ce/tabbar/order.png") no-repeat;
      mask: url("/static/images/ce/tabbar/order.png") no-repeat;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }
    .bar-image-my {
      display: inline-block;
      width: 25px;
      height: 25px;
      background-image: url("/static/images/ce/tabbar/my.png");
      background-size: 100% 100%;
    }
    .bar-image-my-a {
      display: inline-block;
      width: 25px;
      height: 25px;
      background-color: rgb(232, 118, 62);
      -webkit-mask: url("/static/images/ce/tabbar/my.png") no-repeat;
      mask: url("/static/images/ce/tabbar/my.png") no-repeat;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }
    .bar-tx {
      font-size: 10px;
    }
    .bar-tx-a {
      font-size: 10px;
      color: rgb(232, 118, 62);
    }
  }
}
</style>
