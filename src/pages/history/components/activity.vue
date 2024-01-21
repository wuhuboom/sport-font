<template>
  <view class="billing">
    <view class="filter">
      <view class="calendar-btn" @click="$refs.calendar.open()">
        <uni-icons custom-prefix="iconfont" type="icon-rili" size="16">
        </uni-icons>
        <text>Select date</text>
      </view>
      <view class="select-box">
        <uni-data-select
          v-model="selecValue"
          :clear="false"
          :localdata="selectOptions"
        >
          ></uni-data-select
        >
      </view>
    </view>
    <view class="main">
      <view class="body-top">
        <text>Type</text>
        <text>Remarks</text>
        <text>Amount</text>
      </view>
      <no-data></no-data>
    </view>

    <uni-calendar
      ref="calendar"
      :range="true"
      :insert="false"
      @confirm="$refs.calendar.close()"
    />
  </view>
</template>
<script>
export default {
  name: "billing",
  components: {},
  props: {},
  data() {
    return {
      selecValue: "Bonus",
      selectOptions: [
        {
          text: "Bonus",
          value: "Bonus",
        },
        {
          text: "Promotions",
          value: "Promotions",
        },
      ],
    };
  },
  computed: {},
  methods: {
    handleSelect(option) {
      this.selecValue = option;
    },
  },
  watch: {},
  onLoad() {},
};
</script>
<style scoped lang="scss">
.billing {
  padding: 14px;
  .filter {
    display: flex;
    height: 50px;
    align-items: center;
    .calendar-btn {
      width: 100%;
      padding: 0 8px;
      height: 50px;
      background-color: var(--form-main-uni-easyinput__content);
      border: var(--easyinput__border) !important;
      box-shadow: var(--shadow-bg);
      border-radius: var(--card-radius) !important;
      color: var(--easyinput__color) !important;
      line-height: 50px;
      margin-right: 10px;
      .uni-icons {
        color: var(--easyinput__color) !important;
        margin-right: 8px;
      }
    }
    .select-box {
      min-width: 35%;
      margin-left: 7px;
      &::v-deep .uni-select {
        background-color: var(--form-main-uni-easyinput__content);
        border: var(--easyinput__border) !important;
        box-shadow: var(--shadow-bg);
        height: 50px;
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
  }
  .main {
    .body-top {
      padding: 10px 0 10px 0;
      display: flex;
      justify-content: space-between;
      color: var(--text-gray-color);
      border-bottom: 1px dashed var(--dotted-bg-1);
    }
  }
  .uni-calendar {
    &::v-deep .uni-calendar__content {
      background: var(--calendar-content-bg);
      .uni-calendar--fixed-top {
        border: none;
      }
      .uni-calendar__header {
        border: none;
      }
      .uni-calendar__header-text {
        color: var(--text-gray-color);
      }
      .uni-calendar__weeks-day {
        border: none;
      }
      .uni-calendar-item--disable {
        background-color: var(--calendar-content-bg);
        color: rgb(136, 136, 136);
        font-weight: 800;
      }
      .uni-calendar-item--multiple {
        color: rgb(255, 255, 255) !important;
        background-color: var(--rangeBgColor-bg);
        font-weight: 800;
      }
      .uni-calendar-item__weeks-box-text {
        color: var(--text-gray-color);
        font-weight: 800;
      }

      .uni-calendar-item--checked {
        background-color: var(--calendar-active-bg);
        color: rgb(255, 255, 255) !important;
        font-weight: 800;
      }
      .uni-calendar-item--before-checked {
        background-color: var(--calendar-active-bg);
      }
      .uni-calendar-item--after-checked {
        background-color: var(--calendar-active-bg);
      }
      .uni-calendar-item__weeks-lunar-text {
        color: var(--calendar-active-bg);
      }
      .uni-calendar-item--isDay {
        background-color: var(--calendar-active-bg);
        color: rgb(255, 255, 255) !important;
      }
    }
  }
}
</style>
