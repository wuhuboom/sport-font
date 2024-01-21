<template>
  <view class="updateWallet">
    <uni-popup
      ref="bindWallet"
      background-color="#fff"
      type="bottom"
      :is-mask-click="true"
    >
      <view class="title">
        <text>{{ $t("cardManage.updateWallet.title") }}</text>
        <uni-icons
          class="titleIocn"
          type="closeempty"
          size="20"
          @click="closeBind"
        ></uni-icons>
      </view>
      <view class="set-amount">
        <uni-forms
          :modelValue="walletUpdateData"
          label-position="top"
          ref="form"
          :rules="rules"
        >
          <view class="formView">
            <uni-forms-item
              :label="$t('cardManage.updateWallet.type')"
              name="type"
            >
              <uni-data-select
                v-model="walletUpdateData.type"
                :localdata="range"
                :clear="false"
                :placeholder="$t('cardManage.updateWallet.type')"
              ></uni-data-select>
            </uni-forms-item>
            <uni-forms-item
              :label="$t('cardManage.updateWallet.account')"
              name="account"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="walletUpdateData.account"
                :placeholder="$t('cardManage.updateWallet.account')"
              />
            </uni-forms-item>
            <uni-forms-item
              :label="$t('cardManage.updateWallet.address')"
              name="address"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="walletUpdateData.address"
                :placeholder="$t('cardManage.updateWallet.address')"
              />
            </uni-forms-item>

            <uni-forms-item
              :label="$t('cardManage.addUsdt.payPwd')"
              name="payPwd"
            >
              <uni-easyinput
                class="easy-inp"
                type="password"
                v-model="walletUpdateData.payPwd"
                :placeholder="$t('cardManage.addUsdt.placeholderPayPwd')"
              />
            </uni-forms-item>

            <uni-data-select
              class=""
              v-model="statuscode"
              :localdata="codes"
              @change="changeCode"
              :clear="false"
            ></uni-data-select>
            <uni-forms-item name="code">
              <view class="getCode">
                <uni-easyinput
                  class="code-inp"
                  v-model="walletUpdateData.code"
                  :placeholder="$t('cardManage.addUsdt.placeholderPhoneCode')"
                />
                <button v-show="btnShow" class="code-btn" @click="getCode">
                  {{ $t("cardManage.addUsdt.getCodeBtu") }}
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
            </uni-forms-item>
          </view>
        </uni-forms>
        <button class="btn" type="default" @click="confirm">
          {{ $t("cardManage.addUsdt.addBtn") }}
        </button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "updateWallet",
  props: ["walletUpdateData", "dtxx"],
  data() {
    return {
      prarms: {
        type: "",
        account: "",
        address: "",
        payPwd: "",
        code: "",
      },
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
      range: [],
      rules: {
        type: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("cardManage.updateWallet.type"),
            },
          ],
        },
        account: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("cardManage.updateWallet.account"),
            },
          ],
        },
        address: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("cardManage.updateWallet.address"),
            },
          ],
        },
        payPwd: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("cardManage.addUsdt.placeholderPayPwd"),
            },
          ],
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("cardManage.addUsdt.placeholderPhoneCode"),
            },
          ],
        },
      },
    };
  },
  methods: {
    changeCode(e) {
      this.statuscode = e;
    },
    //动态添加选项
    withdrawal() {
      for (let i = 0; i < this.dtxx.length; i++) {
        if (this.dtxx[i].type == 4) {
          const types = this.dtxx[i].types;
          this.prarms.type = types[0];
          for (let j = 0; j < types.length; j++) {
            let obj = new Object();
            obj.value = types[j];
            obj.text = types[j];
            this.range.push(obj);
          }
        }
      }
    },

    closeBind() {
      this.$refs.bindWallet.close();
    },
    openPopup() {
      this.$refs.bindWallet.open();
    },
    confirm() {
      this.$refs.form.validate().then((res) => {
        this.$api
          .walletUpate(this.walletUpdateData)
          .then((res) => {
            let that = this;
            uni.showToast({
              title: this.$t("cardManage.addUsdt.addSuccessMsg"),
            });
            setTimeout(function () {
              that.$Router.push("/cardManage");
            }, 2000);
          })
          .catch((error) => {
            console.error(error);
          });
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
  },
  mounted() {
    this.withdrawal();
  },
};
</script>
<style scoped lang="scss">
.title {
  background-color: var(--body-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  font-size: 16px;
  z-index: 99999;
  .titleIocn {
    color: var(--body-color) !important;
  }
}
.set-amount {
  background-color: var(--body-bg);
  color: var(--body-color);
  padding: 10px;
  overflow: auto;
  height: 70vh;
  .font-class {
    padding: 15px;
    color: var(--body-color) !important;
    font-size: 15px !important;
  }
  .getCode {
    margin-top: -15px;
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
  .btn {
    border-radius: var(--card-radius);
    margin: 15px 0;
    color: #fff !important;
    background: var(--gradient-color) !important;
  }

  &::v-deep .uni-forms-item__label {
    width: auto !important;
    color: var(--easyinput__color);
    font-size: 16px;
    font-weight: 700;
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
  &::v-deep .uni-select {
    font-size: 16px;
    background-color: var(--form-main-uni-easyinput__content);
    color: var(--easyinput__color);
    border: var(--easyinput__border) !important;
    box-shadow: var(--shadow-bg);
    box-sizing: border-box;
    border-radius: 8px;
    padding: 0 5px;
    position: relative;
    user-select: none;
    flex-direction: row;
    align-items: center;
    height: 50px;
  }
  &::v-deep .uni-select__selector-item {
    font-size: 15px !important;
  }
  &::v-deep .uni-select__input-text {
    font-size: 15px !important;
    color: var(--navbar-color);
  }
  &::v-deep .uni-select__selector {
    background-color: var(--uni-select__selector-bg) !important;
    border: var(--uni-select__solid) !important;
    border-radius: var(--card-radius) !important;
  }
}
</style>
