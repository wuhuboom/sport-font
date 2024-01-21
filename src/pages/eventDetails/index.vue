<template>
  <view class="eventDetails content">
    <nav-aside></nav-aside>
    <view class="details-main">
      <view class="top-title">
        <text class="title-font">{{ $t("eventDetails.title") }}</text>
        <uni-icons
          class="title-icon"
          type="close"
          size="40"
          @click="$Router.back()"
        ></uni-icons>
      </view>
      <view
        class="details-img"
        :style="{ backgroundImage: `url(${eventDetailsImg})` }"
      ></view>
      <view class="fan-card race-teams">
        <view class="teams-top">{{ gameEvent.allianceName }}</view>
        <view class="teams-body">
          <view class="team1">
            <view
              class="team1Img"
              :style="{ backgroundImage: `url(${gameEvent.mainLogo})` }"
            ></view>
            <text class="team-tit">{{ gameEvent.mainName }}</text>
          </view>
          <view class="team-vs">VS</view>
          <view class="team1">
            <view
              class="team1Img"
              :style="{ backgroundImage: `url(${gameEvent.guestLogo})` }"
            ></view>
            <text class="team-tit">{{ gameEvent.guestName }}</text>
          </view>
        </view>
      </view>
      <view class="quk-card u-m-b-30">
        <view class="u-m-b-20">{{ $t("eventDetails.lossPerCent") }}</view>
        <swiper
          class="swiper"
          :indicator-dots="false"
          :autoplay="true"
          :interval="3000"
          :duration="2000"
          :circular="true"
          :vertical="true"
          :display-multiple-items="1"
          easing-function="linear"
        >
          <swiper-item v-for="(item, index) in lossPerCent" :key="index">
            <view class="swiper-item">
              <text class="text-mid"
                >{{ item.scoreHome }}:{{ item.scoreAway }}</text
              >
              <text class="text-mid">{{ item.antiPerCent }}</text>
              <text class="text-mid">{{ item.gameType }}</text>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view class="mark-table">
        <view class="mark-table-head">
          <text class="td">{{ $t("eventDetails.project") }}</text>
          <text class="td">{{ $t("eventDetails.profits") }}</text>
          <text class="td">{{ $t("eventDetails.eventType") }}</text>
          <view class="mk-right"></view>
        </view>
        <view
          class="table-body"
          v-for="(item, index) in lossPerCent"
          :key="index"
        >
          <view class="body-td">
            <text class="td">{{ item.scoreHome }}:{{ item.scoreAway }}</text>
            <text class="td">{{ item.antiPerCent }}</text>
            <text class="td">{{ item.gameType }}</text>
          </view>
          <view class="body-btn" @click="goBet(item)">{{
            $t("eventDetails.bet")
          }}</view>
        </view>
      </view>
    </view>
    <view class="bottom"></view>
    <uni-popup
      ref="popup"
      background-color="#fff"
      type="bottom"
      :is-mask-click="true"
    >
      <event-popup :betPre="betPre" v-on:closeChild="closeChild"></event-popup>
    </uni-popup>

    <uni-popup
      ref="eventDetailsPopup"
      background-color="#fff"
      type="center"
      class="uni-details-popup"
      :is-mask-click="true"
    >
      <details-popup></details-popup>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "event-details",
  components: {},
  props: {},
  data() {
    return {
      gameEvent: "",
      lossPerCent: [],
      eventDetailsImg: "../../static/images/temporary/eventDetails.png",
      betPre: {
        allianceName: "",
        mainLogo: "",
        mainName: "",
        guestLogo: "",
        guestName: "",
        gameId: "",
        perId: "",
        antiPerCent: "",
      },
    };
  },
  computed: {},
  methods: {
    initEvent() {
      let gameId = this.$Route.query.id;
      this.$api.gemeDetail({ gameId: gameId }).then((res) => {
        this.gameEvent = res.data.game;
        this.lossPerCent = res.data.lossPerCent.filter((item) => {
          item.gameType =
            item.gameType == 1
              ? this.$t("eventDetails.first")
              : this.$t("eventDetails.second");
          return item.status === 1;
        });
      });
    },
    goBet(lossPerCent) {
      this.betPre.allianceName = this.gameEvent.allianceName;
      this.betPre.mainLogo = this.gameEvent.mainLogo;
      this.betPre.mainName = this.gameEvent.mainName;
      this.betPre.guestLogo = this.gameEvent.guestLogo;
      this.betPre.guestName = this.gameEvent.guestName;
      this.betPre.gameId = this.gameEvent.id;
      this.betPre.perId = lossPerCent.id;
      this.betPre.antiPerCent = lossPerCent.antiPerCent;
      this.$refs.popup.open();
    },
    closeChild() {
      this.$refs.popup.close();
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.initEvent();
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
.eventDetails {
  margin-top: 60px;
  .details-main {
    padding: 0 15px;
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
        color: var(--close-color) !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .details-img {
      width: 100%;
      height: 140px;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .race-teams {
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      .teams-top {
        color: var(--navbar-color);
        padding: 15px 10px 0 10px;
      }
      .teams-body {
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 16px;
        .team1 {
          width: 40%;
          display: flex;
          text-align: center;
          align-items: center;
          flex-direction: column;
          .team1Img {
            width: 30px;
            height: 30px;
            border-radius: 0;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
        .team-vs {
          width: 20%;
          font-weight: 500;
          line-height: 42px;
          color: var(--navbar-color);
        }
      }
    }
    .mark-table {
      .mark-table-head {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        background: var(--card-style);
        border-radius: var(--card-radius);
        height: 48px;
        justify-content: sflex-start;
        .mk-right {
          margin-left: 10px;
          width: 56px;
        }
        .td {
          width: 82px;
        }
      }
      .table-body {
        display: flex;
        height: 48px;
        margin-bottom: 10px;
        .body-td {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: var(--card-style);
          border-radius: var(--card-radius);
          .td {
            width: 82px;
          }
        }
        .body-btn {
          margin-left: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 48px;
          color: #fff;
          background: var(--gradient-color);
          border-radius: var(--card-radius);
        }
      }
    }
    .swiper {
      width: 100%;
      height: 20px;
    }
    .swiper-item {
      display: flex;
      justify-content: space-between;
      text-align: left;
      align-items: left;
      .text-mid {
        width: 60px;
      }
    }
  }
  .fan-card {
    color: var(--body-color);
    border-radius: var(--card-radius);
    background: var(--card-style);
    box-shadow: var(--card-shadow);
    border: var(--fan-card-border);
  }
  .team-tit {
    margin-top: 5px;
    color: var(--body-color);
  }
  .u-m-b-30 {
    margin-bottom: 15px !important;
  }
  .quk-card {
    background: var(--quk-bg);
    color: #fff;
    border-radius: var(--card-radius);
    padding: 10px;
  }
  .u-m-b-20 {
    margin-bottom: 10px !important;
  }
  .td {
    margin-left: 15px;
    font-size: 14px;
  }
  .bottom {
    height: 50px;
  }
}
</style>
