<template>
  <view class="game-card">
    <view class="card-title">{{ $t("order.game.date") }}：{{ item.date }}</view>
    <view class="card-item">
      <text class="sub-item"
        >{{ $t("order.game.recharge") }}：{{ item.recharge / amountRate }}</text
      >
      <text class="sub-item"
        >{{ $t("order.game.withdrawal") }}：{{
          item.withdrawal / amountRate
        }}</text
      >
    </view>
    <view class="card-item">
      <text class="sub-item"
        >{{ $t("order.game.bet") }}：{{ item.bet / amountRate }}</text
      >
      <text class="sub-item"
        >{{ $t("order.game.rebate") }}：{{ item.rebate / amountRate }}</text
      >
      <!-- <text class="sub-item">{{$t("order.game.bingo")}}：{{item.bingo / amountRate}}</text> -->
    </view>
    <view class="card-item">
      <!-- <text class="sub-item">{{$t("order.game.activity")}}：{{item.activity / amountRate}}</text> -->
    </view>
  </view>
</template>
<script>
export default {
  name: "game-card",
  components: {},
  props: {
    item: Object,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
  onLoad() {},
};
</script>
<style scoped lang="scss">
.game-card {
  margin: 10px 0;
  padding: 12px;
  background-color: var(--form-main-uni-easyinput__content);
  box-shadow: var(--shadow-bg);
  border-radius: 12px;
  .card-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--foot-tab-icon-active-color);
  }
  .card-item {
    .sub-item {
      display: inline-block;
      width: 50%;
    }
  }
}
</style>
