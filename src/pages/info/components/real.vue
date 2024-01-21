<template>
  <view class="real">
    <uni-collapse class="info-content">
      <uni-collapse-item class="info-card">
        <template #title>
          <view class="card-title">
            <text class="title-left">{{ $t("info.real.title") }}</text>
            <text class="title-right">{{
              formatPhone(vuex_user.phone ? vuex_user.phone : "")
            }}</text>
          </view>
        </template>
        <view class="card-content">
          <uni-forms
            ref="form"
            :modelValue="realData"
            label-position="top"
            :rules="realRules"
          >
            <uni-forms-item :label="$t('info.real.title')" name="phone">
              <uni-easyinput
                class="phone-input input"
                type="text"
                v-model="realData.phone"
                :placeholder="$t('info.real.phoneplace')"
              >
                <template #right>
                  <view class="test-text">
                    <uni-data-select
                      class="select-box"
                      v-model="areaCode"
                      placeholder=""
                      :localdata="range"
                      :emptyTips="$t('order.sport.tableMsg')"
                      :clear="false"
                    ></uni-data-select>
                  </view>
                </template>
              </uni-easyinput>
            </uni-forms-item>

            <uni-forms-item
              class="last-item"
              :label="$t('info.real.code')"
              name="code"
            >
              <uni-easyinput
                class="input"
                v-model="realData.code"
                type="text"
                :placeholder="$t('info.real.codeplace')"
              />
              <button v-show="btnShow" class="code-btn" @click="send">
                {{ $t("info.real.codebtn") }}
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
            {{ $t("info.real.btn") }}
          </button>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>
<script>
export default {
  name: "real",
  components: {},
  props: {},
  data() {
    return {
      times: 60,
      timeshow: false,
      btnShow: true,
      typesName: "asdjdjsj ",
      realData: {
        phone: "",
        code: "",
      },
      realRules: {
        phone: {
          rules: [
            { required: true, errorMessage: this.$t("info.login.newplace") },
          ],
        },
        code: {
          rules: [
            { required: true, errorMessage: this.$t("info.login.codeplace") },
          ],
        },
      },
      areaCode: 91,
      range: [],
    };
  },
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
    submit() {
      this.$refs.form.validate().then((res) => {
        this.$api
          .bindPhone({
            areaCode: this.areaCode,
            phone: this.areaCode + "" + this.realData.phone,
            code: this.realData.code,
          })
          .then((res) => {
            this.loadPhoen(this.realData.phone);
            uni.showToast({
              title: this.$t("toast.changePhoneSuccess"),
            });
            this.realData.phone = "";
            this.realData.code = "";
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    loadPhoen(phone) {
      this.$updateStore("vuex_user.phone", phone);
    },
    send() {
      var that = this;
      that.timeshow = true;
      that.btnShow = false;
      this.$api
        .getCode({ phone: this.areaCode + "" + this.realData.phone })
        .then((res) => {
          uni.showToast({
            title: this.$t("toast.sendCodeSuccess"),
          });
        });
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
    formatPhone(phone) {
      const prefix = phone.slice(0, 2);
      const suffix = phone.slice(-3);
      return prefix + "****" + suffix;
    },
  },

  mounted() {
    this.registConf();
  },

  onLoad() {},
};
</script>
<style scoped lang="scss">
.info-content {
  .card-title {
    .title-right {
      color: #f53;
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

          .uni-select__selector-item {
            color: var(--easyinput__color) !important;
          }
        }
      }

      &::v-deep .uni-input-wrapper {
        position: absolute;
        left: 60px;
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
