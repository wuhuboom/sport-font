<template>
  <view class="content login" @click="handleOutClick">
    <view class="login-top">
      <view class="header-right">
        <easy-select
          ref="easySelect"
          size="small"
          :label="vuex_lang_lab"
          :images="vuex_lang_img"
          :options="selectOptions"
          @selectOne="handleSelect"
        ></easy-select>
      </view>
      <!-- <uni-icons type="close" size="40" @click="close"></uni-icons> -->
    </view>
    <view class="login-bottom">
      <img src="../../static/images/login/tb.png" width="70" height="70" />
      <view style="margin: 10px 0; font-size: 22px"
        >{{ $t("login.title") }}
        <span style="margin-left: 10px; font-weight: 700">CTER</span>
      </view>
      <view style="font-size: 13px; margin-bottom: 20px">
        {{ $t("login.titleInfo") }}
      </view>

      <!-- <view class="bottom-header">
        <view class="header-left">
          <p class="header-left-top">{{ $t("login.title") }}</p>
          <view class="header-left-bottom">
            <p>{{ $t("login.or") }}</p>
            <p @click="register" class="reg-link">{{ $t("login.register") }}</p>
          </view>
        </view>
      </view> -->
      <view class="bottom-from">
        <uni-forms :modelValue="form">
          <uni-forms-item name="name">
            <!-- <template #label>
              <p class="label-text">
                {{ $t("login.user.lable") }}
              </p>
            </template> -->
            <uni-easyinput
              :styles="styles"
              :inputBorder="false"
              prefixIcon="person"
              type="text"
              v-model="form.username"
              :placeholder="this.$t('login.user.placeholder')"
            />
          </uni-forms-item>
          <uni-forms-item name="password">
            <!-- <template #label>
              <p class="label-text">
                {{ $t("login.password.lable") }}
              </p>
            </template> -->
            <uni-easyinput
              :styles="styles"
              :inputBorder="false"
              prefixIcon="locked"
              type="password"
              v-model="form.password"
              :placeholder="this.$t('login.password.placeholder')"
            />
          </uni-forms-item>
          <uni-forms-item class="verifyCode" name="verifyCode">
            <!-- <template #label>
              <p class="label-text">
                {{ $t("login.verifiCode.lable") }}
              </p>
            </template> -->
            <uni-easyinput
              :styles="styles"
              :inputBorder="false"
              prefixIcon="mail-open"
              type="text"
              v-model="form.code"
              :placeholder="this.$t('login.verifiCode.placeholder')"
            />
            <image
              class="verifyImg"
              :src="image"
              @click="verifyCodeInit"
            ></image>
          </uni-forms-item>
          <view class="from-footer">
            <view class="from-footer-left">
              <switch :color="switchColor" checked @change="switch1Change" />
              <p>{{ $t("login.remember") }}</p>
            </view>
            <p @click="inputDialogToggle">{{ $t("login.forget.title") }}</p>
          </view>
          <uni-forms-item name="verifyKey" style="display: none">
            <uni-easyinput disabled v-model="form.verifyKey" />
          </uni-forms-item>
        </uni-forms>

        <button class="btn-submit" @click="submit">
          {{ $t("login.btnSubmit") }}
        </button>
        <view style="font-size: 14px; margin: 20px 0; text-align: center"
          >{{ $t("login.noAccount") }}
          <span
            style="margin-left: 10px; color: rgb(0, 163, 183)"
            @click="register"
            >{{ $t("login.register") }}</span
          >
        </view>
      </view>
      <view class="under-line"></view>
      <view class="custom-server" @click="goServer">
        <uni-icons type="headphones" size="20"></uni-icons>
        <p>{{ $t("login.online") }}</p>
      </view>
    </view>
    <Forget ref="forget"></Forget>
  </view>
</template>

<script>
import Forget from "./components/forget.vue";
export default {
  components: { Forget },
  data: () => {
    return {
      image: "",
      form: {
        username: "",
        password: "",
        code: "",
        verifyKey: "",
      },
      remember: true,
      selecValue: {
        img: require("../../static/images/flag/en.jpg"),
        label: "EN",
      },
      selectOptions: [
        {
          label: "EN",
          img: require("../../static/images/flag/en.jpg"),
        },
        {
          label: "INS",
          img: require("../../static/images/flag/in.png"),
        },
        {
          label: "DE",
          img: require("../../static/images/flag/de.png"),
        },
        {
          label: "FR",
          img: require("../../static/images/flag/fr.png"),
        },
        {
          label: "ES",
          img: require("../../static/images/flag/es.png"),
        },
      ],
      styles: {
        color: "var(--easyinput__color)",
        backgroundColor: "var(--form-main-uni-easyinput__content)",
        borderColor: "var(--easyinput__border)!important",
      },
      switchColor: "var(--blue-color)",
      value: "",
      serverAddr: "",
    };
  },
  onShow() {},
  mounted() {
    this.verifyCodeInit();

    this.checkRouter();
    //this.initSelecLang();
  },
  methods: {
    checkRouter() {
      console.log(this.$Route.query.langId);
      if (this.$Route.query.langId === "1") {
        this.$updateStore("vuex_lang", "zh");
        this.$i18n.locale = "zh";
      }
    },
    handleOutClick() {
      this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions();
    },
    register() {
      this.$Router.push("/register");
    },
    handleSelect(option) {
      this.selecValue = option;
      this.$updateStore("vuex_lang", option.label.toLowerCase());
      this.$updateStore("vuex_lang_img", option.img);
      this.$updateStore("vuex_lang_lab", option.label);
      this.$i18n.locale = option.label.toLowerCase();
    },
    close() {
      this.$Router.push("/");
    },
    verifyCodeInit() {
      this.$api
        .getVerifyCode()
        .then((res) => {
          this.form.code = "";
          this.image = res.data.img;
          this.form.verifyKey = res.data.verifyKey;
        })
        .catch((error) => {});
    },
    switch1Change(e) {
      this.remember = e.detail.value;
    },
    submit() {
      this.$api
        .login(this.form)
        .then((res) => {
          if (res.code == 200) {
            this.$updateStore("vuex_token", res.data.token);
            this.$updateStore("vuex_user", {
              username: res.data.user,
              role: res.data.role,
              nickname: res.data.nickname,
              id: res.data.id,
            });
            this.$Router.push("/");
          } else {
            uni.showToast({ title: res.data[0].msgKey, icon: "none" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //this.resetForm();
      this.verifyCodeInit();
    },
    resetForm() {
      this.form = {
        username: "",
        password: "",
        code: "",
        verifyKey: "",
      };
    },
    inputDialogToggle() {
      this.$refs.forget.open();
    },
    initSelecLang() {
      const currentLang = this.vuex_lang.toUpperCase();
      const currentSelect = this.selectOptions.find(
        (item) => item.label == currentLang
      );
      this.selecValue = currentSelect;
    },
    goServer() {
      this.$api.getServTmp().then((res) => {
        this.serverAddr = res.data.serviceAddr;
        window.location.href = this.serverAddr;
      });
    },
  },
};
</script>

<style lang="scss">
.login {
  background: url("../../static/images/login/bg.png") no-repeat;
  background-size: 100% 100%;
  .login-top {
    height: 25vh;
    .header-right {
      height: 10vh;
      padding: 0 40rpx;
      display: flex;
      align-items: center;
      justify-content: right;
      .easy-select {
        width: 80px !important;
      }
    }
  }
  .login-bottom {
    padding: 0 40rpx;
    .bottom-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      .header-left {
        display: flex;
        flex-direction: column;
        .header-left-top {
          font-size: 30px;
          margin-bottom: 16px;
        }
        .header-left-bottom {
          display: flex;
          .reg-link {
            margin-left: 10px;
            color: $s-light-color;
          }
        }
      }
    }
    .bottom-from {
      .label-text {
        color: var(--body-color) !important;
        font-size: 15px;
        margin-bottom: 10px;
      }
      .verifyCode {
        position: relative;
        .verifyImg {
          height: 32px;
          width: 100px;
          position: absolute;
          top: 10px;
          right: 12px;
        }
      }
      .from-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .from-footer-left {
          display: flex;
          align-items: center;
          p {
            font-size: 13px;
            color: var(--link-color);
          }
        }
        p {
          font-size: 13px;
          color: #fff;
        }
      }
      .btn-submit {
        width: 100%;
        line-height: 40px;
        color: #fff !important;
        font-size: 15px;
        background-color: rgb(232, 118, 62);
        border-radius: 20px;
      }
    }
    .under-line {
      margin-top: 20px;
      border-bottom: 1px dotted rgb(60, 57, 160);
      width: 100%;
      transform: scaleY(0.5);
      border-top-color: rgb(60, 57, 160);
      border-right-color: rgb(60, 57, 160);
      border-left-color: rgb(60, 57, 160);
    }
    .custom-server {
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
  }

  &::v-deep .uni-easyinput__content {
    background-color: var(--form-main-uni-easyinput__content) !important;
    border: 1px solid rbg(63, 63, 63) !important;
    box-shadow: var(--shadow-bg);
    border-radius: var(--card-radius) !important;
    height: 50px;
    padding: 0 15px 0 10px;
    color: var(--easyinput__color);
  }
  &::v-deep .uni-select__input-text {
    font-size: 12px !important;
    color: var(--navbar-color);
  }
}
</style>
