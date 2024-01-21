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
        <text class="title-font">{{ $t("toBalance.title") }}</text>
        <text class="top-t"></text>
      </view>
    </view>
    <view class="comt-top">
      <view class="fdka">
        <view>{{ $t("toBalance.form") }}</view>
        <view class="dsaw" style="margin-top: 5px">······</view>
        <view style="margin-top: 5px">{{ $t("toBalance.to") }}</view>
      </view>
      <view class="asdff">
        <view>{{ $t("toBalance.prompt") }}</view>
        <view class="link-top"></view>
        <view>{{ $t("toBalance.toProm") }}</view>
      </view>
    </view>
    <view class="from">
      <uni-forms label-position="top" ref="form" :modelValue="formData">
        <uni-forms-item :label="$t('toBalance.amount')" name="money">
          <uni-easyinput
            class="easy-inp"
            type="number"
            v-model="formData.money"
            :placeholder="$t('toBalance.amountPlaceholder')"
          />
          <view class="amount-cent">
            <view class="amount">
              <view>{{ $t("transfer.blance") }}：</view>
              <text class="amount-s">{{ symbol }} {{ balance }}</text>
              <uni-icons
                color=""
                type="reload"
                size="20"
                @click="getSafeInfo"
              ></uni-icons>
            </view>
            <view class="all-btn" @click="setAllAmount">{{
              $t("toBalance.setBalanceBtn")
            }}</view>
          </view>
        </uni-forms-item>
        <uni-forms-item :label="$t('toBalance.payPwd')" name="payPwd">
          <uni-easyinput
            class="easy-inp"
            type="password"
            v-model="formData.payPwd"
            :placeholder="$t('toBalance.payPwdPlaceholder')"
          />
        </uni-forms-item>
      </uni-forms>
      <button class="btn" type="default" @click="submitBalance">
        {{ $t("transfer.buttonlabel") }}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      formData: {
        money: "",
        payPwd: "",
      },
      rules: {
        money: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("toBalance.amountPlaceholder"),
            },
          ],
        },
        payPwd: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("toBalance.payPwdPlaceholder"),
            },
          ],
        },
      },
      balance: "",
      symbol: "",
    };
  },
  computed: {},
  methods: {
    setMoney() {
      this.formData.money = this.balance;
    },
    goStrongBox() {
      this.$Router.push("/strongBox");
    },
    submitBalance() {
      this.$refs.form.validate().then((res) => {
        this.$api
          .safeToBalance(this.formData)
          .then((res) => {
            uni.showToast({
              title: this.$t("toBalance.sussessMsg"),
              icon: "success",
              duration: 2000,
            });
            var dd = this;
            setTimeout(function () {
              dd.$Router.push("/strongBox");
            }, 2000);
          })
          .catch((error) => {
            const errMsg = error.data[0].msgKey;
            if (errMsg == "toBalanceTooFast") {
              uni.showToast({
                title: this.$t("toBalance.errorMsg.toBalanceTooFast"),
                icon: "error",
                duration: 2000,
              });
            } else if (errMsg == "toBalanceFail") {
              uni.showToast({
                title: this.$t("toBalance.errorMsg.toBalanceFail"),
                icon: "error",
                duration: 2000,
              });
            } else if (errMsg == "payPwdError") {
              uni.showToast({
                title: this.$t("toast.verification.payPwdError"),
                icon: "error",
                duration: 2000,
              });
            } else if (errMsg == "balanceNotEnough") {
              uni.showToast({
                title: this.$t("toast.verification.balanceNotEnough"),
                icon: "error",
                duration: 2000,
              });
            } else {
              uni.showToast({
                title: this.$t("toBalance.errorMsg.unknownMsg"),
                icon: "error",
                duration: 2000,
              });
            }
          });
      });
    },
    setAllAmount() {
      this.formData.money = this.balance;
    },
    getSafeInfo() {
      this.$api.safeInfo().then((res) => {
        this.balance = res.data.money / this.amountRate;
        this.symbol = res.data.symbol;
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.getSafeInfo();
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
  .comt-top {
    display: flex;
    width: 90%;
    margin: 20px auto;
    background-color: var(--home-card-color);
    border-radius: var(--card-radius) !important;
    height: 120px;
    .fdka {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 20%;
      align-items: center;
      .dsaw {
        writing-mode: vertical-lr;
        writing-mode: tb-lr;
      }
    }
    .asdff {
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .link-top {
        width: 80%;
        height: 1px;
        background-color: var(--easyinput__color);
      }
    }
  }
  .sm {
    padding-bottom: 20px;
    width: 85%;
    margin: auto;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
  .userInfo {
    width: 100%;
    justify-content: center;
    display: flex;
    .money-icon {
      width: 33px;
      height: 17px;
      background-image: url("/static/images/strongRelocate/balance.png");
    }
    .userInfo-balance {
      padding: 0 10px;
      font-size: 14px;
      color: #fff;
      letter-spacing: 1px;
      .balance-span {
        text-decoration: underline;
      }
    }
    .userInfo-btn {
      width: 41px;
      height: 18px;
      text-align: center;
      background-color: #fff;
      border-radius: 20px;
      font-family: "Century Gothic Bold";
      font-size: 14px;
      color: #000;
    }
  }
  .from {
    width: 90%;
    margin: auto;
    overflow: auto;
    padding: 10% 0;
    .amount-cent {
      display: flex;
      justify-content: space-between;
      .amount {
        display: flex;
        align-items: center;
        margin-top: 10px;
        justify-content: space-around;
        width: 50%;
        .amount-s {
          font-size: 14px;
          color: var(--index-more-color);
          color: var(--index-more-color);
        }
      }
      .all-btn {
        background: var(--gradient-color) !important;
        width: 36px;
        font-size: 12px;
        border-radius: 10px;
        text-align: center;
        line-height: 20px;
        margin-top: 10px;
      }
    }
    .btn {
      width: 100%;
      border-radius: var(--card-radius);
      margin: 50px 0;
      color: #fff !important;
      background: var(--gradient-color) !important;
    }
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
