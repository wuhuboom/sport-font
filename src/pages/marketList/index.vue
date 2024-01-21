<template>
  <view class="marketList content">
    <nav-aside></nav-aside>
    <view class="top-btns">
      <button
        class="btn"
        :class="activeBtn === 0 ? 'active' : ''"
        @click="toggleBtn(0)"
      >
        {{ $t("marketList.btnAll") }} {{ allNum }}
      </button>
      <button
        class="btn"
        :class="activeBtn === 1 ? 'active' : ''"
        @click="toggleBtn(1)"
      >
        {{ $t("marketList.btnToday") }} {{ todayNun }}
      </button>
      <button
        :class="activeBtn === 2 ? 'active' : ''"
        @click="toggleBtn(2)"
        class="btn"
      >
        {{ $t("marketList.btnTomorrow") }} {{ tomorrowNum }}
      </button>
    </view>
    <all v-if="activeBtn === 0" ref="allData"></all>
    <today v-if="activeBtn === 1" ref="todayData"></today>
    <tomorrow v-if="activeBtn === 2" ref="tomorrowData"></tomorrow>
    <u-tabbar></u-tabbar>
  </view>
</template>

<script>
import All from "./components/all.vue";
import Today from "./components/today.vue";
import Tomorrow from "./components/tomorrow.vue";
export default {
  name: "marketList",
  components: { All, Today, Tomorrow },
  props: {},
  data() {
    return {
      activeBtn: 0,
      allNum: 0,
      todayNun: 0,
      tomorrowNum: 0,
    };
  },
  computed: {},
  methods: {
    toggleBtn(index) {
      this.activeBtn = index;
    },
    dataToAll() {
      this.$refs.allData.addData();
    },
    todayData() {
      this.$refs.todayData.addData();
    },
    tomorrowData() {
      this.$refs.tomorrowData.addData();
    },
    init() {
      this.$api.gameList({ startTime: "0", status: "0" }).then((res) => {
        this.allNum = res.data.totalCount;
      });
      this.$api.gameList({ startTime: "1", status: "0" }).then((res) => {
        this.todayNun = res.data.totalCount;
      });

      this.$api.gameList({ startTime: "2", status: "0" }).then((res) => {
        this.tomorrowNum = res.data.totalCount;
      });
    },
  },
  watch: {},
  //触底事件
  onReachBottom() {
    if (this.activeBtn === 0) {
      this.dataToAll();
    } else if (this.activeBtn === 1) {
      this.todayData();
    } else {
      this.tomorrowData();
    }
  },
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

<style scoped lang="scss">
.marketList {
  margin-top: 60px;
  .top-btns {
    padding: 10px 0;
    background: var(--mar-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      font-size: 16px;
      border-radius: var(--card-radius);
      color: var(--body-color);
      position: relative;
      background-color: var(--tab-item-bg);
      padding: 0 20px;
      &:after {
        border: none !important;
      }
    }
    .active {
      height: 42px;
      font-weight: 700;
      color: #fff;
      background: var(--ac-rec-row-active-bg);
    }
  }
}
</style>
