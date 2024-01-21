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
        <text class="title-font">{{ $t("transfer.title") }}</text>
        <text class="top-t"></text>
      </view>
    </view>
    <view class="from">
      <uni-forms label-position="top" ref="form" :modelValue="data">
        <uni-forms-item :label="$t('transfer.username')" name="aimName">
          <uni-easyinput
            class="easy-inp"
            :placeholder="$t('transfer.usernamePlaceholder')"
            v-model="data.aimName"
          />
        </uni-forms-item>
        <uni-forms-item :label="$t('transfer.amount')" name="money">
          <uni-easyinput
            type="number"
            v-model="data.money"
            class="easy-inp"
            :placeholder="$t('transfer.amountPlaceholder')"
          />
          <view class="amount-cent">
            <view class="amount">
              <view>{{ $t("transfer.blance") }}：</view>
              <text class="amount-s">{{ money }}</text>
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
        <uni-forms-item
          v-model="data.payPwd"
          :label="$t('transfer.paymentPassword')"
          name="payPwd"
        >
          <uni-easyinput
            type="password"
            class="easy-inp"
            v-model="data.payPwd"
            :placeholder="$t('transfer.payPasswordPlaceholder')"
          />
        </uni-forms-item>
      </uni-forms>
      <button class="btn" type="default" @click="confirmTransfer">
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
      data: { aimName: "", money: "", payPwd: "" },
      money: "",
      rules: {
        aimName: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("transfer.usernamePlaceholder"),
            },
          ],
        },
        money: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("transfer.amountPlaceholder"),
            },
          ],
        },
        payPwd: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("transfer.payPasswordPlaceholder"),
            },
          ],
        },
      },
    };
  },
  computed: {},
  methods: {
    confirmTransfer() {
      this.$refs.form.validate().then((res) => {
        this.$api
          .safeTransfer(this.data)
          .then((res) => {
            uni.showToast({
              title: this.$t("transfer.successMsg"),
              icon: "success",
              duration: 2000,
            });
            var dd = this;
            setTimeout(function () {
              dd.$Router.push("/strongBox");
            }, 2000);
          })
          .catch((error) => {
            const errorMsg = error.data[0].msgKey;
            if (errorMsg == "usernameNotExist") {
              uni.showToast({
                title: this.$t("transfer.errorMsg.usernameNotExist"),
                icon: "error",
              });
            } else if (errorMsg == "payNotExist") {
              uni.showToast({
                title: this.$t("transfer.errorMsg.payNotExist"),
                icon: "error",
              });
            } else if (errorMsg == "transferTooFast") {
              uni.showToast({
                title: this.$t("transfer.errorMsg.transferTooFast"),
                icon: "error",
              });
            } else if (errorMsg == "transferFail") {
              uni.showToast({
                title: this.$t("transfer.errorMsg.transferFail"),
                icon: "error",
              });
            } else if (errorMsg == "onlyToSub") {
              uni.showToast({
                title: this.$t("transfer.errorMsg.onlyToSub"),
                icon: "error",
              });
            } else if (errorMsg == "payPwdError") {
              uni.showToast({
                title: this.$t("toast.verification.payPwdError"),
                icon: "error",
              });
            }
          });
      });
    },
    setAllAmount() {
      this.data.money = this.money;
    },
    goStrongBox() {
      this.$Router.push("/strongBox");
    },
    getSafeInfo() {
      this.$api.safeInfo().then((res) => {
        this.money = res.data.money / this.amountRate;
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    this.getSafeInfo();
    this.$refs.form.setRules(this.rules);
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
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
  .from {
    width: 90%;
    margin: auto;
    overflow: auto;
    padding: 20px 0;
    .amount-cent {
      display: flex;
      justify-content: space-between;
      .amount {
        display: flex;
        align-items: center;
        margin-top: 10px;
        justify-content: space-around;
        width: 40%;
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
