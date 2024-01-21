<template>
  <view class="payPwdSet content">
    <view class="set-amount">
      <uni-forms
        :modelValue="prarms"
        :rules="rules"
        ref="form"
        label-position="top"
      >
        <view class="formView">
          <uni-forms-item :label="$t('payPwdSet.labelPayPwd')" name="payPwd">
            <uni-easyinput
              class="easy-inp"
              type="password"
              v-model="prarms.payPwd"
              :placeholder="$t('payPwdSet.placeholderPayPwd')"
            />
          </uni-forms-item>
          <uni-forms-item
            :label="$t('payPwdSet.labelPayAgain')"
            name="payPwdAgain"
          >
            <uni-easyinput
              class="easy-inp"
              type="password"
              v-model="prarms.payPwdAgain"
              :placeholder="$t('payPwdSet.placeholderAgain')"
            />
          </uni-forms-item>
        </view>
      </uni-forms>
      <button class="addBtn" @click="confirm">
        {{ $t("payPwdSet.addBtn") }}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  name: "payPwdSet",
  components: {},
  data() {
    return {
      prarms: {
        payPwd: "",
        payPwdAgain: "",
      },
      rules: {
        payPwd: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("payPwdSet.placeholderPayPwd"),
            },
          ],
        },
        payPwdAgain: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("payPwdSet.placeholderAgain"),
            },
          ],
        },
      },
    };
  },
  computed: {},
  methods: {
    confirm() {
      this.$refs.form.validate().then((res) => {
        this.$api.setPayPwd(this.prarms).then((res) => {
          this.$updateStore("vuex_isPayPwd", 1);
          this.$Router.push("/");
        });
      });
    },
    init() {
      this.$api.checkPayPwd().then((res) => {
        if (res.data.paySet === 1) {
          this.$updateStore("vuex_isPayPwd", 1);
          this.$Router.push("/");
        }
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    this.init();
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
.payPwdSet {
  display: flex;
  align-items: center;
  padding: 10px;
  .set-amount {
    background-color: var(--body-bg);
    color: var(--body-color);
    width: 100%;
    .font-class {
      padding: 15px;
      color: var(--body-color) !important;
      font-size: 15px !important;
    }
    &::v-deep .uni-forms-item__label {
      width: auto !important;
      color: var(--easyinput__color);
      font-size: 16px;
      font-weight: 700;
    }
    .addBtn {
      color: #fff !important;
      background: var(--gradient-color) !important;
    }

    &::v-deep .uni-easyinput__content {
      background-color: var(--form-main-uni-easyinput__content) !important;
      border: var(--easyinput__border) !important;
      box-shadow: var(--shadow-bg);
      border-radius: var(--card-radius) !important;
      height: 50px;
      color: var(--easyinput__color);
    }

    &::v-deep .uni-select__input-text {
      font-size: 15px !important;
      color: var(--navbar-color);
    }
  }
}
</style>
