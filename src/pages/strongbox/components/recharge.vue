<template>
  <view class="recharge">
    <view class="top"></view>
    <view class="body">
      <view class="body-amount">
        <p class="font-css-lb">{{ $t("strongBox.rechargePopup.amount") }}</p>
        <uni-easyinput
          class="amount-input"
          :inputBorder="false"
          :clearable="false"
          maxlength="9"
          type="number"
          v-model="data.money"
          @input="getArAmount"
          @blur="getArAmount"
        ></uni-easyinput>
        <image
          class="amount-img"
          src="/static/images/strongRecharge/divider.png"
        />
      </view>
      <view class="body-rate">
        <p class="font-css-lb">{{ $t("strongBox.rechargePopup.rate") }}</p>
        <p class="font-css-in">{{ rate }}</p>
      </view>
      <view>
        <p class="font-css-lb">{{ $t("strongBox.rechargePopup.arAmount") }}</p>
        <p class="font-css-in">{{ arAmount }}</p>
      </view>
      <view @click="confirmRecharge">
        <p class="body-confirm">
          {{ $t("strongBox.rechargePopup.bottonLabel") }}
        </p>
      </view>
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
    this.rechargePre();
  },
};
</script>

<style scoped lang="scss">
.recharge {
  width: 86vw;
  height: 40vh;
  .top {
    border-radius: 20px 20px 0 0;
    background-color: rgb(42, 29, 105);
    height: 4vh;
  }
  .body {
    height: 37vh;
    border-radius: 0 0 20px 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    .body-amount {
      .amount-input {
        margin: auto;
        width: 60%;
        text-align: center;
        height: 20px;
        font-size: 14px;
        font-family: "Century Gothic";
        color: #8d8d8d;
      }
      .amount-img {
        width: 50%;
        height: 2px;
      }
    }
    .body-confirm {
      margin: auto;
      width: 105px;
      height: 35px;
      line-height: 35px;
      border-radius: 20px;
      color: #fff;
      letter-spacing: 1px;
      font-size: 16px;
      font-family: "Century Gothic Bold";
      background-color: rgb(42, 29, 105);
    }
  }
  .font-css-lb {
    font-size: 14px;
    font-family: "Century Gothic Bold";
    color: #2a1d69;
  }
  .font-css-in {
    font-size: 12px;
    font-family: "Century Gothic";
    color: #8d8d8d;
  }
}
.bg {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
