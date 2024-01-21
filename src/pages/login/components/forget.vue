<template>
  <view class="forget">
    <!-- 输入框示例 -->
    <uni-popup ref="inputDialog" type="dialog" :is-mask-click="true">
      <uni-card>
        <template #title>
          <view class="dialog-title">
            <p class="title-text">{{ $t("login.forget.title") }}</p>
            <uni-icons
              type="closeempty"
              size="16"
              @click="$refs.inputDialog.close()"
            ></uni-icons>
          </view>
        </template>
        <view class="dialog-body">
          <uni-forms :modelValue="forgetForm" ref="form" :rules="rules">
            <uni-forms-item name="username">
              <uni-easyinput
                :styles="styles"
                :inputBorder="false"
                type="text"
                v-model="forgetForm.username"
                :placeholder="this.$t('login.forget.namePlaceholder')"
              />
            </uni-forms-item>
            <uni-forms-item name="newPwd">
              <uni-easyinput
                :styles="styles"
                :inputBorder="false"
                type="password"
                v-model="forgetForm.newPwd"
                :placeholder="this.$t('login.forget.pwdPlaceholder')"
              />
            </uni-forms-item>
            <uni-forms-item name="twicePwd">
              <uni-easyinput
                :styles="styles"
                :inputBorder="false"
                type="password"
                v-model="forgetForm.twicePwd"
                :placeholder="this.$t('login.forget.confirmPlaceholder')"
              />
            </uni-forms-item>

            <uni-forms-item>
              <uni-data-select
                class=""
                v-model="value"
                :localdata="ranges"
                @change="change"
                :clear="false"
              ></uni-data-select>
            </uni-forms-item>

            <uni-forms-item class="form-group" v-if="value == 0">
              <template #label>
                <uni-data-select
                  class="select-box"
                  v-model="phoneCode"
                  :localdata="range"
                  placeholder=""
                  :clear="false"
                ></uni-data-select>
              </template>
              <uni-easyinput
                :styles="styles"
                :inputBorder="false"
                type="text"
                v-model="phone"
                :placeholder="this.$t('login.forget.phonePlaceholder')"
              />
            </uni-forms-item>

            <uni-forms-item v-if="value == 1">
              <uni-easyinput
                :styles="styles"
                :inputBorder="false"
                type="text"
                v-model="email"
                :placeholder="this.$t('login.forget.emailplace')"
              />
            </uni-forms-item>

            <uni-forms-item class="last-item" name="code">
              <uni-easyinput
                :styles="styles"
                :inputBorder="false"
                type="text"
                v-model="forgetForm.code"
                :placeholder="this.$t('login.forget.verifiCodePlh')"
              />

              <button
                v-show="btnShow"
                class="btn-submit"
                @click="sendVerifi"
                size="mini"
              >
                {{ $t("info.login.codebtn") }}
              </button>
              <button
                class="code-btn-time"
                size="mini"
                disabled="true"
                v-show="timeshow"
              >
                {{ times }}
              </button>
            </uni-forms-item>
            <view class="from-footer">
              <p>{{ $t("login.forget.tip") }}</p>
              <p class="from-footer-right" @click="goServer">
                {{ $t("login.online") }}
              </p>
            </view>

            <button class="btn-submit" @click="submit">
              {{ $t("login.forget.btnText") }}
            </button>
          </uni-forms>
        </view>
      </uni-card>
    </uni-popup>
  </view>
</template>
<script>
export default {
  name: "forget",
  components: {},
  props: {},
  data() {
    return {
      forgetForm: {
        username: "",
        newPwd: "",
        twicePwd: "",
        code: "",
      },
      phone: "",
      email: "",
      times: 60,
      timeshow: false,
      btnShow: true,
      value: 1,
      ranges: [
        {
          value: 0,
          text: this.$t("info.login.code"),
        },
        {
          value: 1,
          text: this.$t("info.login.emailcode"),
        },
      ],
      phoneCode: null,
      range: [],
      areaCode: "",
      styles: {
        color: "var(--easyinput__color)",
        backgroundColor: "var(--form-main-uni-easyinput__content)",
        borderColor: "var(--easyinput__border)!important",
      },
      rules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("login.forget.namePlaceholder"),
            },
          ],
        },
        newPwd: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("login.forget.pwdPlaceholder"),
            },
          ],
        },
        twicePwd: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("login.forget.confirmPlaceholder"),
            },
          ],
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("login.forget.verifiCodePlh"),
            },
          ],
        },
      },
    };
  },
  computed: {},
  methods: {
    change(e) {
      this.value = e;
    },
    registConf() {
      this.$api.getRegistConf().then((res) => {
        this.phoneCode = res.data.area_code[0];
        for (let i = 0; i < res.data.area_code.length; i++) {
          var obj = {};
          obj["text"] = res.data.area_code[i];
          obj["value"] = res.data.area_code[i];
          this.range.push(obj);
        }
      });
    },
    open() {
      this.$refs.inputDialog.open();
    },
    goServer() {
      this.$api.getServTmp().then((res) => {
        window.location.href = res.data.serviceAddr;
      });
    },
    sendVerifi() {
      var that = this;
      if (this.forgetForm.username == "") {
        uni.showToast({
          title: this.$t("login.forget.namePlaceholder"),
          icon: "error",
        });
        return;
      }
      if (this.value == 0) {
        if (this.phone == "") {
          uni.showToast({
            title: this.$t("login.forget.phonePlaceholder"),
            icon: "error",
          });
          return;
        }
        this.$api
          .getCodeNoLogin({
            username: this.forgetForm.username,
            phone: this.phoneCode + this.phone,
          })
          .then((res) => {
            uni.showToast({
              title: this.$t("toast.sendCodeSuccess"),
            });
          });
      } else {
        var reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
        if (this.email == "") {
          uni.showToast({
            title: this.$t("login.forget.emailplace"),
            icon: "error",
          });
          return;
        }
        if (!reg.test(this.email)) {
          uni.showToast({
            title: this.$t("login.forget.emailTest"),
            icon: "error",
          });
          return;
        }
        this.$api
          .mailChangePwd({
            username: this.forgetForm.username,
            email: this.email,
          })
          .then((res) => {
            uni.showToast({
              title: this.$t("toast.sendCodeSuccess"),
            });
          });
      }

      that.timeshow = true;
      that.btnShow = false;
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
    submit() {
      var that = this;
      this.$refs.form.validate().then((_) => {
        if (this.forgetForm.newPwd != this.forgetForm.twicePwd) {
          uni.showToast({
            icon: "error",
            title: this.$t("login.forget.passworddifferent"),
          });
          return;
        }
        this.$api.changePwdNoLogin(this.forgetForm).then((res) => {
          uni.showToast({
            icon: "success",
            title: this.$t("login.forget.updateInfo"),
          });
          setTimeout(function () {
            that.$Router.back();
          }, 2000);
        });
      });
    },
  },
  watch: {},
  onLoad() {},
  onShow() {
    this.$refs.form.setRules(this.rules);
  },
  mounted() {
    this.registConf();
  },
};
</script>
<style scoped lang="scss">
.forget {
  .uni-card {
    padding: 0 !important;
    border: 1px solid var(--bs-popup-hd);
    border-radius: var(--card-radius);
    background-color: var(--bs-popup-bg);
    min-width: 320px;
    min-height: 400px;
  }

  .dialog-title {
    display: flex;
    align-items: center;
    padding: 0 15px;
    justify-content: space-between;
    background-color: var(--bs-popup-hd);
    height: 50px;

    .title-text {
      font-size: 16px;
    }

    .uni-icons {
      color: var(--body-color) !important;
    }
  }

  .dialog-body {
    .uni-forms-item {
      margin-bottom: 5px !important;
      min-width: 75%;
      height: 50px;
      align-items: center;

      .uni-easyinput {
        border: var(--easyinput__border) !important;
        border-radius: 8px;
      }
    }

    .select-box {
      max-width: 25%;
      margin-right: 7px;

      &::v-deep .uni-select {
        background-color: var(--form-main-uni-easyinput__content);
        border: var(--easyinput__border) !important;
        box-shadow: var(--shadow-bg);

        .uni-select__input-text {
          color: var(--easyinput__color) !important;
        }

        .uni-select__selector {
          background-color: var(--uni-select__selector-bg);
          border: var(--uni-select__solid);
          border-radius: var(--card-radius);

          .uni-popper__arrow {
            display: none;
          }

          &::v-deep .uni-select__selector-empty {
            .uni-select__selector-item:hover {
              background: var(--uni-select__selector-item-active);
            }
          }
        }
      }
    }

    .last-item {
      &::v-deep .uni-forms-item__content {
        display: flex;

        .btn-submit {
          line-height: 35px;
          border-radius: 12px !important;
          margin-left: 8px;
        }
      }
    }

    .from-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--body-color);
      margin-top: 14px;

      .from-footer-right {
        margin-left: 4px;
        color: var(--ui-color-normal);
      }
    }

    .btn-submit {
      color: #fff !important;
      background: linear-gradient(
        var(--btn-submit-bg-1),
        var(--btn-submit-bg-2)
      );
      box-shadow: var(--btn--submit--shadow) !important;
      border-radius: var(--card-radius) !important;
    }
    .code-btn-time {
      line-height: 35px;
      border-radius: 12px !important;
      margin-left: 8px;
      box-shadow: var(--btn--submit--shadow) !important;
      border-radius: var(--card-radius) !important;
      background: var(--btn-gray-color) !important;
      color: #999 !important;
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
      padding-left: 10px;
      position: relative;
      display: flex;
      -webkit-user-select: none;
      user-select: none;
      flex-direction: row;
      align-items: center;
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
  }
}
</style>
