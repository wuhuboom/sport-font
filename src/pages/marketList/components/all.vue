<template>
  <view class="all">
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
  name: "all",
  components: { MarketMain },
  props: {},
  data() {
    return {
      params: {
        startTime: 0,
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
.all {
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
  .market-img {
    width: 30px;
    height: 30px;
    background-position: 0% 0%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .teamName {
    font-size: 12px;
    width: 60px;
    white-space: normal;
  }
  .all-main {
    //background-color: var(--body-bg);
    .uni-collapse {
      padding: 20px 0 0 0;
      display: flex;
      justify-content: space-around;
      background-color: var(--body-bg);
      &::v-deep .uni-collapse-item {
        margin: 0 10px 10px 10px;
        .uni-collapse-item__wrap {
          background-color: var(--body-bg);
        }
      }
      .item-title {
        min-height: 20px;
        border-radius: var(--card-radius);
        background-color: var(--form-main-uni-easyinput__content);
        border: 1px solid var(--border-color);
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .market-card {
        height: 80px;
        border-radius: var(--card-radius);
        color: var(--body-color);
        background: var(--card-style);
        box-shadow: var(--card-shadow);
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .card-left {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: right;
          .team1Img {
            margin-left: 10px;
          }
        }
        .card-mid {
          width: 20%;
          display: flex;
          align-items: center;
          flex-direction: column;
          padding: 0 10px;
          .card-vs {
            font-weight: 600;
            font-size: 14px;
            color: var(--light-color) !important;
          }
          .times {
            margin-top: 10px;
            color: var(--time-color);
            font-size: 12px;
          }
        }
        .card-right {
          display: flex;
          align-items: center;
          .team2Img {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
