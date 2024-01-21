<template>
  <view class="aboutUniversal content"
    ><nav-aside></nav-aside>
    <view class="aboutUniversal-main">
      <view class="top-title">
        <text class="title-font">{{ $t("about.title") }}</text>
        <uni-icons
          class="title-icon"
          type="close"
          size="35"
          @click="$Router.back()"
        ></uni-icons>
      </view>
    </view>
    <uni-data-select
      class=""
      v-model="value"
      :localdata="range"
      @change="change"
      :clear="false"
    ></uni-data-select>
    <view class="u-line"></view>
    <view class="about-body">
      <uni-collapse ref="collapse" class="collapse-body">
        <uni-collapse-item
          :title="range[value].text"
          :open="true"
          :show-animation="false"
        >
          <view class="rich-content">
            <rich-text :nodes="range[value].context"></rich-text>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>
  </view>
</template>

<script>
export default {
  name: "aboutUniversal",
  components: {},
  props: {},
  data() {
    return {
      value: 0,
      strings: "213123",
      range: [
        {
          value: 0,
          text: config.projectName,
          context: this.$t("about.companyIntroduction"),
        },
        {
          value: 1,
          text: this.$t("about.userAgreement"),
          context: this.$t("about.userAgreementContext"),
        },
        {
          value: 2,
          text: this.$t("about.termsOfService"),
          context: this.$t("about.termsOfServiceContext"),
        },
      ],
    };
  },
  computed: {},
  methods: {
    change(e) {
      this.value = e;
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
.aboutUniversal {
  background: var(--body-bg) !important;
  min-height: 100vh;
  margin-top: 60px;
  .aboutUniversal-main {
    overflow: hidden;
    padding: 10px 15px 15px 15px !important;
  }
  .top-title {
    background: var(--body-bg) !important;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    .title-font {
      font-size: 15px;
      font-weight: 700;
      color: var(--page-title-color);
    }
    .title-icon {
      font-weight: 700;
      color: var(--close-color) !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &::v-deep .uni-select {
    margin-left: 15px;
    width: 70%;
    font-size: 16px;
    background-color: var(--form-main-uni-easyinput__content);
    color: var(--easyinput__color);
    border: var(--easyinput__border) !important;
    box-shadow: var(--shadow-bg);
    box-sizing: border-box;
    border-radius: 8px;
    padding: 0 5px;
    padding-left: 10px;
    position: relative;
    display: flex;
    -webkit-user-select: none;
    user-select: none;
    flex-direction: row;
    align-items: center;
    height: 50px;
  }
  &::v-deep .uni-select__selector-item {
    font-size: 16px !important;
  }
  &::v-deep .uni-select__input-text {
    color: var(--navbar-color);
  }
  &::v-deep .uni-select__selector {
    background-color: var(--uni-select__selector-bg) !important;
    border: var(--uni-select__solid) !important;
    border-radius: var(--card-radius) !important;
  }
  .u-line {
    margin: 20px 0px;
    border-bottom: 1px dashed rgb(255, 255, 255);
    width: 100%;
    transform: scaleY(0.5);
    border-top-color: rgb(255, 255, 255);
    border-right-color: rgb(255, 255, 255);
    border-left-color: rgb(255, 255, 255);
  }
  .about-body {
    margin-right: 10px;
    .collapse-body {
      background-color: var(--body-bg);
      &::v-deep .uni-collapse-item__title-box {
        background-color: var(--body-bg);
        color: var(--body-color);
      }
      .rich-content {
        background-color: var(--body-bg);
        color: var(--body-color);
        padding: 0 10px 0 15px;
      }
    }
    &::v-deep .uni-collapse-item-border {
      border-bottom: 0px;
    }
    &::v-deep .uni-collapse-item--border {
      border-bottom-width: 1px;
      border-bottom-color: var(--body-bg);
    }
  }
  &::v-deep .uni-collapse-item__wrap {
    background-color: unset !important;
  }
}
</style>
