<template>
  <view class="message content">
    <nav-aside></nav-aside>
    <view class="message-main">
      <view class="top-title">
        <text class="title-font">{{ $t("messageCenter.title") }}</text>
        <uni-icons
          class="title-icon"
          type="close"
          size="30"
          @click="$Router.back()"
        ></uni-icons>
      </view>
      <view class="bottom-btns">
        <button
          class="btn"
          :class="activeBtn === 0 ? 'active' : ''"
          type="default"
          @click="toggleBtn(0)"
        >
          {{ $t("messageCenter.systemBtn") }}
        </button>
        <button
          class="btn usdt-btn"
          :class="activeBtn === 1 ? 'active' : ''"
          @click="toggleBtn(1)"
          type="default"
        >
          {{ $t("messageCenter.personalBtn") }}
        </button>
      </view>
    </view>
    <view class="message-body">
      <system-notifs v-if="activeBtn === 0"></system-notifs>
      <personal-notifs v-if="activeBtn === 1"></personal-notifs>
    </view>
  </view>
</template>

<script>
import PersonalNotifs from "./components/personal-notifs.vue";
import SystemNotifs from "./components/system-notifs.vue";
export default {
  name: "message",
  components: { PersonalNotifs, SystemNotifs },
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
.message {
  margin-top: 60px;
  .message-main {
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
        font-weight: 700;
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
        border-radius: var(--tab-radius);
        width: auto;
        font-size: 15px;
        height: 36px;
        line-height: 36px;
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
    margin: 0 0 0 10px;
  }
}
</style>
