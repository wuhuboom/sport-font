<template>
  <view class="details-popup">
    <view class="title">
      <text>Event Details</text>
      <!-- <uni-icons type="closeempty" size="20"></uni-icons> -->
    </view>
    <view class="top-card fan-card">
      <text class="fast-item">bettor:sd***sds</text>
      <text class="fast-item">20:00 23/02</text>
    </view>
    <view class="fast-card fan-card">
      <view class="fast-title u-flex u-m-b-20">CSKA Moscow - FC Krasnodar</view>
      <view class="fast-cell u-flex u-m-b-20">
        <text class="score-val">3:3</text>
        <text>4</text>
      </view>
      <view class="fast-line">
        <text class="fast-line-font">Event details</text>
      </view>
      <view class="fast-preview u-flex u-row-between">
        <text>Silps</text>
        <text>549.68</text>
      </view>
      <view class="fast-preview u-flex u-row-between">
        <text>Gain</text>
        <text>21.99</text>
      </view>
    </view>
    <view class="popup-btn">Quick Bet</view>
  </view>
</template>

<script>
export default {
  name: "details-popup",
  components: {},
  props: {},
  data() {
    return { text: 1 };
  },
  computed: {},
  methods: {},
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
.details-popup {
  overflow: hidden;
  min-width: 320px;
  overflow: hidden;
  background: var(--bs-popup-bg);
  padding: 10px 10px;
  .title {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  }
  .top-card {
    margin-bottom: 15px !important;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .fan-card {
    border: var(--fan-card-border);
    color: var(--body-color);
    border-radius: var(--card-radius);
    background: var(--card-style);
    box-shadow: var(--card-shadow);
  }
  .fast-card {
    padding: 15px 20px;
    .fast-title {
      font-size: 14px;
      font-weight: 700;
    }
    .fast-cell {
      justify-content: space-between;
      font-size: 14px;
      .score-val {
        color: #fad937;
        font-weight: 700;
        line-height: 24px;
      }
    }
    .fast-line {
      position: relative;
      text-align: center;
      ::before {
        left: 0;
        position: absolute;
        content: "";
        height: 1px;
        width: 35%;
        top: 50%;
        background: #1aeacb;
      }
      .fast-line-font {
        font-size: 14px;
        color: var(--light-color) !important;
      }
      ::after {
        position: absolute;
        content: "";
        height: 1px;
        width: 35%;
        top: 50%;
        background: #1aeacb;
      }
    }
  }
  .popup-btn {
    margin: 15px 0 8px 0;
    text-align: center;
    line-height: 50px;
    height: 50px;
    color: #fff !important;
    background: linear-gradient(var(--btn-submit-bg-1), var(--btn-submit-bg-2));
    box-shadow: var(--btn--submit--shadow) !important;
    border-radius: var(--card-radius) !important;
  }
  .fast-item {
    padding: 5px 10px;
  }
  .u-m-b-20 {
    margin-bottom: 10px !important;
  }
  .u-flex {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .fast-preview {
    padding: 5px 0;
  }
  .u-row-between {
    justify-content: space-between;
  }
}
</style>
