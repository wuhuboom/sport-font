<template>
  <view class="bank-card">
    <text>{{ $t("deposit.recharge") }}</text>
    <uni-data-select
      class=""
      v-model="prarms.payId"
      :localdata="range"
      :clear="false"
      :emptyTips="$t('order.sport.tableMsg')"
      :placeholder="$t('deposit.selectPlaceholder')"
    ></uni-data-select>
    <text class="deposit-tit">{{ $t("deposit.deposit") }}</text>
    <uni-easyinput
      class="easy-input"
      type="number"
      :placeholder="$t('deposit.placeholderDeposit')"
      v-model="prarms.money"
    />
    <view class="deposit-money">
      <view
        class="money"
        v-for="(nums, index) in btnNums"
        :key="index"
        @click="changAmount(nums)"
        >{{ nums }}</view
      >
    </view>
    <button class="btn-submit" type="default" @click="confirm">
      {{ $t("deposit.confirmBtn") }}
    </button>
    <view class="u-line"></view>
    <view class="wt-tip"> {{ $t("deposit.illustrate") }}</view>
  </view>
</template>
<script>
export default {
  name: "bank-card",
  props: {},
  data() {
    return {
      value: 0,
      range: [],
      prarms: { money: "", payId: "" },
      btnNums: [],
    };
  },
  computed: {},
  methods: {
    init() {
      this.$api
        .rechargePre()
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].type == 1) {
              this.btnNums = res.data[i].fast.split("-");
              this.prarms.payId = res.data[i].id;
              let obj = new Object();
              obj.value = res.data[i].id;
              obj.text = res.data[i].name;
              this.range.push(obj);
            }
          }
        })
        .catch((err) => {});
    },
    confirm() {
      if (this.prarms.money === "") {
        uni.showToast({ title: this.$t("deposit.rulesMsg"), icon: "error" });
        return;
      }
      this.$api
        .recharge(this.prarms)
        .then((res) => {
          window.location.assign(res.data.UrlAddress);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changAmount(amount) {
      this.prarms.money = Number(amount) + Number(this.prarms.money);
      //this.prarms.money = amount;
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.init();
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.bank-card {
  padding: 15px;
  display: flex;
  font-size: 15px;
  flex-direction: column;
  .deposit-tit {
    margin-top: 20px;
    font-size: 16px;
  }
  .easy-input {
    margin-top: 10px;
  }
  .deposit-money {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    .money {
      height: 40px;
      padding: 0 5px;
      cursor: pointer;
      color: var(--navbar-color);
      width: calc(22% - 10px);
      line-height: 40px;
      text-align: center;
      border-radius: var(--card-radius);
      background: var(--quk-btn-bg);
      margin: 10px 10px 0 0 !important;
    }
  }
  .btn-submit {
    margin-top: 26px;
    color: #fff !important;
    background: linear-gradient(var(--btn-submit-bg-1), var(--btn-submit-bg-2));
    box-shadow: var(--btn--submit--shadow) !important;
    border-radius: var(--card-radius) !important;
    width: 100%;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
  }
  .u-line {
    margin: 20px 0px;
    border-bottom-width: 1px;
    border-bottom-style: dashed;
    width: 100%;
    border-color: var(--u-line-bg);
  }
  .wt-tip {
    line-height: 1.6;
    font-size: 12px;
    color: var(--text-gray-color);
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
  &::v-deep .uni-easyinput__content {
    border-radius: var(--card-radius) !important;
    background-color: var(--form-main-uni-easyinput__content) !important;
    color: var(--navbar-color) !important;
    border: var(--easyinput__border) !important;
    box-shadow: var(--shadow-bg);
    height: 50px;
    padding: 0 15px 0 10px;
  }
}
</style>
