<template>
  <view class="content strongDetails bg">
    <view class="top">
      <view class="top-back bg" @click="goStrongBox"></view>
      <view class="top-mid">
        <image
          class="top-mid-img"
          src="/static/images/strongDetails/detail.png"
        />
        <p class="top-mid-p">{{ $t("illustrate.title") }}</p>
      </view>
      <view class="top-right"></view>
    </view>
    <view class="box">
      <p>{{ $t("illustrate.illustrateList.one") }}</p>
      <p>{{ $t("illustrate.illustrateList.two") }}</p>
      <p>{{ $t("illustrate.illustrateList.three") }}</p>
      <p>{{ $t("illustrate.illustrateList.Four") }}</p>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    goStrongBox() {
      this.$Router.push("/strongBox");
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
.strongDetails {
  background-image: url("/static/images/strongDetails/bg.png");
  .top {
    padding: 8% 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .top-back {
      width: 43px;
      height: 19px;
      background-image: url("/static/images/strongbox/back.png");
    }
    .top-mid {
      text-align: center;
      .top-mid-img {
        width: 70px;
        height: 50px;
      }
      .top-mid-p {
        font-family: "Century Gothic Bold";
        font-size: 20px;
        letter-spacing: 3px;
        color: #fff;
      }
    }
    .top-right {
      width: 43px;
    }
  }
  .box {
    margin: auto;
    width: 80vw;
    height: 50vh;
    font-family: "Century Gothic";
    font-size: 14px;
    color: #fff;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: space-around;
  }
}
.bg {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
