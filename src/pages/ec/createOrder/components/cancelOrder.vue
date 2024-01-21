<template>
  <view class="cancelOrder">
    <view class="tips">
      <view class="tips-title">
        <img
          src="/static/images/ce/cancelOrder/tips.png"
          height="22"
          width="22"
        />
        <span style="margin-left: 10px">温馨提示</span>
      </view>
      <view class="tips-body">
        <p style="line-height: 25px">1.如果您已经付款给卖家，请勿取消订单</p>
        <p style="line-height: 25px">
          2.如果卖家未在15分钟内回复您的消息，您可以无责取消订单，完成率并不受影响。您一天可以无责取消5次。
        </p>
        <p style="line-height: 25px">
          3.如因系统超时订单取消，买家将被记责(完成率受影响)
        </p>
        <p style="line-height: 25px">
          4.一天内您最多只能3次有责取消。否则，您的帐户将被暂停，并且您不能在同一天再下订单。
        </p>
      </view>
    </view>
    <view class="mid"> 请您选择取消原因 </view>
    <view class="reamk">
      <uni-data-checkbox
        :multiple="false"
        v-model="value"
        selectedColor="rgb(232,118,62)"
        selectedTextColor="rgb(232,118,6)"
        :localdata="range"
      ></uni-data-checkbox>
    </view>
    <view class="btn" @click="confirm">提交</view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cancelData: { id: "", remark: "" },
      value: "我不想买了",
      range: [
        { value: "我不想买了", text: "我不想买了" },
        { value: "联系不到卖家", text: "联系不到卖家" },
        {
          value: "支付平台出现技术或网络错误",
          text: "支付平台出现技术或网络错误",
        },
        {
          value: "我还没付款，但误点击“已转账",
          text: "我还没付款，但误点击“已转账",
        },
        { value: "我是新手，不知道如何转账", text: "我是新手，不知道如何转账" },
        {
          value: "卖家收款账户被风控，无法付款",
          text: "卖家收款账户被风控，无法付款",
        },
        {
          value: "实际单价/金额与我看到的不符",
          text: "实际单价/金额与我看到的不符",
        },
        { value: "与卖家协商取消", text: "与卖家协商取消" },
        { value: "其他原因", text: "其他原因" },
      ],
    };
  },
  computed: {},
  methods: {
    confirm() {
      this.cancelData.id = this.$route.query.id;
      this.cancelData.remark = this.value;
      this.$api.fbBuyCancel(this.cancelData).then((res) => {
        this.$Router.push({
          path: "/orderDetail",
          query: { id: this.cancelData.id, type: 2 },
        });
        console.log(res);
      });
    },
  },
  watch: {},

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
.cancelOrder {
  width: 90%;
  margin: auto;
  height: 80vh;
  background-color: rgb(26, 26, 26);
  border-radius: 10px;
  .tips {
    width: 90%;
    margin: auto;
  }
  .tips-title {
    height: 40px;
    display: flex;
    align-items: center;
  }
  .tips-body {
    font-size: 14px;
    color: #9f9f9f;
    text-align: left;
  }
  .reamk {
    width: 90%;
    margin: auto;
  }
  .mid {
    width: 90%;
    margin: 20px auto;
    font-weight: 600;
    line-height: 40px;
    border-bottom: #707070 2px solid;
  }
  .btn {
    width: 80%;
    margin: 10px auto 0;
    height: 48px;
    line-height: 48px;
    background-color: rgb(232, 118, 62);
    text-align: center;
    border-radius: 50px;
  }
  &::v-deep .checklist-group {
    flex-direction: column !important;
  }
  &::v-deep .radio__inner {
    width: 20px !important;
    height: 20px !important;
  }
  &::v-deep .checklist-text {
    font-size: 15px !important;
  }
  &::v-deep .radio__inner-icon {
    width: 12px !important;
    height: 12px !important;
  }
}
</style>
