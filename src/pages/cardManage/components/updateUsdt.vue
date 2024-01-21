<template>
  <view class="updateUsdt">
    <uni-popup
      ref="updateUsdt"
      background-color="#fff"
      type="bottom"
      :is-mask-click="true"
    >
      <view class="title">
        <text>{{ $t("cardManage.updateUsdt.title") }}</text>
        <uni-icons
          class="titleIocn"
          type="closeempty"
          size="20"
          @click="closeBind"
        ></uni-icons>
      </view>
      <view class="set-amount">
        <uni-forms
          :modelValue="usdtUpInfo"
          label-position="top"
          ref="form"
          :rules="rules"
        >
          <view class="formView">
            <uni-easyinput style="display: none" v-model="usdtUpInfo.id" />

            <uni-forms-item
              :label="$t('cardManage.updateUsdt.address')"
              name="type"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="usdtUpInfo.addr"
                :placeholder="$t('cardManage.updateUsdt.placeholderAddr')"
              />
            </uni-forms-item>

            <uni-forms-item
              :label="$t('cardManage.updateUsdt.payPwd')"
              name="payPwd"
            >
              <uni-easyinput
                class="easy-inp"
                type="password"
                v-model="usdtUpInfo.payPwd"
                :placeholder="$t('cardManage.updateUsdt.placeholderPayPwd')"
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
                  v-model="usdtUpInfo.code"
                  :placeholder="
                    $t('cardManage.updateUsdt.placeholderPhoneCode')
                  "
                />
                <button v-show="btnShow" class="code-btn" @click="getCode">
                  {{ $t("cardManage.updateUsdt.getCodeBtu") }}
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
            <view class="btn-class">
              <button class="btn btn-right" type="default" @click="confirm">
                {{ $t("cardManage.updateUsdt.editBtn") }}
              </button>
            </view>
          </view>
        </uni-forms>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "updateUsdt",
  props: ["usdtUpInfo"],
  data() {
    return {
      times: 60,
      timeshow: false,
      btnShow: true,
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
      rules: {
        addr: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("cardManage.updateUsdt.placeholderAddr"),
            },
          ],
        },
        payPwd: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("cardManage.updateUsdt.placeholderPayPwd"),
            },
          ],
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: this.$t(
                "cardManage.updateUsdt.placeholderPhoneCode"
              ),
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
    closeBind() {
      this.usdtUpInfo.code = "";
      this.usdtUpInfo.payPwd = "";
      this.$refs.updateUsdt.close();
    },
    openPopup() {
      this.$refs.updateUsdt.open();
    },
    confirm() {
      this.$refs.form.validate().then((res) => {
        this.$api
          .editVirtual(this.usdtUpInfo)
          .then((res) => {
            let that = this;
            uni.showToast({
              title: this.$t("cardManage.updateUsdt.addSuccessMsg"),
            });
            setTimeout(function () {
              that.$Router.push("/cardManage");
            }, 2000);
          })
          .catch((error) => {});
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
  mounted() {},
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
    width: 100%;
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
