<template>
  <view class="messageDetails content"
    ><nav-aside></nav-aside>
    <view class="message-main">
      <view class="top-title">
        <text class="title-font">Message Details</text>
        <uni-icons
          class="title-icon"
          type="close"
          size="30"
          @click="$Router.back()"
        ></uni-icons>
      </view>
    </view>
    <view class="richclass">
      <rich-text></rich-text>
    </view>
  </view>
</template>

<script>
export default {
  name: "messageDetails",
  components: {},
  props: {},
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
.messageDetails {
  margin-top: 60px;
  .message-main {
    padding: 15px;
    position: relative;
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
  }
  .richclass {
    margin: 15px;
    overflow: hidden;
    border-radius: var(--card-radius);
    background: var(--card-style);
    box-shadow: 0 6px 24px 0 rgba(11, 8, 108, 0.13);
    min-height: calc(100vh - 250px);
  }
}
</style>
