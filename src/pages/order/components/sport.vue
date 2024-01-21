<template>
  <view class="sport">
    <!--    <view class="filter">
      <view class="calendar-btn" @click="$refs.calendar.open()">
        <uni-icons custom-prefix="iconfont" type="icon-rili" size="16">
        </uni-icons>
        <text>Select date</text>
      </view>
    </view> -->

    <view class="main">
      <no-data v-if="!result"></no-data>
      <view v-else>
        <view class="total-card" v-if="totalResult">
          <view class="total-item">
            <text class="total-text"
              >{{ $t("order.sport.total.total") }}：</text
            >
            <text class="total-value">{{
              totalResult.total / amountRate
            }}</text>
          </view>
          <view class="total-item">
            <text class="total-text"
              >{{ $t("order.sport.total.today") }}：</text
            >
            <text class="total-value">{{
              totalResult.today / amountRate
            }}</text>
          </view>
          <view class="total-item">
            <text class="total-text">{{ $t("order.sport.total.week") }}：</text>
            <text class="total-value">{{ totalResult.week / amountRate }}</text>
          </view>
          <view class="total-item">
            <text class="total-text">{{ $t("order.sport.total.last") }}：</text>
            <text class="total-value">{{
              totalResult.lastWeek / amountRate
            }}</text>
          </view>
        </view>
        <view class="table-card card-reset">
          <uni-table
            :stripe="false"
            align="center"
            :emptyText="$t('order.sport.tableMsg')"
          >
            <uni-tr class="table-title">
              <!-- <uni-th align="center" class="u-th">{{
                $t("order.sport.playerId")
              }}</uni-th> -->
              <uni-th align="center" class="u-th">{{
                $t("order.sport.money")
              }}</uni-th>
              <uni-th align="center" class="u-th">{{
                $t("order.sport.type.header")
              }}</uni-th>
              <uni-th align="center" class="u-th">{{
                $t("order.sport.date")
              }}</uni-th>
            </uni-tr>

            <uni-tr v-for="(item, index) in result" :key="index">
              <!-- <uni-td align="center">{{ item.playerId }}</uni-td> -->
              <uni-td align="center">{{ item.money / amountRate }}</uni-td>
              <uni-td align="center">{{ $t("order.sport.type.text") }}</uni-td>
              <uni-td align="center">{{ item.ymd }}</uni-td>
            </uni-tr>
          </uni-table>
          <view class="uni-pagination-box"
            ><uni-pagination
              show-icon
              :page-size="pageSize"
              :current="pageNo"
              :total="totalPage * pageSize"
              @change="change"
          /></view>
        </view>
      </view>
    </view>

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
  name: "sport",
  components: {},
  props: {},
  data() {
    return {
      result: null,
      pageNo: 1,
      pageSize: 10,
      totalPage: null,
      totalResult: null,
    };
  },
  computed: {},
  methods: {
    getListData(model) {
      this.$api
        .getRebateList({ ...model, pageSize: this.pageSize })
        .then((res) => {
          this.pageNo = res.data.pageNo;
          this.totalPage = res.data.totalPage;
          this.result = res.data.results;
        });
    },
    getStatusData() {
      this.$api.getRebateStatis().then((res) => {
        this.totalResult = res.data;
      });
    },
    change(e) {
      this.getListData({ pageNo: e.current });
    },
  },
  watch: {},
  mounted() {
    this.getListData();
    this.getStatusData();
  },
};
</script>
<style scoped lang="scss">
.sport {
  padding: 14px;

  .filter {
    display: flex;
    height: 50px;
    align-items: center;

    .calendar-btn {
      width: 100%;
      padding: 0 8px;
      height: 50px;
      background-color: var(--form-main-uni-easyinput__content);
      border: var(--easyinput__border) !important;
      box-shadow: var(--shadow-bg);
      border-radius: var(--card-radius) !important;
      color: var(--easyinput__color) !important;
      line-height: 50px;
      margin-right: 10px;

      .uni-icons {
        color: var(--easyinput__color) !important;
        margin-right: 8px;
      }
    }
  }

  .main {
    .table-card {
      overflow-y: hidden;

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
        width: 25%;
      }

      .uni-pagination-box {
        margin-bottom: 12px;
      }
    }

    .total-card {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .total-item {
        width: 40%;
        display: flex;
        flex-direction: column;
        padding: 6px;
        border-radius: 8px;
        background: var(--inv-card-bg-3);
        background-size: cover;
        margin-bottom: 12px;

        .total-text {
          font-size: 14px;
          word-break: break-all;
          line-height: 1.2;
          margin-bottom: 5px;
        }

        .total-value {
          margin-top: 4px;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
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
}
</style>
