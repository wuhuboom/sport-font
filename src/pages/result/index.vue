<template>
  <view class="result content">
    <nav-aside></nav-aside>
    <view class="res-main">
      <view class="top-title">
        <text class="title-font">{{ $t("result.title") }}</text>
        <uni-icons
          class="title-icon"
          type="close"
          size="40"
          @click="$Router.back()"
        ></uni-icons>
      </view>
      <text class="tournament">{{ $t("result.tournamentList") }}</text>
      <uni-data-select
        class=""
        v-model="params.startTime"
        :localdata="range"
        :clear="false"
        @change="changeData"
        :value="params.startTime"
      ></uni-data-select>
      <uni-search-bar
        class="uni-mt-10 search-bar"
        :placeholder="$t('result.searchMsg')"
        clearButton="none"
        cancelButton="none"
        v-model="params.teamName"
        @confirm="search"
      />
      <view class="res-cards" v-for="(item, index) in eventData" :key="index">
        <text class="division">{{ item.allianceName }}</text>
        <view class="market-card">
          <view class="card-left">
            <view class="teamName">{{ item.mainName }}</view>
            <view
              class="team1Img market-img"
              :style="{ backgroundImage: `url(${item.mainLogo})` }"
            ></view>
          </view>
          <view class="card-mid">
            <view class="card-vs">
              <text>{{ item.homeFull }}</text>
              <text>VS</text>
              <text>{{ item.guestFull }}</text>
            </view>
            <text class="times">{{ format(item.settlementTime) }}</text>
          </view>
          <view class="card-right">
            <view
              class="team2Img market-img"
              :style="{ backgroundImage: `url(${item.guestLogo})` }"
            ></view>
            <view class="teamName">{{ item.guestName }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "result",
  components: {},
  props: {},
  data() {
    return {
      params: {
        startTime: 0,
        teamName: "",
        pageNo: 1,
        pageSize: 20,
      },
      value: 0,
      range: [
        {
          value: 0,
          text: this.$t("result.selectDataOne"),
        },
        {
          value: 1,
          text: this.$t("result.selectDataTwo"),
        },
        {
          value: 2,
          text: this.$t("result.selectDataThree"),
        },
      ],
      eventData: [],
      totalPage: "",
    };
  },
  computed: {},
  methods: {
    initData() {
      this.$api.gameFinish(this.params).then((res) => {
        if (this.params.pageNo == 1) {
          this.eventData = res.data.results;
        } else {
          this.eventData = this.eventData.concat(res.data.results);
        }
        this.totalPage = res.data.totalPage;
      });
    },
    changeData(e) {
      this.params.startTime = this.range[e].value;
      this.params.pageNo = 1;
      this.initData();
    },
    search() {
      this.params.pageNo = 1;
      this.initData();
    },
    //时间戳格式化
    add(m) {
      return m < 10 ? "0" + m : m;
    },
    format(times) {
      //times是整数，否则要parseInt转换
      var time = new Date(times);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        this.add(h) +
        ":" +
        this.add(mm) +
        " " +
        this.add(d) +
        "/" +
        this.add(m) +
        "/" +
        this.add(y)
      );
    },
  },
  watch: {},
  //触底事件
  onReachBottom() {
    if (this.totalPage > this.params.pageNo) {
      this.params.pageNo += 1;
      this.initData();
    }
  },
  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
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
.result {
  margin-top: 60px;
  .res-main {
    padding: 15px;
    .top-title {
      display: flex;
      justify-content: space-between;
      text-align: center;
      align-items: center;
      margin-bottom: 15px;
      .title-font {
        font-size: 16px;
        font-weight: 700;
        color: var(--page-title-color);
      }
      .title-icon {
        color: var(--close-color) !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .tournament {
      font-size: 15px;
      white-space: nowrap;
    }
    .search-bar {
      width: 100%;
      align-items: center;
      padding: 15px 0 0 0;
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
    .res-cards {
      height: 120px;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      border-radius: var(--card-radius);
      color: var(--body-color);
      background: var(--form-main-uni-easyinput__content);
      box-shadow: var(--card-shadow);
      justify-content: center;
      .division {
        text-align: center;
      }
      .market-card {
        padding: 15px 0 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
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
          padding: 0 10px;
          display: flex;
          align-items: center;
          flex-direction: column;
          .card-vs {
            width: 100%;
            font-weight: 600;
            line-height: 1;
            font-size: 18px;
            color: var(--light-color) !important;
            display: flex;
            justify-content: space-around;
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
      word-wrap: break-word;
    }

    &::v-deep .uni-select {
      margin-top: 15px;
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
  }
}
</style>
