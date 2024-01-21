<template>
  <view class="content strongTransfer bg">
    <view class="top">
      <view class="top-back bg" @click="goStrongBox"></view>
      <view class="top-mid">
        <image
          class="top-mid-img"
          src="/static/images/strongTransfer/transfericon.png"
        />
        <p class="top-mid-p">{{ $t("transfer.title") }}</p>
      </view>
      <view class="top-right"></view>
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
    </view>
    <view class="btn-confirm bg" @click="confirmTransfer">
      {{ $t("transfer.buttonlabel") }}
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      data: { aimName: "", money: "", payPwd: "" },
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
            console.log(res);
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
            } else if (error == "payNotExist") {
              uni.showToast({
                title: this.$t("transfer.errorMsg.payNotExist"),
                icon: "error",
              });
            } else if (error == "transferTooFast") {
              uni.showToast({
                title: this.$t("transfer.errorMsg.transferTooFast"),
                icon: "error",
              });
            } else if (error == "transferFail") {
              uni.showToast({
                title: this.$t("transfer.errorMsg.transferFail"),
                icon: "error",
              });
            } else if (error == "onlyToSub") {
              uni.showToast({
                title: this.$t("transfer.errorMsg.onlyToSub"),
                icon: "error",
              });
            } else {
              uni.showToast({
                title: this.$t("transfer.errorMsg.unknownMsg"),
                icon: "error",
              });
            }
          });
      });
    },
    goStrongBox() {
      this.$Router.push("/strongBox");
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
  background-image: url("/static/images/strongTransfer/bg.png");
  .top {
    padding: 8% 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .top-back {
      width: 43px;
      height: 19px;
      background-image: url("/static/images/strongbox/back.png");
    }
    .top-mid {
      .top-mid-img {
        width: 70px;
        height: 60px;
      }
      .top-mid-p {
        font-family: "Century Gothic Bold";
        font-size: 20px;
        letter-spacing: 3px;
        color: #fff;
        text-align: center;
      }
    }
    .top-right {
      width: 43px;
    }
  }
  .from {
    width: 320px;
    margin: auto;
    overflow: auto;
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
