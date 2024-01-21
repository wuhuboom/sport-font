<template>
  <view class="help content"
    ><nav-aside></nav-aside>
    <view class="help-main">
      <view class="top-title">
        <text class="title-font">{{ $t("help.title") }}</text>
        <uni-icons
          class="title-icon"
          type="close"
          size="30"
          @click="$Router.back()"
        ></uni-icons>
      </view>
      <view
        class="help-img"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      ></view>
    </view>
    <uni-data-select
      class=""
      v-model="value"
      :localdata="range"
      :clear="false"
    ></uni-data-select>
    <view class="u-line"></view>
    <view class="about-body">
      <uni-collapse ref="collapse" class="collapse-body">
        <uni-collapse-item
          :title="range[value].text"
          :open="true"
          :border="false"
          :show-animation="false"
          title-border="none"
        >
          <view class="rich-content">
            <rich-text
              class="rich-txt"
              :nodes="range[value].context"
            ></rich-text>
          </view>
        </uni-collapse-item>
      </uni-collapse> </view
  ></view>
</template>

<script>
import NavAside from "@/components/nav-aside/nav-aside.vue";
export default {
  name: "help",
  components: { NavAside },
  props: {},
  data() {
    return {
      value: 0,
      backgroundImage: "../../static/images/temporary/hlepImg.png",
      range: [
        {
          value: 0,
          text: "1.Rules",
          context:
            "<p>zhasnaaskdjaskljdalskdjaslkdjl</p>" +
            "<p>aksdjalksdjlaksjdlaksjdkalsjdlaksjdlaksj</p>" +
            "<p>dlaksjdlaksjdlaksjdlasdjalsdjlaksjdklas</p>" +
            "<p>jdlaksdjlaksjdlkasjdlk</p>",
        },
        {
          value: 1,
          text: "2.What is an Anti-Score",
          context:
            "<p>Teams of Service</p>" +
            "<p>Privacy Policy</p>" +
            "<p>njytnnfdghbdfghefghfghdfg</p>" +
            "<p>sfdghrethbfzdjsdayregvfxzbgdf</p>" +
            "<p>hjgfjtyurtgervgeve</p>" +
            "<p>fghjjgfhgf</p>" +
            "<p>Introduction</p>" +
            "<p>ghghghgh</p>" +
            "<p>dfgdfgdfg</p>" +
            "<p>fdsfsdf</p>" +
            "<p>Purpose</p>" +
            "<p>qweqweqw</p>" +
            "<p>Access Information</p>" +
            "<p>asdasdasdasdasd</p>" +
            "<p>Privaasdasdcy</p>" +
            "<p>Recipients of customer informationasdasdasdasdasdasdasdasdsadasdasdasd</p>",
        },
        {
          value: 2,
          text: "3.How to apply for a proxy",
          context: "asd54asd54as56d4a655e4qwe87qw98eq7",
        },
        {
          value: 3,
          text: "4.Other game instructions",
          context: "asd54asd54as56d4a655e4qwe87qw98eq7",
        },
      ],
    };
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
.help {
  margin-top: 60px;
  background: var(--body-bg) !important;
  min-height: 100vh;
  .help-main {
    overflow: hidden;
    padding: 10px 15px 15px 15px !important;
  }
  .top-title {
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
  .help-img {
    border-radius: var(--card-radius);
    margin: 15px 0 10px 0;
    width: 100%;
    height: 160px;
    background-position: center;
    background-size: cover;
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
    padding: 0 0 10px 0;
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
        min-height: calc(100vh - 250px);
      }
    }
    &::v-deep .uni-collapse-item-border {
      border-bottom: 0px;
    }
    &::v-deep .uni-collapse-item--border {
      border-bottom-width: 0px;
      border-bottom-color: var(--body-bg);
    }
    &::v-deep .uni-collapse-item__wrap {
      background-color: unset !important;
    }
  }
}
</style>
