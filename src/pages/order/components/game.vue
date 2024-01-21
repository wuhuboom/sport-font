<template>
  <view class="game">
    <!-- <view class="filter">
      <view class="calendar-btn" @click="$refs.calendar.open()">
        <uni-icons custom-prefix="iconfont" type="icon-rili" size="16">
        </uni-icons>
        <text>Select date</text>
      </view>
    </view> -->

    <view class="select-box">
      <uni-data-select v-model="selectTime" :clear="false" :localdata="timeOptions"
        @change="changeTime"></uni-data-select>
    </view>
    <view class="main">
      <template v-if="result">
        <GameCard v-for="(item, index) in result" :key="index" :item="item"></GameCard>
      </template>
      <no-data v-else></no-data>
    </view>

    <!-- <uni-calendar
      ref="calendar"
      :range="true"
      :insert="false"
      @confirm="$refs.calendar.close()"
    /> -->
  </view>
</template>
<script>
import GameCard from './game-card.vue'
export default {
  name: 'game',
  components: { GameCard },
  props: {},
  data() {
    return {
      selectTime: 5,
      timeOptions: [
        {
          text: this.$t("order.time.today"),
          value: 1
        },
        {
          text: this.$t("order.time.yesterday"),
          value: 2
        },
        {
          text: this.$t("order.time.week"),
          value: 3
        },
        {
          text: this.$t("order.time.ten"),
          value: 4
        },
        {
          text: this.$t("order.time.month"),
          value: 5
        },
      ],
      result: null
    };
  },
  computed: {},
  methods: {
    changeTime(value) {
      this.getData({time: value})
    },
    getData(model) {
      this.$api.report({...model}).then(res => {
          this.result = res.data
      })
    },
  },
  watch: {},
  mounted() {
    this.getData({time: this.selectTime})
  },
};
</script>
<style scoped lang="scss">
.game {
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
  }

  .select-box {
    min-width: 48%;

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
}</style>
