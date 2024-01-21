<template>
  <view class="wave">
    <view class="filter">
      <!--<view class="calendar-btn" @click="$refs.calendar.open()">
        <uni-icons custom-prefix="iconfont" type="icon-rili" size="16">
        </uni-icons>
        <text>Select date</text>
      </view> -->
      <view class="select-box">
        <uni-data-select v-model="selectTime" :clear="false" :localdata="timeOptions"
          @change="changeTime"></uni-data-select>
      </view>
      <view class="select-box">
        <uni-data-select v-model="selecValue" :clear="false" :localdata="selectOptions"
          @change="changeType"></uni-data-select>
      </view>
    </view>
    <view class="main">
      <no-data v-if="result.length == 0"></no-data>
      <template v-else>
        <WaveCard v-for="(item, index) in result" :key="index" :item="item"></WaveCard>
      </template>
    </view>

   <!-- <uni-calendar ref="calendar" :range="true" :insert="false" @confirm="$refs.calendar.close()" /> -->
  </view>
</template>
<script>
import WaveCard from './wave-card.vue'
export default {
  name: 'wave',
  components: { WaveCard },
  props: {},
  data() {
    return {
      selecValue: 1,
      selectOptions: [
        {
          text: this.$t("order.type.all"),
          value: 1,
        },
      ],
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
      pageNo: 1,
      pageSize: 20,
      totalPage: null,
      result: []
    };
  },
  computed: {},
  methods: {
    changeTime(value) {
      this.getData({time: value, type: this.selecValue}, true)
    },
    changeType(value){

      this.getData({time: this.selectTime, type: value}, true)
    },
    getData(model, isNew) {
      this.$api.getBets({...model}).then(res => {
        this.pageNo = res.data.pageNo;
        this.pageSize = res.data.pageSize;
        this.totalPage = res.data.totalPage
        if(isNew){
          this.result = res.data.results
        }else{
          this.result = this.result.concat(res.data.results)
        }
      })
    },
    scrollBottom() {
      if (this.totalPage > this.pageNo) {
        this.getData({ pageNo: this.pageNo + 1 })
      }
    }
  },
  watch: {},
  mounted() {
    this.getData()
  },
};
</script>
<style scoped lang="scss">
.wave {
  overflow: scroll;
  padding: 14px;

  .filter {
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    /* .calendar-btn { */
    /*   width: 100%; */
    /*   padding: 0 8px; */
    /*   height: 50px; */
    /*   background-color: var(--form-main-uni-easyinput__content); */
    /*   border: var(--easyinput__border) !important; */
    /*   box-shadow: var(--shadow-bg); */
    /*   border-radius: var(--card-radius) !important; */
    /*   color: var(--easyinput__color) !important; */
    /*   line-height: 50px; */
    /*   margin-right: 10px; */
    /**/
    /*   .uni-icons { */
    /*     color: var(--easyinput__color) !important; */
    /*     margin-right: 8px; */
    /*   } */
    /* } */

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
}</style>
