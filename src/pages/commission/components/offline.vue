<template>
  <view class="offline">
    <view class="select-box">
      <uni-data-select
        v-model="selectTime"
        :clear="false"
        :localdata="timeOptions"
        @change="changeTime"
      ></uni-data-select>
    </view>

    <uni-table :stripe="false" align="center" emptyText=" ">
      <uni-tr class="table-title">
        <uni-th align="center" class="u-th">{{
          $t("commission.offline.username")
        }}</uni-th>
        <uni-th align="center" class="u-th">{{
          $t("commission.offline.balance")
        }}</uni-th>
        <uni-th align="center" class="u-th">{{
          $t("commission.offline.betday")
        }}</uni-th>
        <uni-th align="center" class="u-th">{{
          $t("commission.offline.time")
        }}</uni-th>
      </uni-tr>

      <uni-tr v-for="(item, index) in result" :key="index">
        <uni-td align="center">{{ item.username }}</uni-td>
        <uni-td align="center">{{ item.balance / amountRate }}</uni-td>
        <uni-td align="center">{{ item.betDaysString }}</uni-td>
        <uni-td align="center">{{ format(item.createdAt) }}</uni-td>
      </uni-tr>
    </uni-table>
    <view class="uni-pagination-box"
      ><uni-pagination
        show-icon
        :page-size="pageSize"
        :current="pageNo"
        :total="totalCount"
        @change="change"
    /></view>
  </view>
</template>
<script>
export default {
  name: "offline",
  components: {},
  props: {},
  data() {
    return {
      selectTime: "1",
      timeOptions: [
        {
          text: this.$t("order.time.today"),
          value: "1",
        },
        {
          text: this.$t("order.time.yesterday"),
          value: "2",
        },
        {
          text: this.$t("order.time.week"),
          value: "3",
        },
        {
          text: this.$t("order.time.ten"),
          value: "4",
        },
        {
          text: this.$t("order.time.month"),
          value: "5",
        },
      ],
      pageSize: 8,
      pageNo: 1,
      result: null,
      totalCount: 0,
    };
  },
  computed: {},
  methods: {
    getListData(model) {
      this.$api
        .inactiveList({ ...model, pageSize: this.pageSize })
        .then((res) => {
          this.pageNo = res.data.pageNo;
          this.totalCount = res.data.totalCount;
          this.result = res.data.results;
        });
    },
    change(e) {
      this.getListData({ time: this.selectTime, pageNo: e.current });
    },
    changeTime(value) {
      this.getListData({ time: value });
    },
    add(m) {
      return m < 10 ? "0" + m : m;
    },
    format(times) {
      //times是整数，否则要parseInt转换
      var time = new Date(times);
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        this.add(m) + "/" + this.add(d) + " " + this.add(h) + ":" + this.add(mm)
      );
    },
  },
  watch: {},
  mounted() {
    this.getListData({ time: this.selectTime });
  },
};
</script>
<style scoped lang="scss">
.offline {
  overflow-y: hidden;
  .select-box {
    min-width: 48%;

    &::v-deep .uni-select {
      background-color: var(--form-main-uni-easyinput__content);
      border: var(--easyinput__border) !important;
      box-shadow: var(--shadow-bg);
      height: 50px;

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
</style>
