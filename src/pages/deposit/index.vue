<template>
  <view class="deposit content">
    <nav-aside></nav-aside>
    <view class="deposit-main">
      <view class="top-title">
        <text class="title-font">{{ $t("deposit.title") }}</text>
        <uni-icons
          class="title-icon"
          type="close"
          size="40"
          @click="$Router.push('/')"
        ></uni-icons>
      </view>
      <view class="bottom-btns">
        <button
          class="btn"
          :class="activeBtn === 0 ? 'active' : ''"
          type="default"
          @click="toggleBtn(0)"
        >
          {{ $t("deposit.bankBtn") }}
        </button>
        <button
          class="btn usdt-btn"
          :class="activeBtn === 1 ? 'active' : ''"
          @click="toggleBtn(1)"
          type="default"
        >
          {{ $t("deposit.usdtBtn") }}
        </button>
      </view>
    </view>
    <bank-card v-if="activeBtn === 0"></bank-card>
    <usdt-card v-if="activeBtn === 1"></usdt-card>
  </view>
</template>

<script>
import NavAside from "@/components/nav-aside/nav-aside.vue";
import BankCard from "./components/bank-card.vue";
import UsdtCard from "./components/usdt-card.vue";
export default {
  components: { NavAside, BankCard, UsdtCard },
  name: "deposit",
  props: {},
  data() {
    return { activeBtn: 0 };
  },
  computed: {},
  methods: {
    toggleBtn(index) {
      this.activeBtn = index;
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
.deposit {
  margin-top: 60px;
  .deposit-main {
    padding: 15px;
    background: var(--mar-bg);
    position: relative;
    .top-title {
      display: flex;
      justify-content: space-between;
      text-align: center;
      align-items: center;
      .title-font {
        font-size: 18px;
        font-weight: 700;
        color: var(--page-title-color);
      }
      .title-icon {
        color: var(--close-color) !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .bottom-btns {
      align-items: center;
      margin: 15px 0 10px 0;
      .btn {
        display: inline-block;
        padding: 0 31px;
        border-radius: var(--tab-radius);
        width: auto;
        font-size: 15px;
        height: 36px;
        line-height: 36px;
        background-color: var(--tab-item-bg);
        color: var(--body-color);
      }
    }
  }
  .active {
    background: var(--tab-active);
    color: #fff !important;
    height: 42px !important;
    line-height: 42px !important;
  }
  .usdt-btn {
    margin: 0 0 0 25px;
  }
}
</style>
