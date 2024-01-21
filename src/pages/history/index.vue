<template>
  <view class="history content"
    ><nav-aside></nav-aside>
    <view class="team-main">
      <view class="team-title">
        <text class="title-text">{{ $t("history.title") }}</text>
        <uni-icons type="close" size="40" @click="$Router.back()"></uni-icons>
      </view>
      <scroll-view
        class="scroll-view_H"
        :scroll-x="true"
        scroll-left="120"
        :show-scrollbar="true"
      >
        <view class="top-btns">
          <button
            class="btn"
            :class="activeBtn === 0 ? 'active' : ''"
            @click="toggleBtn(0)"
          >
            {{ $t("history.depositBtn") }}
          </button>
          <button
            class="btn"
            :class="activeBtn === 1 ? 'active' : ''"
            @click="toggleBtn(1)"
          >
            {{ $t("history.withdrawBtn") }}
          </button>
          <button
            :class="activeBtn === 2 ? 'active' : ''"
            @click="toggleBtn(2)"
            class="btn"
          >
            {{ $t("history.balanceBtn") }}
          </button>
        </view>
      </scroll-view>
    </view>
    <deposit v-if="activeBtn === 0" ref="depositList"></deposit>
    <withdraw v-if="activeBtn === 1" ref="withdrawList"></withdraw>
    <balance v-if="activeBtn == 2" ref="balanceList"></balance>
  </view>
</template>

<script>
import Balance from "./components/balance.vue";
import Deposit from "./components/deposit.vue";
import Withdraw from "./components/withdraw.vue";
export default {
  name: "history",
  components: { Withdraw, Deposit, Balance },
  props: {},
  data() {
    return {
      activeBtn: 0,
    };
  },
  computed: {},
  methods: {
    toggleBtn(index) {
      this.activeBtn = index;
    },
    showMoreCard(index) {
      let moreCard = document.getElementById("showMoreCard" + index);
      let hideCard = document.getElementById("hideCard" + index);
      let showCard = document.getElementById("showCard" + index);
      moreCard.className = "see more hide-style";
      hideCard.className = "hide-card";
      showCard.className += " show-style";
    },
    depositList() {
      this.$refs.depositList.addData();
    },
    withdrawList() {
      this.$refs.withdrawList.addData();
    },
    balanceList() {
      this.$refs.balanceList.addData();
    },
  },
  watch: {},
  //触底事件
  onReachBottom() {
    if (this.activeBtn === 0) {
      this.depositList();
    } else if (this.activeBtn === 1) {
      this.withdrawList();
    } else {
      this.balanceList();
    }
  },
  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style scoped lang="scss">
.history {
  margin-top: 60px;
  .team-main {
    padding: 14px 14px 0 14px;
    background: var(--mar-bg);
    .team-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      .title-text {
        font-size: 15px;
        font-weight: 700;
      }
      .uni-icons {
        color: var(--close-color) !important;
      }
    }
    .top-btns {
      margin: 5px 0 15px 0;
      width: 100%;
      background: var(--mar-bg);
      display: flex;
      flex-direction: row;
      align-items: center;
      .btn {
        height: 33px;
        line-height: 33px;
        font-size: 15px;
        padding: 0 20px;
        border-radius: var(--card-radius);
        color: var(--body-color);
        position: relative;
        background-color: var(--tab-item-bg);
        &:after {
          border: none !important;
        }
      }
      .active {
        height: 36px;
        line-height: 36px;
        font-weight: 700;
        color: #fff;
        background: var(--ac-rec-row-active-bg);
      }
    }
  }
  .history-body {
    padding: 14px;
    border-radius: var(--card-radius) !important;
    .calendar-btn {
      align-items: center;
      height: 50px;
      background-color: var(--form-main-uni-easyinput__content);
      border: var(--easyinput__border) !important;
      box-shadow: var(--shadow-bg);
      border-radius: var(--card-radius) !important;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      &::v-deep .calendar-icon {
        color: #616b89 !important;
        margin-right: 8px;
      }
    }
    .body-top {
      padding: 10px 0 10px 0;
      display: flex;
      justify-content: space-between;
      color: var(--text-gray-color);
      border-bottom: 1px dashed var(--dotted-bg-1);
    }
    .card-body {
      margin-top: 10px;
      margin-bottom: 12px;
      border-radius: var(--card-radius);
      overflow: hidden;
      box-shadow: var(--shadow-bg);
      color: var(--body-color);
      background: var(--card-style);
      box-shadow: 0 6px 14px 0 rgba(11, 8, 108, 0.063);
      .show-card {
        padding: 10px 0 10px 0;
        .show-card-text {
          display: flex;
          align-items: center;
          .show-text1 {
            padding: 5px 0 0 10px;
            text-align: left;
            width: 33.3333333333%;
          }
          .show-text2 {
            padding: 5px 0 0 0;
            text-align: center;
            width: 33.3333333333%;
          }
          .show-text3 {
            padding: 5px 10px 0 0;
            text-align: center;
            width: 33.3333333333%;
          }
        }
        .card-time {
          font-size: 15px;
          padding: 10px 0 5px 10px;
          color: var(--text-gray-color);
        }
        .see-more {
          font-size: 15px;
          text-align: center;
          padding: 10px;
          color: var(--blue-color);
        }
      }
      .hide-card {
        display: flex;
        flex-direction: column;
        font-size: 15px;
        padding: 10px 0 10px 0;
        .font-left {
          color: var(--text-gray-color);
          padding: 5px 10px 5px 10px;
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
  .show-text {
    flex: 0 0 33.3333%;
    align-items: center;
    justify-content: flex-start;
  }
  .text-green {
    color: var(--green-light-color) !important;
  }
  .text-right {
    text-align: right;
  }
  .font-right {
    padding: 0 0 0 5px;
    color: var(--navbar-color);
  }
  .icon-fuzhi {
    background: var(--bar-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hide-style {
    display: none !important;
  }
  .show-style {
    background: var(--bs-popup-hd) !important;
  }
}
</style>
