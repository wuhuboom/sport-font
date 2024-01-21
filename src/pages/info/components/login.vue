<template>
  <view class="login-password">
    <uni-collapse class="info-content">
      <uni-collapse-item class="info-card">
        <template #title>
          <view class="card-title">
            <text class="title-left">{{ $t("info.login.title") }}</text>
            <text class="title-right">******</text>
          </view>
        </template>
        <view class="card-content">
          <uni-forms
            ref="form"
            :modelValue="formData"
            label-position="top"
            :rules="rules"
          >
            <uni-forms-item :label="$t('info.login.new')" name="newPass">
              <uni-easyinput
                class="input"
                v-model="formData.newPass"
                type="password"
                :placeholder="$t('info.login.newplace')"
              />
            </uni-forms-item>
            <uni-forms-item :label="$t('info.login.confirm')" name="confirm">
              <uni-easyinput
                class="input"
                v-model="formData.confirm"
                type="password"
                :placeholder="$t('info.login.confirmplace')"
              />
            </uni-forms-item>
            <uni-data-select
              class=""
              v-model="value"
              :localdata="range"
              @change="change"
              :clear="false"
            ></uni-data-select>
            <uni-forms-item class="last-item" name="code">
              <uni-easyinput
                class="input"
                v-model="formData.code"
                type="password"
                :placeholder="
                  value == 0
                    ? $t('info.login.codeplace')
                    : $t('info.login.emailplace')
                "
              />
              <button v-show="btnShow" class="code-btn" @click="send">
                {{ $t("info.login.codebtn") }}
              </button>
              <button
                class="code-btn"
                @click="send"
                disabled="true"
                v-show="timeshow"
              >
                {{ times }}
              </button>
            </uni-forms-item>
          </uni-forms>
          <button class="card-btn" @click="submit">
            {{ $t("info.login.btn") }}
          </button>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>
<script>
export default {
  name: "login-password",
  components: {},
  props: {},
  data() {
    return {
      formData: {
        newPass: "",
        confirm: "",
        code: "",
      },
      times: 60,
      timeshow: false,
      btnShow: true,
      value: 1,
      rules: {
        newPass: {
          rules: [
            { required: true, errorMessage: this.$t("info.login.newplace") },
          ],
        },
        confirm: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("info.login.confirmplace"),
            },
          ],
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("info.login.rulesMsgP"),
            },
          ],
        },
      },
      range: [
        {
          value: 0,
          text: this.$t("info.login.code"),
        },
        {
          value: 1,
          text: this.$t("info.login.emailcode"),
        },
      ],
    };
  },
  computed: {},
  methods: {
    submit() {
      this.$refs.form.validate().then((_) => {
        this.$api
          .changePwd({
            newPwd: this.formData.newPass,
            twicePwd: this.formData.confirm,
            code: this.formData.code,
          })
          .then((_) => {
            uni.showToast({
              title: this.$t("toast.changePwdSuccess"),
            });
            this.formData.newPass = "";
            this.formData.confirm = "";
            this.formData.code = "";
          });
      });
    },
    send() {
      var that = this;
      that.timeshow = true;
      that.btnShow = false;
      if (this.value !== 0) {
        this.$api.getmailCode().then((_) => {
          uni.showToast({
            title: this.$t("info.login.sendSuccess"),
          });
        });
      } else {
        this.$api.getCodeOnline().then((_) => {
          uni.showToast({
            title: this.$t("toast.sendCodeSuccess"),
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
      this.value = e;
    },
  },
  watch: {},
  onLoad() {},
  onReady() {},
  onShow() {
    this.$refs.form.setRules(this.rules);
  },
};
</script>
<style scoped lang="scss">
.info-content {
  .card-title {
    .title-right {
      color: var(--green-light-color);
    }
  }

  .card-content {
    padding: 15px;

    &::v-deep .uni-forms-item__label {
      width: auto !important;
    }

    .input {
      color: var(--placeholder__color);

      &::v-deep .uni-easyinput__content {
        box-shadow: var(--shadow-bg);
        background-color: var(--form-main-uni-easyinput__content) !important;
        border: var(--easyinput__border) !important;
        height: 42px;
        border-radius: var(--card-radius);

        .uni-input-placeholder {
          color: var(--placeholder__color);
        }

        .uni-input-input {
          color: var(--navbar-color);
        }
      }
    }

    .last-item {
      position: relative;

      .code-btn {
        position: absolute;
        right: 0;
        top: 0;
        width: 100px;
        font-weight: 700;
        background: linear-gradient(
          180deg,
          var(--btn-submit-bg-1) 35%,
          var(--btn-submit-bg-1)
        );
        color: #fff;
        height: 42px;
        border-radius: 0 10px 10px 0;
        text-align: center;
        line-height: 42px;
        font-size: 14px;
        transition: opacity 0.2s;
      }
    }

    &::v-deep .uni-forms-item__label {
      color: var(--navbar-color) !important;
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
      height: 42px;
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

  .card-btn {
    height: 40px;
    line-height: 40px;
    background-color: var(--btn-gray-color);
    font-weight: 700;
    color: #999;
  }
}
</style>
