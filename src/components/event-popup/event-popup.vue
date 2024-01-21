<template>
  <view class="event-popup">
    <view class="title-top">
      <view class="event-title">{{ $t("eventPopup.title") }}</view>
      <uni-icons
        class="title-icon"
        type="close"
        size="40"
        @click="closePopup"
      ></uni-icons>
    </view>
    <view class="event-card">
      <view class="event-card-top">{{ betPre.allianceName }}</view>
      <view class="event-card-mid">
        <view class="country-view">
          <image class="imgCalss" :src="betPre.mainLogo" mode="scaleToFill" />
        </view>
        <view class="event-content-odds">{{ betPre.antiPerCent }}%</view>
        <view class="country-view">
          <image class="imgCalss" :src="betPre.guestLogo" mode="scaleToFill" />
        </view>
      </view>
      <view class="event-card-bottom">
        <view class="country-name"
          ><view class="country-text">{{ betPre.mainName }}</view></view
        >
        <!-- {{ betPre.mainName }} -->
        <view class="country-vs">VS</view>
        <view class="country-name1"
          ><view class="country-text">{{ betPre.guestName }}</view></view
        >
      </view>
    </view>
    <view class="event-amount">
      <text>{{ $t("eventPopup.amount") }}</text>
      <text>{{ $t("eventPopup.profit") }}</text>
    </view>
    <view class="event-amount-input">
      <view class="amount-input">
        <uni-easyinput
          type="number"
          :placeholder="$t('eventPopup.pleaseEnter')"
          v-model="amount"
          :value="amount"
          :clearable="false"
          @input="setShouYi"
          @blur="setShouYi"
        />
      </view>
      <uni-easyinput
        style="margin-left: 10px"
        type="text"
        disabled
        :value="shouyi"
      />
    </view>

    <view class="event-gain-text">
      <view class="event-gain-text-val"
        ><text>{{ $t("eventPopup.profits") }}</text>
        <text class="text1" style="margin-left: 20px">{{
          betPre.antiPerCent + "%"
        }}</text></view
      >
      <view class="event-gain-text-val">
        <text class="text2">{{ $t("eventPopup.vipfit") }}</text>
        <text class="text3">{{ eventBet.bonus + "%" }}</text>
      </view>
    </view>
    <view class="event-gain">
      <text>{{ $t("eventPopup.serviceFee") }}</text>
    </view>
    <view class="event-gain-input">
      <uni-easyinput
        type="number"
        :value="eventBet.betHandMoneyRate"
        disabled
      />
    </view>

    <view class="event-btn-group">
      <button
        class="amount-btn"
        type="default"
        plain="true"
        @click="changAmount(btnNum[0])"
      >
        {{ btnNum[0] }}
      </button>
      <button
        class="amount-btn"
        type="default"
        plain="true"
        @click="changAmount(btnNum[1])"
      >
        {{ btnNum[1] }}
      </button>
      <button
        class="amount-btn"
        type="default"
        plain="true"
        @click="changAmount(btnNum[2])"
      >
        {{ btnNum[2] }}
      </button>
      <button
        class="amount-btn"
        type="default"
        plain="true"
        @click="changAllAmount(eventBet.balance)"
      >
        {{ $t("eventPopup.btnAll") }}
      </button>
      <view class="amount-icon" @click="$refs.steAmountNum.open()">
        <uni-icons class="compose-icon" type="compose" size="16"></uni-icons>
      </view>
    </view>
    <view class="event-balance">
      <text>{{ $t("eventPopup.balance") }}</text>
      <text>{{ eventBet.balance }}</text>
    </view>
    <view
      :class="confirmColor == 0 ? 'event-btn-confirm' : 'confirmClass'"
      @click="bet"
      >{{ $t("eventPopup.btnConfirm") }}</view
    >
    <uni-popup
      ref="steAmountNum"
      background-color="#fff"
      type="bottom"
      :is-mask-click="true"
    >
      <view class="set-amount">
        <view class="title">
          <text>{{ $t("eventPopup.setAmountTitle") }}</text>
          <uni-icons
            type="closeempty"
            size="20"
            @click="closeAmount"
          ></uni-icons>
        </view>
        <text class="font-class">{{ $t("eventPopup.firstVal") }}:</text>
        <uni-easyinput
          class="easy-inp"
          type="number"
          v-model="firstAmount"
          :value="firstAmount"
          :placeholder="$t('eventPopup.pleaseEnter')"
        />
        <text class="font-class">{{ $t("eventPopup.secondVal") }}:</text>
        <uni-easyinput
          class="easy-inp"
          type="number"
          v-model="secondAmount"
          :value="secondAmount"
          :placeholder="$t('eventPopup.pleaseEnter')"
        />
        <text class="font-class">{{ $t("eventPopup.thirdVal") }}:</text>
        <uni-easyinput
          class="easy-inp"
          type="number"
          v-model="thirdAmount"
          :value="thirdAmount"
          :placeholder="$t('eventPopup.pleaseEnter')"
        />
        <view class="btn-class">
          <button class="btn btn-left" type="default" @click="closeAmount">
            {{ $t("eventPopup.btnCancel") }}
          </button>
          <button class="btn btn-right" type="default" @click="confirm">
            {{ $t("eventPopup.setBtnConfirm") }}
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
export default {
  name: "event-popup",
  components: {},
  props: ["betPre"],
  data() {
    return {
      btnNum: [100, 200, 300],
      eventBet: "",
      amount: 0,
      firstAmount: "",
      secondAmount: "",
      thirdAmount: "",
      confirmColor: 0,
      shouyi: "",
    };
  },
  methods: {
    initEventPopup() {
      this.$api
        .betPre({
          gameId: this.betPre.gameId,
          oddsId: this.betPre.perId,
        })
        .then((res) => {
          this.eventBet = res.data;
          this.$updateStore("vuex_user.balance", this.eventBet.balance);
          this.eventBet.balance = this.eventBet.balance / this.amountRate;
        });
    },
    closeAmount() {
      this.$refs.steAmountNum.close();
    },
    //下注操作
    bet() {
      if (this.eventBet.balance <= 0 || this.amount === "") {
        uni.showToast({ title: this.$t("eventPopup.erorMsg"), icon: "error" });
        return false;
      }
      this.$api
        .bet({
          gameId: this.betPre.gameId,
          oddsId: this.betPre.perId,
          type: "2",
          money: this.amount,
        })
        .then((res) => {
          let that = this;
          uni.showToast({ title: this.$t("eventPopup.msg") });
          setTimeout(function () {
            that.initEventPopup();
            that.$emit("closeChild");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirm() {
      if (
        this.firstAmount !== "" &&
        this.secondAmount !== "" &&
        this.thirdAmount !== "" &&
        this.firstAmount !== "0" &&
        this.secondAmount !== "0" &&
        this.thirdAmount !== "0"
      ) {
        this.btnNum[0] = this.firstAmount;
        this.btnNum[1] = this.secondAmount;
        this.btnNum[2] = this.thirdAmount;
        this.firstAmount = "";
        this.secondAmount = "";
        this.thirdAmount = "";
        this.$refs.steAmountNum.close();
      } else {
      }
    },
    changAmount(nums) {
      if (nums > this.eventBet.balance) {
        return false;
      }
      this.amount = Number(this.amount) + Number(nums);
      this.setShouYi();
    },
    changAllAmount(nums) {
      this.amount = nums;
      this.setShouYi();
    },
    closePopup() {
      this.$emit("closeChild");
    },
    //计算收益
    setShouYi() {
      if (this.amount == 0 || this.amount == "") {
        this.shouyi = "";
      }
      const zj =
        Number(this.amount) +
        Number(this.amount) * Number(this.betPre.antiPerCent / this.amountRate);
      this.shouyi = (
        zj +
        zj * Number(this.eventBet.bonus / this.amountRate) -
        this.amount
      ).toFixed();
    },
  },
  mounted() {
    this.initEventPopup();
  },
  watch: {
    // 被侦听的变量count
    amount() {
      if (this.amount == "" || this.amount == 0) {
        this.confirmColor = 0;
      } else {
        this.confirmColor = 1;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.event-popup {
  display: flex;
  flex-direction: column;
  background-color: var(--body-bg);
  .title-top {
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    .event-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--page-title-color);
    }
    .title-icon {
      color: var(--close-color) !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .event-card {
    margin: 15px 15px 15px 15px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: var(--game-pop-vs-bg);
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: var(--card-radius);
    height: 150px;
    color: #fff;
    .event-card-top {
      text-align: center;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .event-card-mid {
      display: flex;
      justify-content: space-around;
      padding: 0 15px 0 0;
      .country-view {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #fff;
        align-items: center;
        text-align: center;
        .imgCalss {
          padding: 5px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
    .event-card-bottom {
      display: flex;
      justify-content: center;
      text-align: center;
      .country-name {
        position: relative;
        overflow: hidden;
        margin: 10px -10px 0 0;
        height: 20px !important;
        width: 120px;
        border-radius: 6px 0 0 15px;
        border: 2px solid #d4d4d4;
        background-color: var(--team-bar-left-bg);
        padding: 5px;
        .country-text {
          display: block; //块状显示
          overflow: hidden; //隐藏文字
          text-overflow: ellipsis; //显示...
          white-space: nowrap; //不换行
          width: 115px; //超过100px就截取
        }
      }
      .country-name1 {
        position: relative;
        overflow: hidden;
        margin: 10px 0 0 -10px;
        height: 20px !important;
        padding: 5px 10px;
        width: 120px;
        border-radius: 0 6px 15px 0;
        border: 2px solid #d4d4d4;
        background-color: var(--team-bar-left-bg);
      }

      .country-vs {
        width: 50px;
        line-height: 46px;
        border-radius: 50px;
        background: var(--market-pop-bg);
        border: 2px solid #d4d4d4;
        color: #fff;
        z-index: 9;
      }
    }
  }
  .event-amount {
    margin: 0 15px 15px 15px;
    display: flex;
    justify-content: space-between;
  }
  .event-amount-input {
    margin: 0 15px 15px 15px;
    display: flex;
    .amount-input {
      width: 220px;
    }
  }
  .event-gain {
    margin: 0 15px 15px 15px;
    display: flex;
    justify-content: space-between;
  }
  .event-gain-input {
    margin: 0 15px 15px 15px;
  }
  .event-gain-text {
    margin: 0 15px 15px 15px;
    display: flex;
    justify-content: space-between;
    .event-gain-text-val {
      display: flex;
      justify-content: space-around;
      .text1 {
        margin-left: 20px;
      }
      .text2 {
        margin-right: 20px;
      }
      .text3 {
      }
    }
  }
  .event-btn-group {
    margin: 0 15px 15px 15px;
    display: flex;
    .amount-btn {
      font-family: PingFangSC-Medium;
      width: 24%;
      padding: 0 8px;
      margin: 0 2px;
      text-align: center;
      height: 36px;
      line-height: 36px;
      font-size: 12px;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
      background-color: var(--form-main-uni-easyinput__content);
      border: var(--easyinput__border) !important;
      box-shadow: var(--shadow-bg);
      border-radius: var(--card-radius) !important;
      color: var(--easyinput__color);
    }
    .amount-icon {
      margin-left: 5px;
      height: 32px;
      width: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--form-main-uni-easyinput__content);
      border: var(--easyinput__border) !important;
      box-shadow: var(--shadow-bg);
      border-radius: var(--card-radius) !important;
      color: var(--easyinput__color);
      .compose-icon {
        color: var(--light-color) !important;
      }
    }
  }
  .event-balance {
    margin: 0 15px 15px 15px;
    display: flex;
    justify-content: space-between;
  }
  .event-btn-confirm {
    margin: 0 15px 10px 15px;
    height: 50px;
    line-height: 52px;
    text-align: center;
    justify-content: center;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: var(--home-card-color);
  }
  .confirmClass {
    margin: 0 15px 10px 15px;
    height: 50px;
    line-height: 52px;
    text-align: center;
    justify-content: center;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #f1c40f;
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
  .set-amount {
    background-color: var(--body-bg);
    color: var(--body-color);
    width: 100%;
    max-width: 100% !important;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      background-color: var(--bs-popup-hd);
      font-size: 16px;
    }
    .font-class {
      padding: 15px;
      color: var(--body-color) !important;
      font-size: 15px !important;
    }
    .easy-inp {
      width: 95%;
      padding: 10px;
    }
    .btn-class {
      width: 90%;
      margin: 10px 0 10px 10px;
      display: flex;
      .btn {
        width: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        font-size: 16px;
        border-radius: var(--card-radius);
        margin-bottom: 15px;
      }
    }
  }
  .btn-left {
    background: var(--btn-gray-color) !important;
    color: #999 !important;
  }
  .btn-right {
    margin-right: -4%;
    color: #fff !important;
    background: var(--gradient-color) !important;
    border-radius: var(--card-radius);
  }
}
</style>
