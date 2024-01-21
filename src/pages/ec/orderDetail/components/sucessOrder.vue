<template>
  <view class="sucessOrder">
    <view class="top">
      <view class="top-t">
        <img src="/static/images/ce/buy/checked.png" height="30" width="30" />
        <p style="margin: 0 10px">订单已经完成</p>
      </view>
      <p class="top-b">
        你已经成功购买
        <span style="margin: 0 5px">{{ orderDetail.money / amountRate }}</span>
        USDT
      </p>
    </view>
    <view class="mid">
      <view class="mid-a">
        <span style="color: rgb(232, 118, 62); font-weight: 700">买入</span>
        <span style="color: #fff; margin-left: 4px; font-weight: 700"
          >USDT</span
        >
      </view>
      <view class="detail-item">
        <p class="tit">总金额</p>
        <view
          >$ {{ orderDetail.money / amountRate }}
          <uni-icons
            @click="copyCode(orderDetail.money / amountRate)"
            style="margin-left: 10px"
            custom-prefix="iconfont"
            color="rgb(159, 159, 159)"
            type="icon-fuzhi"
            size="20"
          ></uni-icons
        ></view>
      </view>
      <view class="detail-item border_bottom">
        <p class="tit">支付方式</p>
        <p>{{ orderDetail.payName }}</p>
      </view>
      <view class="detail-item">
        <P class="tit">卖家昵称</P>
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
      <view class="detail-item">
        <p class="tit">订单编号</p>
        <view>
          <view>
            {{ orderDetail.orderNo }}
            <uni-icons
              @click="copyCode(orderDetail.orderNo)"
              style="margin-left: 10px"
              custom-prefix="iconfont"
              color="rgb(159, 159, 159)"
              type="icon-fuzhi"
              size="20"
            ></uni-icons
          ></view>
        </view>
      </view>
      <view class="detail-item border_bottom">
        <p class="tit">下单时间</p>
        <p>{{ formatTimes(orderDetail.createdAt) }}</p>
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
.sucessOrder {
  width: 90%;
  margin: auto;
  font-size: 14px;
  .top {
    margin: 20px 0;
    .top-t {
      display: flex;
      font-size: 24px;
    }
    .top-b {
      margin-top: 10px;
      font-size: 14;
      color: rgb(141, 141, 141);
    }
  }
  .detail-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    .info {
      display: flex;
      align-items: center;
    }
    .tit {
      color: #9f9f9f;
    }
  }
  .border_bottom {
    border-bottom: 1px solid rgb(26, 26, 26);
    margin-bottom: 16px;
  }
}
</style>
