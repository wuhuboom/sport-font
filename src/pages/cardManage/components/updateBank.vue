<template>
  <view class="updateBank">
    <uni-popup
      ref="upateBindCard"
      background-color="#fff"
      type="bottom"
      :is-mask-click="true"
    >
      <view class="title">
        <text>{{ $t("cardManage.updateBank.title") }}</text>
        <uni-icons
          class="titleIocn"
          type="closeempty"
          size="20"
          @click="closeBind"
        ></uni-icons>
      </view>
      <view class="set-amount">
        <view class="formView">
          <uni-forms
            :modelValue="prarms"
            label-position="top"
            ref="form"
            :rules="rules"
          >
            <uni-forms-item
              :label="$t('cardManage.updateBank.bankName')"
              name="bankName"
            >
              <!-- <uni-data-select
                v-model="prarms.bankId"
                :localdata="range"
                :clear="false"
                @change="changeData"
              ></uni-data-select> -->

              <uni-combox
                class="uni-combox"
                :value="bankName"
                :candidates="comboxData"
                :placeholder="$t('cardManage.updateBank.comboxPlaceholder')"
                :emptyTips="$t('cardManage.updateBank.comboxEmptyTips')"
                @input="selectBankName"
              ></uni-combox>
            </uni-forms-item>

            <uni-forms-item
              :label="$t('cardManage.updateBank.country')"
              name="country"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="prarms.country"
                :placeholder="$t('cardManage.updateBank.placeholderCountry')"
              />
            </uni-forms-item>

            <uni-forms-item
              :label="$t('cardManage.updateBank.province')"
              name="province"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="prarms.province"
                :placeholder="$t('cardManage.updateBank.placeholderProvince')"
              />
            </uni-forms-item>

            <uni-forms-item
              :label="$t('cardManage.updateBank.city')"
              name="city"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="prarms.city"
                :placeholder="$t('cardManage.updateBank.placeholderCity')"
              />
            </uni-forms-item>
            <uni-forms-item
              :label="$t('cardManage.updateBank.subBranch')"
              name="subBranch"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="prarms.subBranch"
                :placeholder="$t('cardManage.updateBank.placeholderSubBranch')"
              />
            </uni-forms-item>
            <uni-forms-item
              :label="$t('cardManage.updateBank.cardName')"
              name="cardName"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="prarms.cardName"
                :placeholder="$t('cardManage.updateBank.placeholderCardName')"
              />
            </uni-forms-item>
            <uni-forms-item
              :label="$t('cardManage.updateBank.cardNumber')"
              name="cardNumber"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="prarms.cardNumber"
                :placeholder="$t('cardManage.updateBank.placeholderCardNumber')"
              />
            </uni-forms-item>
            <uni-forms-item
              :label="$t('cardManage.updateBank.comfirmCardNum')"
              name="cardNumberTwice"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="prarms.cardNumberTwice"
                :placeholder="
                  $t('cardManage.updateBank.placeholderComfirmCardNum')
                "
              />
            </uni-forms-item>

            <uni-forms-item
              :label="$t('cardManage.updateBank.backCode')"
              name="backCode"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="prarms.backCode"
                :placeholder="$t('cardManage.updateBank.placeholderBackCode')"
              />
            </uni-forms-item>
            <uni-forms-item
              :label="$t('cardManage.updateBank.payPwd')"
              name="payPwd"
            >
              <uni-easyinput
                class="easy-inp"
                v-model="prarms.payPwd"
                type="password"
                :placeholder="$t('cardManage.updateBank.placeholderPayPwd')"
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
                  v-model="prarms.code"
                  :placeholder="
                    $t('cardManage.updateBank.placeholderPhoneCode')
                  "
                />
                <button v-show="btnShow" class="code-btn" @click="getCode">
                  {{ $t("cardManage.updateBank.getCodeBtn") }}
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
                {{ $t("cardManage.updateBank.editBtn") }}
              </button>
            </view>
          </uni-forms>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "updateBank",
  props: ["cardInfo"],
  data() {
    return {
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
      prarms: {
        bankId: "",
        country: "",
        province: "",
        city: "",
        subBranch: "",
        cardName: "",
        cardNumber: "",
        cardNumberTwice: "",
        backCode: "",
        payPwd: "",
        code: "",
      },
      rules: {
        type: {
          subBranch: [
            {
              required: true,
              errorMessage: this.$t(
                "cardManage.updateBank.placeholderSubBranch"
              ),
            },
          ],
        },
        cardName: {
          rules: [
            {
              required: true,
              errorMessage: this.$t(
                "cardManage.updateBank.placeholderCardName"
              ),
            },
          ],
        },
        cardNumber: {
          rules: [
            {
              required: true,
              errorMessage: this.$t(
                "cardManage.updateBank.placeholderCardNumber"
              ),
            },
          ],
        },
        cardNumberTwice: {
          rules: [
            {
              required: true,
              errorMessage: this.$t(
                "cardManage.updateBank.placeholderComfirmCardNum"
              ),
            },
          ],
        },
        payPwd: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("cardManage.updateBank.placeholderPayPwd"),
            },
          ],
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: this.$t(
                "cardManage.updateBank.placeholderPhoneCode"
              ),
            },
          ],
        },
      },
      bankName: "",
      times: 60,
      timeshow: false,
      btnShow: true,
      range: [],
      comboxData: [],
    };
  },
  methods: {
    changeCode(e) {
      this.statuscode = e;
    },
    openPopup() {
      this.$refs.upateBindCard.open();
    },
    closeBind() {
      this.prarms.payPwd = "";
      this.prarms.code = "";
      this.$refs.upateBindCard.close();
    },
    initBanks() {
      console.log(this.cardInfo);

      //获取银行卡信息
      // this.$api.getCardInfo().then((res) => {
      //   if (res.data != null) {
      //     this.prarms = res.data;
      //     this.prarms.cardNumberTwice = res.data.cardNumber;
      //     this.prarms.backCode = res.data.backEncoding;
      //     this.bankName = res.data.bankName;
      //     this.prarms.bankId = res.data.bankId;
      //   }
      // });
      //获取银行列表
      this.$api
        .getBank()
        .then((res) => {
          for (var i = 0; i < res.data.banks.length; i++) {
            if (this.bankName === res.data.banks[i].bankCname) {
              this.prarms.bankId = res.data.banks[i].id;
            }
            var data = new Object();
            data.value = res.data.banks[i].id;
            data.text = res.data.banks[i].bankCname;
            this.comboxData.push(data.text);
            this.range.push(data);
          }
        })
        .catch((err) => {});
    },
    confirm() {
      this.$refs.form.validate().then((res) => {
        this.$api
          .editCard(this.prarms)
          .then((res) => {
            let that = this;
            uni.showToast({
              title: this.$t("cardManage.updateBank.editSuccessMsg"),
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
    changeData(e) {
      //console.log(this.prarms.bankId);
    },
    selectBankName(val) {
      let bankId = "";
      this.range.map(function (item) {
        if (val === item.text) {
          bankId = item.value;
        }
      });
      if (bankId !== "") {
        this.prarms.bankId = bankId;
      } else {
        this.prarms.bankId = "";
      }
    },
  },
  mounted() {
    this.initBanks();
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
  font-size: 18px;
  z-index: 99999;
  padding: 0 15px;
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

  .uni-combox {
    height: 33px;
    background-color: var(--form-main-uni-easyinput__content) !important;
    border: var(--easyinput__border) !important;
    color: var(--easyinput__color);
  }

  &::v-deep .uni-combox__selector {
    background-color: var(--uni-select__selector-bg) !important;
    border: var(--uni-select__solid) !important;
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
