<template>
  <view class="content">
    <uni-nav-bar
      left-icon="left"
      :border="false"
      backgroundColor="rgb(17,17,17)"
      color="#fff"
      @clickLeft="goBack"
    />
    <failOrder
      :orderDetail="orderDetail"
      v-if="orderDetail.status == 4 || orderDetail.status == 5"
    ></failOrder>
    <sucessOrder
      v-if="orderDetail.status == 3"
      :orderDetail="orderDetail"
    ></sucessOrder>
  </view>
</template>

<script>
import failOrder from "./components/failOrder.vue";
import sucessOrder from "./components/sucessOrder.vue";
export default {
  components: { failOrder, sucessOrder },
  data() {
    return {
      orderDetail: {},
    };
  },
  computed: {},
  methods: {
    async init() {
      let id = this.$route.query.id;
      let data = await this.$api.fbSaleOrderDetail({ id: id });
      console.log(data);
      this.orderDetail = data.data;
    },
    goBack() {
      let type = this.$route.query.type;
      if (type == 2) {
        this.$Router.push("/cebuy");
      } else {
        this.$Router.back();
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.init();
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
