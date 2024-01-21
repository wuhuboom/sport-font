<template>
  <view class="content rebate">
    <nav-aside></nav-aside>
    <view class="rebate-main">
      <view class="rebate-title">
        <text class="title-text">{{ $t("rebate.title") }}</text>
        <uni-icons type="close" size="40" @click="$Router.back()"></uni-icons>
      </view>

      <view class="rebate-middle">
        <view class="select-box">
          <uni-data-select
            v-model="selectTime"
            :clear="false"
            :localdata="timeOptions"
            @change="changeTime"
          ></uni-data-select>
        </view>
        <!-- <text class="online" @click="goService">{{ $t("login.online") }}</text> -->
      </view>

      <view class="rebate-card">
        <view class="card-item item1">
          <view class="item-title">{{ $t("rebate.balance") }}</view>
          <view class="item-num">{{ result.balance }}</view>
        </view>
        <view class="item-group">
          <view class="card-item item2">
            <view class="item-title">{{ $t("rebate.recharge") }}</view>
            <view class="item-num">{{ result.recharge }}</view>
          </view>
          <view class="card-item item2">
            <view class="item-title">{{ $t("rebate.withdrawal") }}</view>
            <view class="item-num">{{ result.withdrawal }}</view>
          </view>
        </view>
      </view>

      <view class="rebate-card">
        <view class="card-item item1">
          <view class="item-title">{{ $t("rebate.balance") }}</view>
          <view class="item-num">{{ result.balance }}</view>
        </view>
        <view class="item-group">
          <view class="card-item item2">
            <view class="item-title">{{ $t("rebate.count") }}</view>
            <view class="item-num">{{ result.count }}</view>
          </view>
          <view class="card-item item2">
            <view class="item-title">{{ $t("rebate.new") }}</view>
            <view class="item-num">{{ result.new }}</view>
          </view>
        </view>
      </view>
      <!-- <view class="rebate-card">
        <view class="card-item item1">
          <view class="item-title">{{ $t("rebate.win") }}</view>
          <view class="item-num">{{ result.win }}</view>
        </view>
        <view class="item-group">
          <view class="card-item item2">
            <view class="item-title">{{ $t("rebate.activity") }}</view>
            <view class="item-num">{{ result.activity }}</view>
          </view>
          <view class="card-item item2">
            <view class="item-title">{{ $t("rebate.discount") }}</view>
            <view class="item-num">{{ result.discount }}</view>
          </view>
        </view>
      </view> -->
      <view class="rebate-card">
        <view class="card-item item1">
          <view class="item-title">{{ $t("rebate.betPlayer") }}</view>
          <view class="item-num">{{ result.betPlayer }}</view>
        </view>
        <view class="item-group">
          <view class="card-item item2">
            <view class="item-title">{{ $t("rebate.betBalance") }}</view>
            <view class="item-num">{{ result.betBalance }}</view>
          </view>
          <view class="card-item item2">
            <view class="item-title">{{ $t("rebate.profit") }}</view>
            <view class="item-num">{{ result.profit }}</view>
          </view>
        </view>
      </view>

      <!-- <view class="rebate-card">
        <view class="card-item item1">
          <view class="item-title">{{ $t("rebate.offline") }}</view>
          <view class="item-num">{{ result.offline }}</view>
        </view>
        <view class="item-group">
          <view class="card-item item2">
            <view class="item-title">{{ $t("rebate.aim") }}</view>
            <view class="item-num">{{ result.aim }}</view>
          </view>
          <view class="card-item item2">
            <view class="item-title">{{ $t("rebate.unaim") }}</view>
            <view class="item-num">{{ result.unaim }}</view>
          </view>
        </view>
      </view> -->
    </view>

    <uni-calendar
      ref="calendar"
      :insert="false"
      @confirm="$refs.calendar.close()"
    />
  </view>
</template>
<script>
export default {
  name: "rebate",
  components: {},
  props: {},
  data() {
    return {
      selectTime: 1,
      timeOptions: [
        {
          text: this.$t("order.time.today"),
          value: 1,
        },
        {
          text: this.$t("order.time.yesterday"),
          value: 2,
        },
        {
          text: this.$t("order.time.week"),
          value: 3,
        },
        {
          text: this.$t("order.time.ten"),
          value: 4,
        },
        {
          text: this.$t("order.time.month"),
          value: 5,
        },
      ],
      result: {
        title: 0,
        count: 0,
        new: 0,
        balance: 0,
        recharge: 0,
        withdrawal: 0,
        activity: 0,
        win: 0,
        discount: 0,
        betBalance: 0,
        betPlayer: 0,
        profit: 0,
        aim: 0,
        unaim: 0,
        offline: 0,
      },
      key: "",
    };
  },
  computed: {},
  methods: {
    async getData1(model) {
      const res = await this.$api.getTeamData(1, { key: this.key, ...model });
      this.result.activity = res.data.cumulativeActivity / this.amountRate;
      this.result.balance = res.data.totalBalance / this.amountRate;
      this.result.count = res.data.playerCount;
      this.result.new = res.data.newPlayer;
      this.key = res.data.key;
    },
    async getData2(model) {
      const res = await this.$api.getTeamData(2, { key: this.key, ...model });
      this.result.recharge = res.data.totalRecharge / this.amountRate;
      this.key = res.data.key;
    },
    async getData3(model) {
      const res = await this.$api.getTeamData(3, { key: this.key, ...model });
      this.result.withdrawal = res.data.totalWithdrawal / this.amountRate;
      this.key = res.data.key;
    },
    async getData4(model) {
      const res = await this.$api.getTeamData(4, { key: this.key, ...model });
      this.result.win = res.data.cumulativeWinning / this.amountRate;
      this.result.betBalance = res.data.totalBetBalance / this.amountRate;
      this.result.betPlayer = res.data.totalBetPlayer;
      this.result.profit = res.data.netProfit / this.amountRate;
      this.key = res.data.key;
    },
    async getData5(model) {
      const res = await this.$api.getTeamData(5, { key: this.key, ...model });
      this.result.discount = res.data.cumulativeDiscount / this.amountRate;
      this.key = res.data.key;
    },
    async getData6(model) {
      const res = await this.$api.getTeamData(6, { key: this.key, ...model });
      this.result.unaim = res.data.monthUnAim;
      this.result.aim = res.data.monthAim;
      this.key = res.data.key;
    },
    async getData7(model) {
      const res = await this.$api.getTeamData(7, { key: this.key, ...model });
      this.result.offline = res.data.playerOffline;
      this.key = res.data.key;
    },
    async getServerData(model) {
      // total 数据
      await this.getData1(model);
      await this.getData2(model);
      await this.getData3(model);
      await this.getData4(model);
      await this.getData5(model);
      await this.getData6(model);
      await this.getData7(model);
    },
    changeTime(value) {
      this.getServerData({ time: value });
    },
    goService() {
      window.location.href = this.vuex_serviceAddr;
    },
  },
  watch: {},
  onLoad() {
    this.getServerData({ time: this.selectTime });
  },
};
</script>
<style scoped lang="scss">
.rebate {
  .rebate-main {
    margin-top: 50px;
    padding: 14px;

    .rebate-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .title-text {
        font-size: 15px;
        font-weight: 700;
      }

      .uni-icons {
        color: var(--close-color) !important;
      }
    }

    .rebate-card {
      background: var(--dist-top-bg);
      color: #fff;
      border-radius: var(--card-radius);
      padding: 20px 16px;
      margin-bottom: 15px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
      display: flex;
      flex-direction: column;

      .card-item {
        padding: 0 11px;
        margin-bottom: 12px;

        .item-title {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .item-num {
          color: var(--light-color) !important;
          font-size: 20px;
          font-weight: 700;
        }
      }

      .item2 {
        width: 50%;
      }

      .item-group {
        display: flex;
      }
    }

    .rebate-middle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--dotted-bg-1);

      .select-box {
        min-width: 50%;

        &::v-deep .uni-select {
          background-color: var(--form-main-uni-easyinput__content);
          border: var(--easyinput__border) !important;
          box-shadow: var(--shadow-bg);

          .uni-select__input-text {
            color: var(--easyinput__color) !important;
          }

          .uni-select__selector {
            background-color: var(--uni-select__selector-bg);
            border: var(--uni-select__solid);
            border-radius: var(--card-radius);

            .uni-popper__arrow {
              display: none;
            }

            &::v-deep .uni-select__selector-empty {
              .uni-select__selector-item:hover {
                background: var(--uni-select__selector-item-active);
              }
            }
          }
        }
      }

      .online {
        color: var(--ui-color-dark);
      }
    }
  }
}
</style>
