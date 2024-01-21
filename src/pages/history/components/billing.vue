<template>
  <view class="billing">
    <view class="billing-body">
      <view class="calendar-btn" @click="$refs.calendar.open()">
        <text>Select date</text>
        <uni-icons
          class="calendar-icon"
          custom-prefix="iconfont"
          type="icon-rili"
          size="16"
        >
        </uni-icons>
      </view>

      <no-data></no-data>
    </view>
    <uni-calendar
      ref="calendar"
      :range="true"
      :insert="false"
      @confirm="$refs.calendar.close()"
    />
  </view>
</template>

<script>
import NoData from "@/components/no-data/no-data.vue";
export default {
  name: "billing",
  components: { NoData },
  props: [],
  data() {
    return {};
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
.billing {
  .billing-body {
    padding: 14px;
    border-radius: var(--card-radius) !important;
    .calendar-btn {
      align-items: center;
      height: 50px;
      background-color: var(--form-main-uni-easyinput__content);
      border: var(--easyinput__border) !important;
      box-shadow: var(--shadow-bg);
      border-radius: var(--card-radius) !important;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      &::v-deep .calendar-icon {
        color: #616b89 !important;
        margin-right: 8px;
      }
    }
  }
  .uni-calendar {
    &::v-deep .uni-calendar__content {
      background: var(--calendar-content-bg);
      .uni-calendar--fixed-top {
        border: none;
      }
      .uni-calendar__header {
        border: none;
      }
      .uni-calendar__header-text {
        color: var(--text-gray-color);
      }
      .uni-calendar__weeks-day {
        border: none;
      }
      .uni-calendar-item--disable {
        background-color: var(--calendar-content-bg);
        color: rgb(136, 136, 136);
        font-weight: 800;
      }
      .uni-calendar-item--multiple {
        color: rgb(255, 255, 255) !important;
        background-color: var(--rangeBgColor-bg);
        font-weight: 800;
      }
      .uni-calendar-item__weeks-box-text {
        color: var(--text-gray-color);
        font-weight: 800;
      }

      .uni-calendar-item--checked {
        background-color: var(--calendar-active-bg);
        color: rgb(255, 255, 255) !important;
        font-weight: 800;
      }
      .uni-calendar-item--before-checked {
        background-color: var(--calendar-active-bg);
      }
      .uni-calendar-item--after-checked {
        background-color: var(--calendar-active-bg);
      }
      .uni-calendar-item__weeks-lunar-text {
        color: var(--calendar-active-bg);
      }
      .uni-calendar-item--isDay {
        background-color: var(--calendar-active-bg);
        color: rgb(255, 255, 255) !important;
      }
    }
  }
}
</style>
