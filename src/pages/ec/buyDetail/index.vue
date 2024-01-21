<template>
  <view class="content buyDetail">
    <uni-nav-bar
      left-icon="left"
      :border="false"
      backgroundColor="rgb(17,17,17)"
      color="#fff"
      @clickLeft="$Router.back()"
    >
      <view class="buyDetail-title">
        <view style="font-size: 14px">商家名称: {{ salerInfo.merName }}</view>
        <img
          style="margin-left: 5px"
          src="/static/images/ce/buy/renz.png"
          width="20"
          height="20"
        />
        <view style="font-size: 12px; color: rgb(232, 118, 62)">已认证</view>
      </view>
    </uni-nav-bar>
    <view class="buy-content">
      <view class="buy-amount">
        <view class="amount-title">按金额购买</view>
        <view class="amount-input">
          <view class="input">
            <uni-easyinput
              class="easy-inp"
              type="number"
              placeholder="金额"
              v-model="buyData.money"
            />
          </view>
          <view style="font-size: 17px"
            >USDT |
            <span
              style="margin-left: 5px; color: rgb(232, 118, 62)"
              @click="setMax"
              >Max</span
            ></view
          >
        </view>
        <view class="amout-ed">
          <view
            >限额范围 {{ salerInfo.minBalance }} -
            {{ salerInfo.maxBalance }}</view
          >
          <view style="color: red">
            商户可用余额: {{ salerInfo.balance / amountRate }}</view
          >
        </view>
        <!-- <view class="amont-end"
          >可得 <span class="amount-res">0.00 USDT</span></view
        > -->
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
            <view>{{ salerInfo.merName }}</view>
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
      <view class="btn" @click="confirm">购买</view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      buyData: { id: "", money: "" },
      salerInfo: {},
    };
  },
  computed: {},
  methods: {
    getSaler() {
      let id = this.$route.query.id;
      this.buyData.id = id;
      this.$api.saler({ id: id }).then((res) => {
        this.salerInfo = res.data;
      });
    },
    confirm() {
      if (
        this.buyData.money == "" ||
        this.buyData.money > this.salerInfo.maxBalance ||
        this.buyData.money < this.salerInfo.mixBalance
      ) {
        uni.showToast({
          title: "输入的金额过小或者过大",
          icon: "none",
          mask: true,
        });
        return;
      }
      this.$api.fbBuy(this.buyData).then((res) => {
        this.$Router.push({ path: "/createOrder", query: { id: res.data.id } });
      });
    },
    setMax() {
      this.buyData.money = this.salerInfo.maxBalance;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.getSaler();
  },
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
.buyDetail {
  .buyDetail-title {
    display: flex;
    align-items: center;
  }
  .buy-content {
    margin-top: 20px;
    padding: 0 15px;

    .buy-amount {
      background-color: rgb(26, 26, 26);
      height: 227px;
      border-radius: 8px;

      .amount-title {
        width: 90%;
        line-height: 60px;
        height: 60px;
        margin: auto;
      }
      .amount-input {
        width: 90%;
        margin: auto;
        display: flex;
        height: 60px;
        align-items: center;
        justify-content: space-between;
        border-bottom: rgb(112, 112, 112) 1px solid;
        .input {
          width: 70%;
        }
      }
      .amout-ed {
        display: flex;
        justify-content: space-between;
        color: rgb(105, 105, 105);
        width: 90%;
        margin: auto;
        font-size: 12px;
        line-height: 50px;
      }
      .amont-end {
        width: 90%;
        margin: auto;
      }
      .amount-res {
        margin-left: 10px;
        color: rgb(105, 105, 105);
      }
    }
    .sh-info {
      margin-top: 15px;
      height: 136px;
      border: rgb(112, 112, 112) 1px solid;
      border-radius: 8px;
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
    .btn {
      padding: 0 15px;
      margin: 50px auto 0;
      text-align: center;
      font-size: 20px;
      line-height: 48px;
      border-radius: 50px;
      background-color: rgb(232, 118, 62);
    }
  }
  &::v-deep .uni-easyinput__content {
    background-color: rgb(26, 26, 26) !important;
    border: rgb(26, 26, 26) 1px solid !important;
    box-shadow: var(--shadow-bg);
    border-radius: var(--card-radius) !important;
    height: 40px;
    padding: 0 15px 0 10px;
    color: var(--easyinput__color);
  }
  &::v-deep .uni-select__input-text {
    font-size: 12px !important;
    color: var(--navbar-color);
  }
}
</style>
