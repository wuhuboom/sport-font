<template>
  <view class="content strongTransfer bg">
    <view class="top">
      <view class="top-back bg" @click="goStrongBox"></view>
      <view class="top-mid">
        <image
          class="top-mid-img"
          src="/static/images/strongRelocate/relocateicon.png"
        />
        <p class="top-mid-p">{{ $t("toBalance.title") }}</p>
      </view>
      <view class="top-right"></view>
    </view>
    <view class="sm">{{ $t("toBalance.prompt") }}</view>
    <view class="userInfo"
      ><view class="money-icon bg"></view>
      <p class="userInfo-balance">
        {{ $t("toBalance.balanceSpan")
        }}<span class="balance-span">{{ symbol }}:{{ balance }}</span>
      </p>
      <view class="userInfo-btn" @click="setMoney">{{
        $t("toBalance.setBalanceBtn")
      }}</view></view
    >
    <view class="from">
      <uni-forms label-position="top" ref="form" :modelValue="formData">
        <uni-forms-item :label="$t('toBalance.amount')" name="money">
          <uni-easyinput
            class="easy-inp"
            type="number"
            v-model="formData.money"
            :placeholder="$t('toBalance.amountPlaceholder')"
          />
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
    </view>
    <view class="btn-confirm bg" @click="submitBalance">
      {{ $t("toBalance.bottonLabel") }}
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
                icon: "success",
                duration: 2000,
              });
            } else if (errMsg == "toBalanceFail") {
              uni.showToast({
                title: this.$t("toBalance.errorMsg.toBalanceFail"),
                icon: "success",
                duration: 2000,
              });
            } else {
              uni.showToast({
                title: this.$t("toBalance.errorMsg.unknownMsg"),
                icon: "success",
                duration: 2000,
              });
            }
          });
      });
    },
    getSafeInfo() {
      this.$api.safeInfo().then((res) => {
        console.log(res);
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
  background-image: url("/static/images/strongRelocate/bg.png");
  .top {
    padding: 8% 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .top-back {
      width: 41px;
      height: 19px;
      background-image: url("/static/images/strongbox/back.png");
    }
    .top-mid {
      text-align: center;
      .top-mid-img {
        width: 54px;
        height: 55px;
      }
      .top-mid-p {
        font-family: "Century Gothic Bold";
        font-size: 20px;
        letter-spacing: 3px;
        color: #fff;
      }
    }
    .top-right {
      width: 41px;
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
    width: 85%;
    margin: auto;
    overflow: auto;
    padding: 10% 0;
  }
  .btn-confirm {
    width: 110px;
    height: 40px;
    text-align: center;
    margin: auto;
    color: #05184a;
    font-size: 18px;
    line-height: 40px;
    border-radius: 20px;
    font-family: "Century Gothic Bold";
    background-image: url("/static/images/strongTransfer/button.png");
  }
  &::v-deep .uni-forms-item__label {
    width: auto !important;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    letter-spacing: 2px;
  }
  &::v-deep .uni-easyinput__content {
    background-color: rgb(107, 145, 184, 0.6) !important;
    border: var(--easyinput__border) !important;
    box-shadow: var(--shadow-bg);
    border-radius: var(--card-radius) !important;
    height: 50px;
    padding: 0 15px 0 10px;
    color: #fff;
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
