<template>
  <view class="content strongTransfer bg">
    <view class="strongTransfer-main">
      <view class="top-title">
        <uni-icons
          class="title-icon"
          type="back"
          size="30"
          @click="$Router.back()"
        ></uni-icons>
        <text class="title-font">{{ $t("strongBox.recharge") }}</text>
        <text class="top-t"></text>
      </view>
    </view>
    <view class="from">
      <uni-forms label-position="top" ref="form" :modelValue="data">
        <uni-forms-item
          :label="$t('strongBox.rechargePopup.amount')"
          name="money"
        >
          <uni-easyinput
            type="number"
            v-model="data.money"
            @input="getArAmount"
            @blur="getArAmount"
            class="easy-inp"
            :placeholder="$t('strongBox.rechargePopup.amountMsg')"
          />
          <view class="amount"
            >{{ $t("strongBox.rechargePopup.rate") }}：<text class="amount-s">{{
              rate
            }}</text></view
          >
        </uni-forms-item>
        <uni-forms-item
          v-model="data.payPwd"
          :label="$t('strongBox.rechargePopup.arAmount')"
        >
          <uni-easyinput
            type="number"
            class="easy-inp"
            v-model="arAmount"
            :disabled="true"
          />
        </uni-forms-item>
      </uni-forms>
      <button class="btn" type="default" @click="confirmRecharge">
        {{ $t("transfer.buttonlabel") }}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  name: "recharge",
  data() {
    return {
      data: { money: "", payId: "" },
      rate: "",
      arAmount: 0,
    };
  },
  methods: {
    rechargePre() {
      this.$api.safeRechargePre().then((res) => {
        this.data.payId = res.data.id;
        this.rate = res.data.rate;
      });
    },
    getArAmount() {
      if (this.data.money == "") {
        this.arAmount = 0;
      } else {
        this.arAmount = this.data.money * this.rate;
      }
    },
    confirmRecharge() {
      if (this.data.money == "" || this.data.money < "1") {
        uni.showToast({
          title: this.$t("strongBox.rechargePopup.amountMsg"),
          icon: "error",
        });
      } else {
        this.$api
          .safeRecharge(this.data)
          .then((res) => {
            window.location.href = res.data.UrlAddress;
          })
          .catch((error) => {
            const errorMsg = error.data[0].msgKey;
            if (errorMsg == "payMoneyTooMinOrMax") {
              uni.showToast({
                title: this.$t("strongBox.rechargePopup.payMoneyTooMinOrMax"),
                icon: "error",
              });
            } else if (errorMsg == "payTypeDisabled") {
              uni.showToast({
                title: this.$t("strongBox.rechargePopup.payTypeDisabled"),
                icon: "error",
              });
            } else if (errorMsg == "payFrequently") {
              uni.showToast({
                title: this.$t("strongBox.rechargePopup.payFrequently"),
                icon: "error",
              });
            } else if (errorMsg == "rechargeUrlError") {
              uni.showToast({
                title: this.$t("strongBox.rechargePopup.rechargeUrlError"),
                icon: "error",
              });
            } else {
              uni.showToast({
                title: this.$t("strongBox.rechargePopup.unknownMsg"),
                icon: "error",
              });
            }
          });
      }
    },
  },
  mounted() {
    this.$refs.form.setRules(this.rules);
    this.rechargePre();
  },
};
</script>

<style scoped lang="scss">
.strongTransfer {
  .strongTransfer-main {
    padding: 10px;
    background: var(--mar-bg);
    position: relative;
    .top-title {
      display: flex;
      justify-content: space-between;
      text-align: center;
      align-items: center;
      .title-font {
        font-size: 18px;
        font-weight: 700;
        color: var(--page-title-color);
      }
      .title-icon {
        color: var(--close-color) !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .top-t {
        width: 10%;
      }
    }
    .bottom-btns {
      align-items: center;
      margin: 15px 0 10px 0;
      .btn {
        display: inline-block;
        padding: 0 31px;
        border-radius: var(--tab-radius);
        width: auto;
        font-size: 15px;
        height: 36px;
        line-height: 36px;
      }
    }
  }
  .from {
    width: 90%;
    margin: auto;
    overflow: auto;
    padding: 20px 0;
    .amount {
      margin-top: 10px;
      .amount-s {
        font-size: 14px;
        color: var(--index-more-color);
      }
    }
  }
  .btn {
    width: 100%;
    border-radius: var(--card-radius);
    margin: 50px 0;
    color: #fff !important;
    background: var(--gradient-color) !important;
  }
  &::v-deep .uni-forms-item__label {
    width: auto !important;
    color: var(--easyinput__color);
    font-size: 14px;
    letter-spacing: 2px;
  }
  &::v-deep .uni-easyinput__content {
    background-color: var(--form-main-uni-easyinput__content) !important;
    border: var(--easyinput__border) !important;
    box-shadow: var(--shadow-bg);
    border-radius: var(--card-radius) !important;
    height: 50px;
    padding: 0 15px 0 10px;
    color: var(--easyinput__color);
  }
  &::v-deep .uni-select__input-text {
    font-size: 15px !important;
    color: var(--navbar-color);
  }
}
.bg {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
