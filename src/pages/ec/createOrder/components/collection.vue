<template>
  <view class="collection">
    <view class="title">
      <view>等待卖家确认收款</view>
      <view style="margin-left: 10px"
        ><uni-countdown
          color="red"
          splitorColor="red"
          :font-size="15"
          :show-day="false"
          :second="orderDetail.timeoutSaler"
        ></uni-countdown
      ></view>
    </view>
    <view class="salerInfo">
      <view>
        <view class="salerInfo-img">
          <img
            style="margin: 0 10px"
            src="https://new22.pigk.xyz/static/image/user.png"
            height="50"
            width="50"
          />
          <p>{{ orderDetail.merName }}</p>
        </view>
      </view>
      <view class="chat">
        <uni-icons type="chat" size="25"></uni-icons>
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
    <view class="mid imd-h">
      <view class="mid-flex">
        <p>总额</p>
        <view class="mid-i">
          <view>{{ orderDetail.money / amountRate }}</view>
        </view>
      </view>
      <view class="mid-flex">
        <p>订单号</p>
        <view class="mid-i">
          <view>{{ orderDetail.orderNo }}</view>
        </view>
      </view>

      <view class="mid-flex">
        <p>创建时间</p>
        <view class="mid-i">
          <view>{{ formatTimes(orderDetail.createdAt) }}</view>
        </view>
      </view>
    </view>
    <view class="mid mid-g">
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
      <view class="btn2" @click="payed(orderDetail.id)"
        >需要帮助，联系客服</view
      >
    </view>
  </view>
</template>

<script>
import { formatTime } from "@/utils";
export default {
  components: {},
  props: ["orderDetail"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    formatTimes(times) {
      return formatTime(times);
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
.collection {
  width: 90%;
  margin: auto;
  .title {
    display: flex;
    font-size: 15px;
  }
  .salerInfo {
    background-color: rgb(26, 26, 26);
    display: flex;
    height: 80px;
    margin: 20px 0;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    .salerInfo-img {
      display: flex;
      align-items: center;
    }
    .chat {
      margin-right: 10px;
      height: 30px;
      width: 54px;
      line-height: 30px;
      text-align: center;
      border-radius: 30px;
      background-color: rgb(232, 118, 62);
    }
  }
  .mrt {
    margin: 15px 0;
    display: flex;
    align-items: center;
  }
  .imd-h {
    height: 120px;
  }
  .mid-g {
    height: 160px;
  }
  .mid {
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
    margin: 30px auto;
    justify-content: space-between;
    .btn2 {
      width: 100%;
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
