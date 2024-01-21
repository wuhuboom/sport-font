<template>
  <view class="content register">
    <view class="back" @click="$Router.back()">
      <uni-icons class="back-icon" type="back" size="30"></uni-icons>
    </view>
    <!-- <view class="title">{{ $t("login.register") }}</view> -->
    <view class="register-main">
      <uni-forms ref="form" :modelValue="formData" :rules="rules">
        <uni-forms-item name="username">
          <!-- <template #label>
            <view class="form-label">{{ $t("register.user.label") }}</view>
          </template> -->
          <uni-easyinput
            type="text"
            v-model="formData.username"
            prefixIcon="person"
            :placeholder="$t('register.user.placeholder')"
          />
        </uni-forms-item>
        <uni-forms-item name="password">
          <!-- <template #label>
            <view class="form-label">{{ $t("register.password.label") }}</view>
          </template> -->
          <uni-easyinput
            type="password"
            v-model="formData.password"
            prefixIcon="locked"
            :placeholder="$t('register.password.placeholder')"
          />
        </uni-forms-item>
        <uni-forms-item name="invitationCode">
          <!-- <template #label>
            <view class="form-label">{{ $t("register.referral.label") }}</view>
          </template> -->
          <uni-easyinput
            type="text"
            :disabled="haveCode"
            v-model="formData.invitationCode"
            prefixIcon="mail-open"
            :placeholder="$t('register.referral.placeholder')"
          />
        </uni-forms-item>
        <uni-forms-item name="email">
          <!-- <template #label>
            <view class="form-label">{{ $t("register.email") }}</view>
          </template> -->
          <uni-easyinput
            type="text"
            v-model="formData.email"
            prefixIcon="email-filled"
            :placeholder="$t('register.emailplace')"
          />
        </uni-forms-item>
        <uni-forms-item name="phone">
          <!-- <template #label>
            <view class="form-label">{{ $t("register.phone.label") }}</view>
          </template> -->
          <uni-easyinput
            class="phone-input"
            type="text"
            v-model="formData.phone"
            :placeholder="$t('register.phone.placeholder')"
          >
            <template #right>
              <view class="test-text">
                <uni-data-select
                  class="select-box"
                  v-model="areaCode"
                  :localdata="range"
                  placeholder=""
                  :clear="false"
                ></uni-data-select>
              </view>
            </template>
          </uni-easyinput>
        </uni-forms-item>
        <uni-forms-item name="code">
          <!-- <template #label>
            <view class="form-label">{{ $t("register.code.label") }}</view>
          </template> -->
          <uni-easyinput
            type="text"
            v-model="formData.code"
            :placeholder="$t('register.code.placeholder')"
          />
          <image class="verifyImg" :src="image" @click="verifyCodeInit"></image>
        </uni-forms-item>
      </uni-forms>
      <view class="check-box">
        <checkbox :checked="checked" />
        <text class="tip">
          {{ $t("register.tip") }}
          <!-- <text class="license" @click="$refs.inputDialog.open()">{{
            $t("register.license")
          }}</text> -->
        </text>
      </view>
      <button class="register-btn" @click="submitForm">
        {{ $t("register.btnSubmit") }}
      </button>
    </view>
    <view class="register-footer" @click="goServer">
      <uni-icons type="headphones" size="20"></uni-icons>
      <p>{{ $t("login.online") }}</p>
    </view>
    <uni-popup ref="inputDialog" type="dialog" :is-mask-click="true">
      <uni-card class="dialog-main">
        <template #title>
          <text class="dialog-title">
            {{ $t("register.dialog.title") }}
          </text>
        </template>
        <text class="dialog-body"> {{ $t("register.dialog.license") }} </text>
        <button class="dialog-btn" @click="dialogConfirm">
          {{ $t("register.dialog.btn") }}
        </button>
      </uni-card>
    </uni-popup>
  </view>
</template>
<script>
export default {
  name: "register",
  components: {},
  props: {},
  data() {
    return {
      formData: {
        email: "",
        username: "",
        password: "",
        invitationCode: "",
        verifyKey: "",
        code: "",
        phone: "",
      },
      rules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("register.user.placeholder"),
            },
          ],
        },
        email: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("register.emailplace"),
            },
            {
              format: "email",
              errorMessage: this.$t("info.email.fomatemail"),
            },
          ],
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("register.password.placeholder"),
            },
          ],
        },
        invitationCode: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("register.referral.placeholder"),
            },
          ],
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("register.code.placeholder"),
            },
          ],
        },
        phone: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("register.phone.placeholder"),
            },
          ],
        },
      },
      areaCode: "",
      range: [],
      checked: true,
      image: "",
      serverAddr: "",
      haveCode: false,
    };
  },
  onShow() {
    this.verifyCodeInit();
    this.registConf();
    this.getReferralCode();
  },
  computed: {},
  methods: {
    registConf() {
      this.$api.getRegistConf().then((res) => {
        this.areaCode = res.data.area_code[0];
        for (let i = 0; i < res.data.area_code.length; i++) {
          var obj = {};
          obj["text"] = res.data.area_code[i];
          obj["value"] = res.data.area_code[i];
          this.range.push(obj);
        }
      });
    },
    submitForm() {
      this.$refs.form.validate().then((_) => {
        this.$api
          .regist({
            email: this.formData.email,
            username: this.formData.username,
            password: this.formData.password,
            invitationCode: this.formData.invitationCode,
            verifyKey: this.formData.verifyKey,
            code: this.formData.code,
            phone: this.areaCode + this.formData.phone,
            twoPassword: this.formData.password,
            areaCode: this.areaCode,
          })
          .then((res) => {
            uni.showToast({
              title: this.$t("register.successTip"),
              icon: "success",
            });
            this.$Router.push("/login");
          })
          .catch((err) => {});
      });
    },
    verifyCodeInit() {
      this.$api
        .getVerifyCode()
        .then((res) => {
          this.image = res.data.img;
          this.formData.code = "";
          this.formData.verifyKey = res.data.verifyKey;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dialogConfirm() {
      this.$refs.inputDialog.close();
      this.checked = true;
    },
    goServer() {
      this.$api.getServTmp().then((res) => {
        this.serverAddr = res.data.serviceAddr;
        window.location.href = this.serverAddr;
      });
    },
    getReferralCode() {
      const query = this.$Route.query;
      if (query.code) {
        this.formData.invitationCode = query.code;
        this.haveCode = true;
      }
    },
  },
  watch: {},
};
</script>
<style scoped lang="scss">
.register {
  padding: 0 24px;
  background: url("../../static/images/register/bg.png") no-repeat;
  background-size: 100% 100%;
  .back {
    height: 10vh;
    display: flex;
    align-items: center;
    .back-icon {
      color: var(--body-color) !important;
    }
  }
  .title {
    margin-top: 20px;
    font-size: 30px;
  }

  .register-main {
    margin-top: 20vh;

    .form-label {
      color: var(--body-color) !important;
      font-size: 15px !important;
      margin-bottom: 4px;
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

    .verifyImg {
      height: 30px;
      width: 100px;
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .check-box {
      margin-top: -14px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      &::v-deep uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
        border-color: var(--blue-color);
        background-color: var(--blue-color);
        color: #fff !important;
      }

      .tip {
        color: var(--navbar-color) !important;

        .license {
          margin-left: 4px;
          color: var(--blue-color);
        }
      }
    }

    .register-btn {
      width: 100%;
      line-height: 40px;
      color: #fff !important;
      font-size: 15px;
      background-color: rgb(232, 118, 62);
      border-radius: 20px;
    }
  }

  .register-footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--blue-color) !important;
    font-size: 14px;

    .uni-icons {
      color: var(--blue-color) !important;
      margin-right: 5px;
    }
  }

  .dialog-main {
    padding: 0 !important;
    min-width: 325px;
    border: 1px solid var(--bs-popup-bg);
    border-radius: var(--card-radius);
    overflow: hidden;
    background: var(--bs-popup-bg);
    color: var(--body-color);

    .dialog-title {
      padding: 0 10px;
      display: block;
      height: 50px;
      line-height: 50px;
      background-color: var(--bs-popup-hd);
      font-size: 16px;
      border-bottom: 3px solid var(--bs-popup-bg);
      font-weight: 700;
      color: var(--navbar-color);
    }

    .dialog-body {
      padding: 0 10px;
    }

    .dialog-btn {
      margin-top: 16px;
      font-size: 16px;
      cursor: pointer;
      font-weight: 700;
      color: #fff !important;
      background: linear-gradient(
        var(--btn-submit-bg-1),
        var(--btn-submit-bg-2)
      );
      border-radius: var(--card-radius) !important;
    }
  }

  .phone-input {
    .test-text {
      width: 60px;
      position: absolute;
      left: 0px;
    }

    .select-box {
      margin-right: 7px;

      &::v-deep .uni-select {
        background-color: var(--form-main-uni-easyinput__content);
        border: none;

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

    &::v-deep .uni-input-wrapper {
      position: absolute;
      left: 60px;
    }
  }
}
</style>
