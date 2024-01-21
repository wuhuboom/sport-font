<template>
  <view class="player">
    <uni-table :stripe="false" align="center" emptyText=" ">
      <uni-tr class="table-title">
        <uni-th align="center" class="u-th">{{ $t("commission.sub.id") }}</uni-th>
        <uni-th align="center" class="u-th">{{ $t("commission.sub.username") }}</uni-th>
        <uni-th align="center" class="u-th">{{ $t("commission.sub.betDay") }}</uni-th>
      </uni-tr>

      <uni-tr v-for="(item, index) in result" :key="index">
        <uni-td align="center">{{ item.id }}</uni-td>
        <uni-td align="center">{{ item.username }}</uni-td>
        <uni-td align="center">{{ item.betDaysString }}</uni-td>
      </uni-tr>
    </uni-table>
    <view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageNo" :total="totalCount"
        @change="change" /></view>
  </view>
</template>
<script>
export default {
  name: "player",
  components: {},
  props: {},
  data() {
    return {
      result: null,
      pageSize: 14,
      pageNo: 1,
      totalCount: 0,
    }
  },
  computed: {},
  methods: {
    getListData(model) {
      this.$api.subPlayer({ ...model, pageSize: this.pageSize }).then(res => {
        this.pageNo = res.data.pageNo;
        this.totalCount = res.data.totalCount
        this.result = res.data.results
      })
    },
    change(e) {
      this.getListData({ pageNo: e.current })
    }
  },
  watch: {},
  mounted() {
    this.getListData()
  },
}
</script>
<style scoped lang="scss">
.player {
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
    width: 18%;
  }
}
</style>
