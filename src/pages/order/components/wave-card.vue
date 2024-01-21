<template>
  <view class="wave-card">
    <text class="card-title">{{ item.gameInfo }}</text>
    <view class="card-main" @click="openPop">
      <view class="main-text">
        <text
          >{{ $t("order.wave.betting") }} ：{{
            item.betMoney / amountRate
          }}</text
        >
        <text
          >{{ $t("order.wave.profit") }} ：{{
            item.winningAmount / amountRate
          }}</text
        >
      </view>
      <view class="main-status">
        <text v-if="item.statusSettlement == 0" class="progress">{{
          $t("order.wave.progress")
        }}</text>
        <text v-else class="done">{{ $t("order.wave.done") }}</text>
      </view>
    </view>
    <view class="card-footer">
      <text>NO.{{ item.orderNo }} </text>
      <text>DATA：{{ item.ymd }} </text>
    </view>

    <uni-popup ref="popup" @change="popChange">
      <view class="info-card" v-if="result">
        <view class="card-title">
          <image class="logo" :src="result.game.allianceLogo"></image>
          {{ result.game.allianceName }}
        </view>
        <view class="info-title">
          <view class="title-item">
            <image :src="result.game.mainLogo" class="logo"></image>
            <text>{{ result.game.mainName }}</text>
          </view>
          <view class="title-mid">
            <text class="full-text"
              >{{ result.game.homeFull }} VS {{ result.game.guestFull }}</text
            >
            <text class="full-time">{{ result.game.finishTimeStr }}</text>
          </view>
          <view class="title-item">
            <image :src="result.game.guestLogo" class="logo"></image>
            <text>{{ result.game.guestName }}</text>
          </view>
        </view>
        <view class="info-main">
          <text class="main-item">
            <text class="main-item-title">{{ $t("order.wave.gameid") }}：</text>
            <text class="main-item-text">
              {{ result.betinfo.gameId }}
            </text>
          </text>
          <text class="main-item">
            <text class="main-item-title"
              >{{ $t("order.wave.gameType.title") }}：</text
            >
            <text class="main-item-text">
              {{
                result.betinfo.gameType == 1
                  ? $t("order.wave.gameType.first")
                  : $t("order.wave.gameType.full")
              }}
            </text>
          </text>
          <text class="main-item">
            <text class="main-item-title"
              >{{ $t("order.wave.statusOpen.title") }}：</text
            >
            <text v-if="result.betinfo.statusOpen == 0" class="main-item-text">
              {{ $t("order.wave.statusOpen.noPrize") }}
            </text>
            <text
              v-else-if="result.betinfo.statusOpen == 1"
              class="main-item-text"
            >
              {{ $t("order.wave.statusOpen.win") }}
            </text>
            <text v-else class="main-item-text">
              {{ $t("order.wave.statusOpen.loss") }}
            </text>
          </text>
          <text class="main-item">
            <text class="main-item-title"
              >{{ $t("order.wave.even.title") }}：</text
            >
            <text class="main-item-text">
              {{
                result.betinfo.even == 1
                  ? $t("order.wave.even.capital")
                  : $t("order.wave.even.forfeit")
              }}
            </text>
          </text>
          <text class="main-item">
            <text class="main-item-title"
              >{{ $t("order.wave.betMoney") }}：</text
            >
            <text class="main-item-text">
              {{ result.betinfo.betMoney / amountRate }}
            </text>
          </text>
          <text class="main-item">
            <text class="main-item-title"
              >{{ $t("order.wave.winAmount") }}：</text
            >
            <text class="main-item-text">
              {{ result.betinfo.winningAmount / amountRate }}
            </text>
          </text>
          <text class="main-item">
            <text class="main-item-title"
              >{{ $t("order.wave.betScore") }}：</text
            >
            <text class="main-item-text">
              {{ result.betinfo.betScore }}
            </text>
          </text>
          <text class="main-item">
            <text class="main-item-title"
              >{{ $t("order.wave.betOdds") }}：</text
            >
            <text class="main-item-text">
              {{ result.betinfo.betOdds }}
            </text>
          </text>
          <text class="main-item">
            <text class="main-item-title"
              >{{ $t("order.wave.startTime") }}：</text
            >
            <text class="main-item-text">
              {{ format(result.betinfo.startTime) }}
            </text>
          </text>
          <text class="main-item">
            <text class="main-item-title"
              >{{ $t("order.wave.settlementTime") }}：</text
            >
            <text class="main-item-text" v-if="result.betinfo.statusOpen != 0">
              {{ format(result.betinfo.settlementTime) }}
            </text>
          </text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
export default {
  name: "wave-card",
  components: {},
  props: {
    item: Object,
  },
  data() {
    return {
      result: null,
    };
  },
  computed: {},
  methods: {
    openPop() {
      this.$api.getBetInfo({ betId: this.item.id }).then((res) => {
        this.result = res.data;
      });
      this.$refs.popup.open();
    },
    popChange(e) {
      if (!e.show) {
        this.result = null;
      }
    },
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
        this.add(d) + "/" + this.add(m) + " " + this.add(h) + ":" + this.add(mm)
      );
    },
  },
  watch: {},
  mounted() {},
};
</script>
<style scoped lang="scss">
.wave-card {
  margin: 12px auto;
  padding: 4px 12px;
  min-height: 120px;
  background-color: var(--form-main-uni-easyinput__content);
  border: var(--easyinput__border);
  box-shadow: var(--shadow-bg);
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .card-title {
    margin: 0 auto;
    color: var(--foot-tab-icon-active-color);
    font-size: 16px;
    font-weight: 700;
  }

  .card-main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .main-text {
      display: flex;
      flex-direction: column;
    }

    .main-status {
      font-size: 24px;

      .progress {
        color: green;
      }

      .done {
        color: red;
      }
    }
  }

  .card-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--index-more-color);
  }

  .info-card {
    width: 300px;
    /* background: var(--form-main-uni-easyinput__content); */
    background-color: var(--mar-bg);
    border: var(--easyinput__border);
    border-radius: 12px;
    box-shadow: var(--shadow-bg);
    padding: 12px;

    .card-title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      justify-content: center;

      .logo {
        margin-right: 12px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
    }

    .info-title {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-bottom: 14px;
      margin-bottom: 14px;
      border-bottom: 1px dashed var(--body-color);
      .title-mid {
        display: flex;
        width: 33%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .full-text {
          color: var(--light-color);
          font-weight: 600;
          font-size: 22px;
          margin-bottom: 4px;
        }
        .full-time {
          width: 70%;
          text-align: center;
          white-space: normal;
          word-wrap: break-word;
          word-break: break-all;
          color: var(--time-color);
          font-size: 12px;
        }
      }

      .title-item {
        display: flex;
        width: 33%;
        flex-direction: column;
        align-items: center;
        text-align: center;
        .logo {
          height: 40px;
          width: 40px;
          border-radius: 50%;
        }
      }
    }

    .info-main {
      display: flex;
      flex-wrap: wrap;

      .main-item {
        width: 50%;
        margin-bottom: 12px;

        .main-item-title {
          color: var(--placeholder__color);
          margin-bottom: 4px;
        }
      }
    }
  }
}
</style>
