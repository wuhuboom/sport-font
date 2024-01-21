<template>
  <view class="failOrder">
    <view class="fail-cancel" v-if="orderDetail.status === 4">
      <view class="cancel-title">交易已经取消</view>
      <view class="cancel-tip">您已主动取消订单</view>
      <view class="cancel-detail">
        <P style="color: #9f9f9f; margin-bottom: 12px">取消原因:</P>
        <p style="margin-bottom: 12px">{{ orderDetail.remark }}</p>
      </view>
    </view>
    <view class="mrt">
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
      <view class="mid-flex">
        <p>卖家昵称</p>
        <view class="mid-i">
          <view>{{ orderDetail.merName }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { formatTime } from "@/utils";
export default {
  props: ["orderDetail"],
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    formatTimes(times) {
      return formatTime(times);
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
.failOrder {
  .fail-cancel {
    width: 90%;
    margin: auto;
    .cancel-title {
      font-size: 24px;
      margin: 12px 0;
    }
    .cancel-tip {
      color: #8d8d8d;
      margin-bottom: 12px;
    }
    .cancel-detail {
      border-radius: 10px;
      background-color: #1a1a1a;
      padding: 12px;
      margin-bottom: 16px;
      font-size: 14px;
    }
  }
  .mrt {
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
  }
  .imd-h {
    height: 160px;
  }
  .mid {
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
}
</style>
