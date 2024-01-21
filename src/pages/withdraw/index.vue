<template>
  <view class="withdraw content">
    <nav-aside></nav-aside>
    <view class="deposit-main">
      <view class="top-title">
        <text class="title-font">{{ $t("withdraw.title") }}</text>
        <uni-icons
          class="title-icon"
          type="close"
          size="40"
          @click="$Router.back()"
        ></uni-icons>
      </view>
    </view>
    <view class="bank-card">
      <text>{{ $t("withdraw.withdrawalType") }}</text>
      <uni-data-select
        class=""
        v-model="prarms.type"
        :localdata="range"
        :clear="false"
        @change="change"
      ></uni-data-select>
      <text class="deposit-tit">{{ $t("withdraw.amount") }}</text>
      <uni-easyinput
        class="easy-input"
        type="number"
        :placeholder="$t('withdraw.placeholderAmount')"
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
      <text class="font-class">{{ $t("withdraw.payPassword") }}:</text>
      <uni-easyinput
        class="easy-inp"
        type="password"
        v-model="prarms.payPwd"
        :placeholder="$t('withdraw.placeholderPayPwd')"
      />
      <!-- <text class="font-class">{{ $t("withdraw.captcha") }}:</text> -->
      <view class="font-class">
        <uni-data-select
          class=""
          v-model="statuscode"
          :localdata="codes"
          @change="changeCode"
          :clear="false"
        ></uni-data-select>
      </view>
      <view class="getCode">
        <uni-easyinput
          class="code-inp"
          v-model="prarms.code"
          :placeholder="$t('withdraw.placeholderPhoneCode')"
        />
        <button v-show="btnShow" class="code-btn" @click="getCode">
          {{ $t("withdraw.getCodeBtu") }}
        </button>
        <button
          v-show="timeshow"
          class="code-btn-time"
          @click="getCode"
          disabled="true"
        >
          {{ times }}
        </button>
      </view>
      <button class="btn-submit" type="default" @click="confirm">
        {{ $t("withdraw.confirmBtn") }}
      </button>
      <view class="u-line"></view>
      <view class="wt-tip">
        <p>
          {{ $t("withdraw.everydayWithdrawTimes") }}:
          <text style="margin-left: 10px">{{
            withdrawType.everydayWithdrawTimes
          }}</text>
        </p>
        <p>
          {{ $t("withdraw.everydayWithdrawFree") }}:
          <text style="margin-left: 10px">{{
            withdrawType.everydayWithdrawFree
          }}</text>
        </p>
        <p>
          {{ $t("withdraw.withdrawalToday") }}:
          <text style="margin-left: 10px">{{
            withdrawType.withdrawalToday
          }}</text>
        </p>
        <p>
          {{ $t("withdraw.withdrawalRate") }}:
          <text style="margin-left: 10px">{{
            withdrawType.withdrawalRate
          }}</text>
        </p>
        <p>
          {{ $t("withdraw.withdrawMax") }}:
          <text style="margin-left: 10px">{{ withdrawType.withdrawMax }}</text>
        </p>
        <p>
          {{ $t("withdraw.withdrawMin") }}:
          <text style="margin-left: 10px">{{ withdrawType.withdrawMin }}</text>
        </p>
        <p>
          {{ $t("withdraw.withdrawalRateMax") }}:
          <text style="margin-left: 10px">{{
            withdrawType.withdrawalRateMax
          }}</text>
        </p>
        <p>
          {{ $t("withdraw.withdrawalRateMin") }}:
          <text style="margin-left: 10px">{{
            withdrawType.withdrawalRateMin
          }}</text>
        </p>
      </view>
    </view>
    <view style="height: 20px"></view>
    <!-- <view class="btns">
      <button class="cancel-btn" type="default" @click="$Router.back()">
        Cancel
      </button>
      <button class="confirm-btn" type="default" @click="$Router.back()">
        Confirm
      </button>
    </view> -->
  </view>
</template>

<script>
import NoData from "@/components/no-data/no-data.vue";
export default {
  name: "withdraw",
  components: { NoData },
  props: {},
  data() {
    return {
      range: [],
      btnNums: [100, 200, 300, 400, 500, 1000, 2000, 5000],
      prarms: { type: "", money: "", payPwd: "", code: "" },
      statuscode: 1,
      codes: [
        {
          value: 0,
          text: this.$t("info.login.code"),
        },
        {
          value: 1,
          text: this.$t("info.login.emailcode"),
        },
      ],

      times: 60,
      timeshow: false,
      btnShow: true,
      withdrawType: "",
      withdrawData: [],
    };
  },
  computed: {},
  methods: {
    changeCode(e) {
      this.statuscode = e;
    },
    init() {
      this.$api.withdrawalPre().then((res) => {
        console.log(res);

        //先清空，防止重复数据
        this.range = [];
        for (let i = 0; i < res.data.length; i++) {
          let obj = new Object();
          obj.value = res.data[i].type;
          obj.text = res.data[i].name;
          this.range.push(obj);
        }
        this.withdrawData = res.data;
        this.prarms.type = res.data[0].type;
        this.withdrawType = res.data[0];
      });
    },
    changAmount(amount) {
      if (amount === this.$t("withdraw.allAmountBtn")) {
        this.prarms.money = this.vuex_user.balance / this.amountRate;
        return;
      }
      this.prarms.money = Number(amount) + Number(this.prarms.money);
    },
    confirm() {
      if (
        this.prarms.money === "" ||
        this.prarms.payPwd === "" ||
        this.prarms.code === ""
      ) {
        uni.showToast({
          title: this.$t("withdraw.formRuls"),
          icon: "error",
        });
        return;
      }
      if (this.vuex_user.balance < 1) {
        uni.showToast({ title: "no money", icon: "error" });
        return;
      }
      this.$api.withdrawal(this.prarms).then((res) => {
        this.prarms.money = "";
        this.prarms.payPwd = "";
        this.prarms.code = "";
        uni.showToast({ title: this.$t("withdraw.confirmSuccessMsg") });
      });
    },
    getCode() {
      var that = this;
      that.timeshow = true;
      that.btnShow = false;
      if (this.statuscode === 0) {
        // 请求code
        that.$api.getCodeOnline({ type: "0" }).then((res) => {
          uni.showToast({
            title: this.$t("cardManage.bankCard.showToastMsg"),
          });
        });
      } else {
        this.$api.getmailCode().then((_) => {
          uni.showToast({
            title: this.$t("info.login.sendSuccess"),
          });
        });
      }
      if (that.times == 60) {
        that.sid = setInterval(function () {
          that.times--;
          if (that.times == 0) {
            clearInterval(that.sid);
            that.timeshow = false;
            that.btnShow = true;
            that.times = 60;
          }
        }, 1000);
      }
    },
    change(e) {
      let that = this;
      this.withdrawData.forEach(function (item, index) {
        if (item.type === e) {
          that.withdrawType = item;
        }
      });
    },
    async checkUserBank() {
      const bank = await this.$api.getCardInfo();
      const usdt = await this.$api.getVirtualList();
      if (bank.data != null || usdt.data.length != 0) {
      } else {
        this.$Router.push("/cardManage");
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.init();
    this.checkUserBank();
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style scoped lang="scss">
.withdraw {
  padding-top: 60px;
  .deposit-main {
    padding: 15px;
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
  .bank-card {
    padding: 15px;
    display: flex;
    font-size: 15px;
    flex-direction: column;
    .getCode {
      display: flex;
      .code-inp {
        width: 60%;
      }
      .code-btn {
        line-height: 50px;
        margin-left: 10px;
        width: 30%;
        border-radius: var(--card-radius) !important;
        color: #fff !important;
        background: var(--gradient-color) !important;
        font-size: 17px;
      }
      .code-btn-time {
        line-height: 50px;
        margin-left: 10px;
        width: 30%;
        border-radius: var(--card-radius) !important;
        font-size: 17px;
        background: var(--btn-gray-color) !important;
        color: #999 !important;
      }
    }
    .font-class {
      padding: 15px 0 10px 0;
      color: var(--body-color) !important;
      font-size: 15px !important;
    }
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
      background: linear-gradient(
        var(--btn-submit-bg-1),
        var(--btn-submit-bg-2)
      );
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
  .btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .cancel-btn {
      margin-left: 20%;
      display: inline-block;
      color: #fff;
      cursor: pointer;
      min-width: 100px;
      border-radius: 6px;
      background: #999;
      font-size: 14px;
      width: 26px !important;
    }
    .confirm-btn {
      margin-right: 20%;
      display: inline-block;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      min-width: 100px;
      border-radius: 6px;
      background: linear-gradient(
        180deg,
        var(--noCarBtn-yes-1) 35%,
        var(--noCarBtn-yes-2)
      );
    }
  }
}
</style>
