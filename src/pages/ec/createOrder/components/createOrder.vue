<template>
  <view class="hasCreate">
    <view style="font-size: 15px; margin-top: 10px">
      订单已经生成，请完成支付
      <view style="font-size: 12px; margin-top: 10px; display: flex"
        >请在
        <uni-countdown
          color="red"
          splitorColor="red"
          :font-size="12"
          :show-day="false"
          :second="orderDetail.timeoutBuyer"
        ></uni-countdown>
        内付款给卖家</view
      >
    </view>
    <view class="sh-info">
      <view class="title">商家信息</view>
      <view class="mid">
        <view>规定支付时长</view>
        <view>30分钟</view>
      </view>
      <view class="bottom">
        <view>商家昵称</view>
        <view class="info">
          <view>{{ orderDetail.merName }}</view>
          <img
            style="margin: 0 5px"
            src="https://new22.pigk.xyz/static/image/user.png"
            height="25"
            width="25"
          />
          <uni-icons type="right" size="15" color="#fff"></uni-icons>
        </view>
      </view>
    </view>
    <view class="mrt">
      <img
        src="/static/images/ce/createOrder/usdt.png"
        height="25"
        width="25"
      />
      <view style="font-size: 14px; margin-left: 10px">买入USDT</view>
    </view>
    <view class="order-info">
      <view class="info">
        <view style="color: rgb(159, 159, 159)">总额</view>
        <view>{{ orderDetail.money / amountRate }}</view>
      </view>
      <view class="info">
        <view style="color: rgb(159, 159, 159)">订单号</view>
        <view>{{ orderDetail.orderNo }}</view>
      </view>
      <view class="info">
        <view style="color: rgb(159, 159, 159)">创建时间</view>
        <view>{{ formatTimes(orderDetail.createdAt) }}</view>
      </view>
    </view>
    <view class="btns">
      <view class="btn-q" @click="goCancelOrder(orderDetail.id)">取消订单</view>
      <view class="btn-c" @click="confirm">去付款</view>
    </view>
    <uni-popup ref="popup" background-color="transparent">
      <collection></collection>
    </uni-popup>
  </view>
</template>

<script>
import { formatTime } from "@/utils";
import collection from "./cancelOrder.vue";
export default {
  components: { collection },
  props: ["orderDetail"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    goCancelOrder(id) {
      this.$refs.popup.open("center");
    },
    formatTimes(times) {
      return formatTime(times);
    },
    confirm() {
      this.$emit("buyType");
    },
  },
  watch: {
    orderDetail: {
      handler(new__, old__) {
        this.orderDetail = new__;
      },
      immediate: true,
      deep: true,
    },
  },

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>
<style scoped lang="scss">
.hasCreate {
  margin: auto;
  width: 90%;
  .sh-info {
    margin-top: 15px;
    height: 136px;
    border-radius: 8px;
    background-color: rgb(26, 26, 26);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 15px;
    .title {
      width: 90%;
      margin: auto;
    }
    .mid {
      width: 90%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .bottom {
      width: 90%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info {
        display: flex;
        align-items: center;
      }
    }
  }
  .mrt {
    margin: 15px 0;
    display: flex;
    align-items: center;
  }
  .order-info {
    height: 165px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: rgb(26, 26, 26);
    .info {
      width: 90%;
      margin: auto;
      display: flex;
      font-size: 12px;
      justify-content: space-between;
    }
  }
  .btns {
    height: 200px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    .btn-q {
      width: 40%;
      height: 48px;
      line-height: 48px;
      color: rgb(232, 118, 62);
      border: 1px rgb(232, 118, 62) solid;
      text-align: center;
      border-radius: 50px;
    }
    .btn-c {
      width: 50%;
      height: 48px;
      line-height: 48px;
      color: #fff;
      background-color: rgb(232, 118, 62);
      text-align: center;
      border-radius: 50px;
    }
  }
}
</style>
