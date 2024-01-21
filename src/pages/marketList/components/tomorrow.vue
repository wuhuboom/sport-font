<template>
  <view class="tomorrow">
    <view class="searchBar">
      <uni-search-bar
        class="uni-mt-10 search-bar"
        :placeholder="$t('marketList.searchPlacholden')"
        clearButton="none"
        cancelButton="none"
        @confirm="search"
        @input="search"
        v-model="params.teamName"
        :value="params.teamName"
      />
    </view>
    <market-main :market="dataList"></market-main>
  </view>
</template>

<script>
import MarketMain from "./marketMain.vue";
import { formattingData } from "@/utils";
export default {
  name: "tomorrow",
  components: { MarketMain },
  props: {},
  data() {
    return {
      params: {
        startTime: 2,
        status: 0,
        teamName: "",
        pageNo: 1,
        pageSize: 10,
      },
      dataList: [],
      rawData: [],
      totalPage: "",
    };
  },
  computed: {},
  methods: {
    initData() {
      this.$api.gameList(this.params).then((res) => {
        this.totalPage = res.data.totalPage;
        if (this.params.pageNo == 1) {
          this.rawData = res.data.results;
        } else {
          this.rawData = this.rawData.concat(res.data.results);
        }
        this.dataList = formattingData(this.rawData, "allianceName");
      });
    },
    addData() {
      if (this.totalPage <= this.params.pageNo) {
        return false;
      }
      this.params.pageNo += 1;
      this.initData();
    },
    search() {
      this.params.pageNo = 1;
      this.initData();
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  mounted() {
    this.initData();
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
.tomorrow {
  .search-bar {
    background-color: var(--home-lang-bar-color) !important;
    &::v-deep .uni-searchbar__box {
      height: 52px;
      border-radius: var(--card-radius) !important;
      background-color: var(--form-main-uni-easyinput__content) !important;
      border: 1px solid var(--border-color) !important;
    }
    &::v-deep .uni-input-input {
      color: var(--body-color) !important;
    }
  }
}
</style>
