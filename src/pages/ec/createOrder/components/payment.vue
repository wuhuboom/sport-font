<template>
  <view class="payment">
    <view class="top">
      <view style="line-height: 40px">请向卖家付款</view>
      <view
        style="
          font-size: 12px;
          display: flex;
          height: 30px;
          align-items: center;
        "
        ><p>付款剩余时间:</p>
        <view
          ><uni-countdown
            color="red"
            splitorColor="red"
            :font-size="12"
            :show-day="false"
            :second="orderDetail.timeoutBuyer"
          ></uni-countdown
        ></view>
      </view>
      <view class="amount">
        <p>{{ orderDetail.money / amountRate }}</p>
        <uni-icons
          style="margin-left: 10px"
          custom-prefix="iconfont"
          color="rgb(159, 159, 159)"
          type="icon-fuzhi"
          size="20"
        ></uni-icons>
      </view>
      <view class="chat">
        <uni-icons type="chat" size="23"></uni-icons>
        <p>联系卖家</p>
      </view>
    </view>
    <view class="mid">
      <view class="mid-flex">
        <p>订单编号</p>
        <view class="mid-i">
          <view>{{ orderDetail.orderNo }}</view>
          <uni-icons
            @click="copyCode(orderDetail.orderNo)"
            style="margin-left: 10px"
            custom-prefix="iconfont"
            color="rgb(159, 159, 159)"
            type="icon-fuzhi"
            size="20"
          ></uni-icons>
        </view>
      </view>
      <view class="mid-flex">
        <p>支付方式</p>
        <view class="mid-i">
          <view>{{ orderDetail.payName }}</view>
          <uni-icons
            @click="copyCode(orderDetail.payName)"
            style="margin-left: 10px"
            custom-prefix="iconfont"
            color="rgb(159, 159, 159)"
            type="icon-fuzhi"
            size="20"
          ></uni-icons>
        </view>
      </view>
      <view class="mid-flex">
        <p>姓名</p>
        <view class="mid-i">
          <view>{{ orderDetail.merName }}</view>
          <uni-icons
            @click="copyCode(orderDetail.merName)"
            style="margin-left: 10px"
            custom-prefix="iconfont"
            color="rgb(159, 159, 159)"
            type="icon-fuzhi"
            size="20"
          ></uni-icons>
        </view>
      </view>
      <view class="mid-flex">
        <p>Bank Account Number</p>
        <view class="mid-i">
          <view>{{ orderDetail.payType.accountNo }}</view>
          <uni-icons
            @click="copyCode(orderDetail.payType.accountNo)"
            style="margin-left: 10px"
            custom-prefix="iconfont"
            color="rgb(159, 159, 159)"
            type="icon-fuzhi"
            size="20"
          ></uni-icons>
        </view>
      </view>
      <view class="mid-flex">
        <p>银行名称</p>
        <view class="mid-i">
          <view>{{ orderDetail.payType.bankName }}</view>
          <uni-icons
            @click="copyCode(orderDetail.payType.bankName)"
            style="margin-left: 10px"
            custom-prefix="iconfont"
            color="rgb(159, 159, 159)"
            type="icon-fuzhi"
            size="20"
          ></uni-icons>
        </view>
      </view>
    </view>
    <view class="btns">
      <view class="btn" @click="goCancelOrder(orderDetail.id)">取消订单</view>
      <view class="btn2" @click="payed(orderDetail.id)"
        >我已付款，通知卖家</view
      >
    </view>
    <uni-popup ref="popup" background-color="transparent">
      <collection></collection>
    </uni-popup>
  </view>
</template>

<script>
import collection from "./cancelOrder.vue";
export default {
  components: { collection },
  props: ["orderDetail"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    payed(id) {
      this.$api.fbBuyPayed({ id: id }).then((res) => {
        this.$emit("initOrder");
      });
    },
    goCancelOrder(id) {
      this.$refs.popup.open("center");
    },
    copyCode(datas) {
      const that = this;
      uni.setClipboardData({
        data: String(datas),
        success: function () {
          uni.showToast({ title: that.$t("history.withdraw.copeMsg") });
        },
      });
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
.payment {
  .top {
    width: 90%;
    margin: auto;
    height: 180px;
    background-color: rgb(26, 26, 26);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .amount {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
    .chat {
      display: flex;
      width: 30%;
      background-color: rgb(232, 118, 62);
      align-items: center;
      justify-content: center;
      border-radius: 20px;

      height: 30px;
      font-size: 14px;
    }
  }
  .mid {
    height: 232px;
    width: 90%;
    display: flex;
    margin: 15px auto;
    background-color: rgb(26, 26, 26);
    border-radius: 8px;
    font-size: 12px;
    flex-direction: column;
    justify-content: space-around;

    .mid-flex {
      width: 90%;
      margin: auto;
      justify-content: space-between;
      display: flex;
      align-items: center;
    }
    .mid-i {
      display: flex;
    }
  }
  .btns {
    display: flex;
    width: 90%;
    margin: 30px auto;
    justify-content: space-between;
    .btn {
      width: 42%;
      color: rgb(232, 118, 62);
      height: 48px;
      border: 1px rgb(232, 118, 62) solid;
      line-height: 48px;
      text-align: center;
      border-radius: 30px;
    }
    .btn2 {
      width: 52%;
      color: #fff;
      height: 48px;
      background-color: rgb(232, 118, 62);
      line-height: 48px;
      text-align: center;
      border-radius: 30px;
    }
  }
}
</style>
