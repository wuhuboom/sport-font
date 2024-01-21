<template>
  <view class="withdrawal">
    <uni-collapse class="info-content">
      <uni-collapse-item class="info-card">
        <template #title>
          <view class="card-title">
            <text class="title-left">{{ $t("info.withdrawal.title") }}</text>
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
            <uni-forms-item :label="$t('info.withdrawal.old')" name="password">
              <uni-easyinput
                class="input"
                v-model="formData.password"
                type="password"
                :placeholder="$t('info.withdrawal.oldplace')"
              />
            </uni-forms-item>
            <uni-forms-item :label="$t('info.withdrawal.new')" name="newPass">
              <uni-easyinput
                class="input"
                v-model="formData.newPass"
                type="password"
                :placeholder="$t('info.withdrawal.newplace')"
              />
            </uni-forms-item>
            <uni-forms-item
              class="last-item"
              :label="$t('info.withdrawal.confirm')"
              name="confirm"
            >
              <uni-easyinput
                class="input"
                v-model="formData.confirm"
                type="password"
                :placeholder="$t('info.withdrawal.confirmplace')"
              />
            </uni-forms-item>
          </uni-forms>
          <button class="card-btn" @click="submit">Confirm</button>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>
<script>
export default {
  name: "withdrawal",
  components: {},
  props: {},
  data() {
    return {
      formData: {
        password: "",
        newPass: "",
        confirm: "",
      },
      rules: {
        newPass: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("info.withdrawal.newplace"),
            },
          ],
        },
        confirm: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("info.withdrawal.confirmplace"),
            },
          ],
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: this.$t("info.withdrawal.oldplace"),
            },
          ],
        },
      },
    };
  },
  computed: {},
  methods: {
    submit() {
      this.$refs.form.validate().then((res) => {
        this.$api
          .changePayPwd({
            origin: this.formData.password,
            newPwd: this.formData.newPass,
            twicePwd: this.formData.confirm,
          })
          .then((res) => {
            this.formData = {
              password: "",
              newPass: "",
              confirm: "",
            };
            uni.showToast({
              title: this.$t("info.email.success"),
            });
          });
      });
    },
  },
  watch: {},
  onLoad() {},
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
