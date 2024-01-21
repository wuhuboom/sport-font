<template>
  <view class="content partners">
    <nav-aside></nav-aside>
    <view class="topbar"></view>
    <view class="main">
      <uni-card class="fan-card card-reset">
        <template #title>
          <view class="u-card-title">
            <view class="u-title-left">
              <text>{{ $t("partners.hello") }}</text>
              <text>{{ $t("partners.leader") }}</text>
            </view>
            <text class="gren-text">{{ vuex_user.username }}</text>
          </view>
        </template>
        <view class="u-card-content">
          <view class="content-titel">
            <text>{{ $t("partners.total.title") }}</text>
            <uni-icons
              class="gren-text"
              custom-prefix="iconfont"
              type="icon-wendang"
              size="20"
              @click="$Router.push('/rebate')"
            ></uni-icons>
          </view>
          <view class="content-main">
            <view class="main-item">
              <text class="item-title">{{
                $t("partners.total.recharge")
              }}</text>
              <text class="gren-text">{{ total.recharge / amountRate }}</text>
            </view>
            <view class="main-item">
              <text class="item-title">{{
                $t("partners.total.withdrawal")
              }}</text>
              <text class="gren-text">{{ total.withdrawal / amountRate }}</text>
            </view>
            <view class="main-item">
              <text class="item-title">{{
                $t("partners.total.cumulative")
              }}</text>
              <text class="gren-text">{{ total.cumulative }}</text>
            </view>
          </view>
          <uni-row class="content-item" :gutter="6">
            <uni-col class="item-col" :span="8">
              <view class="item-card card-1">
                <text class="item-card-title">{{
                  $t("partners.total.balance")
                }}</text>
                <text class="item-card-num">{{
                  total.balance / amountRate
                }}</text>
              </view>
            </uni-col>
            <uni-col class="item-col" :span="8">
              <view class="item-card card-2">
                <text class="item-card-title">{{
                  $t("partners.total.player")
                }}</text>
                <text class="item-card-num">{{ total.player }}</text>
              </view>
            </uni-col>
            <uni-col class="item-col" :span="8">
              <view class="item-card card-3">
                <text class="item-card-title">{{
                  $t("partners.total.profit")
                }}</text>
                <text class="item-card-num">{{ total.profit }}</text>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </uni-card>
      <!-- <view class="calendar-btn" @click="$refs.calendar.open()">
        <text>Select date</text>
        <uni-icons
          class="calendar-icon"
          custom-prefix="iconfont"
          type="icon-rili"
          size="16"
        >
        </uni-icons>
      </view> -->

      <view class="select-box">
        <!-- <uni-data-select
          v-model="selectTime"
          :clear="false"
          :localdata="timeOptions"
          @change="changeTime"
        ></uni-data-select> -->
        <view
          :class="selectTime == 1 ? 'select-active' : 'select-time'"
          @click="changeTime(1)"
          >{{ $t("order.time.today") }}</view
        >
        <view
          :class="selectTime == 3 ? 'select-active' : 'select-time'"
          style="margin-left: 13px"
          @click="changeTime(3)"
          >{{ $t("order.time.week") }}</view
        >
        <view
          :class="selectTime == 4 ? 'select-active' : 'select-time'"
          style="margin-left: 13px"
          @click="changeTime(4)"
          >{{ $t("order.time.ten") }}</view
        >
      </view>

      <view class="u-cus-row">
        <view class="u-cus-left">{{ $t("partners.statis.title") }}</view>
        <view class="u-cus-right" @click="$Router.push('/team')">{{
          $t("partners.NotUp")
        }}</view>
      </view>

      <view class="team-card card-reset">
        <view class="team-tag">
          <view class="tag-row">
            <view class="tag-line line1"></view>
            <view class="tag-label label1">
              {{ $t("partners.statis.aim") }} {{ total.aim }}
              <!-- {{ $t("partners.statis.player") }} -->
            </view>
          </view>
          <!-- <view class="tag-row">
            <view class="tag-line line2"></view>
            <view class="tag-label label2">
              {{ $t("partners.statis.unaim") }} {{ total.unaim }}
              {{ $t("partners.statis.player") }}
            </view>
          </view> -->
          <view class="tag-row" style="margin-top: 15px">
            <view class="tag-line line3"></view>
            <view class="tag-label label3">
              {{ $t("partners.statis.offline") }} {{ total.offline }}
              <!-- {{ $t("partners.statis.player") }} -->
            </view>
          </view>
        </view>
        <view class="charts-box">
          <qiun-data-charts type="pie" :opts="opts" :chartData="chartData" />
        </view>
      </view>

      <view class="u-cus-row">
        <view class="u-cus-left">{{ $t("partners.sub.title") }}</view>
        <view class="u-cus-right" @click="$Router.push('/commission')">{{
          $t("partners.all")
        }}</view>
      </view>

      <view class="table-card card-reset">
        <uni-table :stripe="false" align="center" emptyText=" ">
          <!-- 表头行 -->
          <uni-tr class="table-title">
            <uni-th align="center" class="u-th">{{
              $t("partners.sub.id")
            }}</uni-th>
            <uni-th align="center" class="u-th">{{
              $t("partners.sub.username")
            }}</uni-th>
            <uni-th align="center" class="u-th">{{
              $t("partners.sub.time")
            }}</uni-th>
          </uni-tr>
          <!-- 表格数据行 -->

          <uni-tr v-for="(item, index) in subList" :key="index">
            <uni-td align="center">{{ item.id }}</uni-td>
            <uni-td align="center">{{ item.username }}</uni-td>
            <uni-td align="center">{{ format(item.theNewLoginTime) }}</uni-td>
          </uni-tr>
        </uni-table>
      </view>
    </view>

    <view class="bottom-bar"></view>
    <u-tabbar></u-tabbar>
    <!-- <uni-calendar
      ref="calendar"
      :range="true"
      :insert="false"
      @confirm="$refs.calendar.close()"
    /> -->
  </view>
</template>
<script>
export default {
  name: "partners",
  components: {},
  props: {},
  data() {
    return {
      chartData: { series: [{ data: [] }] },
      //您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#e67817", "#0b4de6"],
        enableScroll: false,
        /* legend: { show: false }, */
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF",
          },
        },
      },
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
      subList: [],
      total: {
        recharge: 0,
        withdrawal: 0,
        cumulative: 0,
        balance: 0,
        player: 0,
        profit: 0,
        unaim: 0,
        aim: 0,
        offline: 0,
      },
    };
  },
  computed: {},
  methods: {
    async getData1(model) {
      const res = await this.$api.getTeamData(1, { key: this.key, ...model });
      this.key = res.data.key;
    },
    async getData2(model) {
      const res = await this.$api.getTeamData(2, { key: this.key, ...model });
      this.total.recharge = res.data.totalRecharge;
      this.key = res.data.key;
    },
    async getData3(model) {
      const res = await this.$api.getTeamData(3, { key: this.key, ...model });
      this.total.withdrawal = res.data.totalWithdrawal;
      this.key = res.data.key;
    },
    async getData4(model) {
      const res = await this.$api.getTeamData(4, { key: this.key, ...model });
      this.total.cumulative = res.data.cumulativeWinning;
      this.total.balance = res.data.totalBetBalance;
      this.total.player = res.data.totalBetPlayer;
      this.total.profit = res.data.netProfit;
      this.key = res.data.key;
    },
    async getData5(model) {
      const res = await this.$api.getTeamData(5, { key: this.key, ...model });
      this.key = res.data.key;
    },
    async getData6(model) {
      const res = await this.$api.getTeamData(6, { key: this.key, ...model });
      this.total.unaim = res.data.monthUnAim;

      //let cartdata1 = 0;
      let cartdata2 = 0;
      // if (!res.data.unaim == "undefined" || !res.data.unaim == "") {
      //   cartdata1 = res.data.monthUnAim;
      // }
      // this.chartData.series[0].data.push({
      //   name: this.$t("partners.statis.unaim"),
      //   value: cartdata1,
      //   labelShow: false,
      // });
      if (!res.data.monthAim == "undefined" || !res.data.monthAim == "") {
        cartdata2 = res.data.monthAim;
        this.total.aim = res.data.monthAim;
      }
      this.chartData.series[0].data.push({
        name: this.$t("partners.statis.aim"),
        value: cartdata2,
        labelShow: false,
      });
      this.key = res.data.key;
    },
    async getData7(model) {
      const res = await this.$api.getTeamData(7, { key: this.key, ...model });

      let cartdata = 0;
      if (
        !res.data.playerOffline == "undefined" ||
        !res.data.playerOffline == ""
      ) {
        const cartdata = res.data.playerOffline;
        this.total.offline = res.data.playerOffline;
      }
      this.chartData.series[0].data.push({
        name: this.$t("partners.statis.offline"),
        value: cartdata,
        labelShow: false,
      });
    },
    async getsub() {
      const res = await this.$api.subPlayer();
      this.subList = res.data.results;
    },
    async getServerData(model) {
      this.chartData.series[0].data = [];
      // total 数据
      await this.getData1(model);
      await this.getData2(model);
      await this.getData3(model);
      await this.getData4(model);
      await this.getData5(model);
      await this.getData6(model);
      await this.getData7(model);
      await this.getsub();
    },
    changeTime(value) {
      this.selectTime = value;
      this.getServerData({ time: value });
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
  onReady() {
    this.getServerData({ time: this.selectTime });
  },
  onLoad() {},
};
</script>
<style scoped lang="scss">
.partners {
  .topbar {
    height: 60px;
  }

  .main {
    padding: 0px 16px !important;

    .fan-card {
      .u-card-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dotted var(--dotted-bg-1);
        padding: 16px 0;

        .u-title-left {
          display: flex;
          flex-direction: column;
        }
      }

      .u-card-content {
        color: var(--body-color);

        .content-titel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .content-main {
          display: flex;
          align-items: center;

          .main-item {
            width: 50%;
            display: flex;
            flex-direction: column;

            .item-title {
              color: var(--text-gray-color);
            }
          }
        }

        .content-item {
          .item-col {
            padding-left: 3px !important;
            padding-right: 3px !important;
            height: 75px;
          }

          .item-card {
            border-radius: var(--card-radius);
            padding: 10px;
            display: flex;
            flex-direction: column;

            .item-card-title {
              font-size: 12px;
              word-break: break-all;
              line-height: 1.2;
              margin-bottom: 5px;
            }

            .item-card-num {
              margin-top: 2px;
              font-size: 8px;
              font-weight: 700;
            }
          }

          .card-1 {
            background: var(--inv-card-bg-1);
            background-size: cover;
          }

          .card-2 {
            background: var(--inv-card-bg-2);
            background-size: cover;
          }

          .card-3 {
            background: var(--inv-card-bg-3);
            background-size: cover;
          }
        }
      }
    }

    .select-box {
      min-width: 48%;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: flex-start;
      .select-time {
        font-size: 12px;
        padding: 10px;
        border-radius: var(--card-radius);
        background: var(--card-style);
        border: var(--fan-card-border);
      }
      .select-active {
        color: #000;
        background: rgb(255, 170, 0);
        font-size: 12px;
        padding: 10px;
        border-radius: var(--card-radius);
      }

      // &::v-deep .uni-select {
      //   background-color: var(--form-main-uni-easyinput__content);
      //   border: var(--easyinput__border) !important;
      //   box-shadow: var(--shadow-bg);
      //   height: 50px;

      //   .uni-select__input-text {
      //     color: var(--easyinput__color) !important;
      //   }

      //   .uni-select__selector {
      //     background-color: var(--uni-select__selector-bg);
      //     border: var(--uni-select__solid);
      //     border-radius: var(--card-radius);

      //     .uni-popper__arrow {
      //       display: none;
      //     }

      //     &::v-deep .uni-select__selector-empty {
      //       .uni-select__selector-item:hover {
      //         background: var(--uni-select__selector-item-active);
      //       }
      //     }
      //   }
      // }
    }

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

    .u-cus-row {
      display: flex;
      justify-content: space-between;
      margin: 12px 0;

      .u-cus-left {
        font-size: 15px;
        font-weight: 700;
      }

      .u-cus-right {
        color: var(--blue-color);
      }
    }

    .team-card {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      min-height: 180px;
      .team-tag {
        .tag-row {
          .line1 {
            background: var(--team-lv-color1);
          }

          .line2 {
            background: var(--team-lv-color2);
          }

          .line3 {
            background: var(--team-lv-color3);
          }

          .label1 {
            width: 50%;
            font-size: 14px;
            background: linear-gradient(
              90deg,
              var(--team-lv-color1) 10%,
              rgba(26, 234, 203, 0)
            );
          }

          .label2 {
            background: linear-gradient(
              90deg,
              var(--team-lv-color2) 10%,
              rgba(26, 234, 203, 0)
            );
          }

          .label3 {
            width: 50%;
            font-size: 14px;
            background: linear-gradient(
              90deg,
              var(--team-lv-color3) 10%,
              rgba(26, 234, 203, 0)
            );
          }

          .tag-line {
            width: 36px;
            height: 2px;
            margin-bottom: 5px;
          }

          .tag-label {
            border-radius: 3px;
            display: inline-flex;
            padding: 3px 10px;
            margin-bottom: 5px;
          }
        }
      }
    }

    .table-card {
      max-height: 200px;
      overflow-y: scroll;

      .table-title {
        color: var(--body-color) !important;
        border: 0 !important;
        font-size: 15px !important;
        background: var(--table-top-color);
        padding: 18px 10px !important;
      }

      &::v-deep .uni-table {
        min-width: 100% !important;
        background-color: var(--card-style) !important;

        .uni-table-th {
          color: var(--body-color) !important;
          border: 0 !important;
          font-size: 15px !important;
          background: var(--table-top-color);
          padding: 18px 10px !important;
        }

        .uni-table-td {
          color: var(--body-color) !important;
          border: 0 !important;
          font-size: 14px !important;
          font-weight: 400;
          padding: 8px 10px !important;
        }
      }

      .u-th {
        width: 18%;
      }
    }
  }

  .bottom-bar {
    height: 30px;
  }

  .card-reset {
    margin: 15px 0 !important;
    color: var(--body-color);
    border-radius: var(--card-radius);
    background: var(--card-style);
    box-shadow: var(--card-shadow);
    border: var(--fan-card-border);
  }

  .gren-text {
    color: var(--light-color) !important;
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

  .charts-box {
    position: absolute;
    right: 0;
    width: 240px;
    height: 160px;
  }
}
</style>
