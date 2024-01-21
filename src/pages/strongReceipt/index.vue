<template>
  <view class="content strongTransfer bg">
    <view class="strongTransfer-main">
      <view class="top-title">
        <uni-icons
          class="title-icon"
          type="back"
          size="30"
          @click="$Router.back()"
        ></uni-icons>
        <text class="title-font">{{ $t("receipt.title") }}</text>
        <text class="top-t"></text>
      </view>
    </view>
    <view class="header">
      <button
        class="btn"
        :class="activeBtn === 1 ? 'active' : ''"
        @click="toggleBtn(1)"
      >
        {{ $t("receipt.rangData.recharge") }}
      </button>
      <button
        class="btn"
        :class="activeBtn === 2 ? 'active' : ''"
        @click="toggleBtn(2)"
      >
        {{ $t("receipt.rangData.transfer") }}
      </button>
      <button
        class="btn"
        :class="activeBtn === 3 ? 'active' : ''"
        @click="toggleBtn(3)"
      >
        {{ $t("receipt.rangData.relocate") }}
      </button>
      <button
        class="btn"
        :class="activeBtn === 4 ? 'active' : ''"
        @click="toggleBtn(4)"
      >
        {{ $t("receipt.rangData.discount") }}
      </button>
    </view>
    <view class="ts-dsd">
      <view v-for="(item, index) in data" :key="index" class="ts-tx">
        <view class="tex-ts">
          <view class="dss-t">
            <p class="tx">{{ changeType(item.changeType) }}</p>
            <uni-icons
              type="list"
              color=""
              size="20"
              @click="toggle(item)"
            ></uni-icons>
          </view>
          <p>{{ item.orderNo }}</p>
        </view>
        <view class="tex-ts txds">
          <p class="ddd">{{ item.changeMoney / amountRate }}</p>
          <p class="tx">{{ safeFormatTime(item.createdAt) }}</p>
        </view>
      </view>
    </view>
    <no-data v-if="data.length == 0"></no-data>
    <!-- 普通弹窗 -->
    <uni-popup ref="popup" background-color="">
      <view class="popupBox">
        <view class="pop-ttt">
          <p class="pop-p">{{ $t("receipt.popup.orderNo") }}</p>
          <p class="pop-tx">{{ popupData.orderNo }}</p>
        </view>
        <view class="pop-ttt">
          <p class="pop-p">{{ $t("receipt.popup.creationDate") }}</p>
          <p class="pop-tx">{{ safeFormatTime(popupData.date) }}</p>
        </view>
        <view class="pop-ttt">
          <p class="pop-p">{{ $t("receipt.popup.confirmationDate") }}</p>
          <p class="pop-tx">{{ safeFormatTime(popupData.date) }}</p>
        </view>
        <view class="pop-ttt">
          <p class="pop-p">{{ $t("receipt.popup.state") }}</p>
          <p class="pop-tx">sussess</p>
        </view>
        <view v-if="params.changeType == 2" class="pop-ttt">
          <p class="pop-p">{{ $t("receipt.popup.transferPerson") }}</p>
          <p class="pop-tx">{{ popupData.zhr }}</p>
        </view>
        <view v-if="params.changeType == 2" class="pop-ttt">
          <p class="pop-p">{{ $t("receipt.popup.payee") }}</p>
          <p class="pop-tx">{{ szr }}</p>
        </view>
        <view class="pop-ttt">
          <p class="pop-p">{{ $t("receipt.popup.amount") }}</p>
          <p class="pop-tx">{{ popupData.changeMoney / amountRate }}</p>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "recharge",
  data() {
    return {
      activeBtn: 1,
      params: {
        changeType: "1",
        pageNo: 1,
        pageSize: 10,
      },
      szr: "",
      data: [],
      totalPage: 1,
      popupData: {
        orderNo: "",
        date: "",
        status: "",
        zhr: "",
        changeMoney: "",
      },
    };
  },
  methods: {
    toggleBtn(index) {
      this.activeBtn = index;
      this.params.changeType = index;
      this.init();
    },
    init() {
      this.$api.safeChangeLog(this.params).then((res) => {
        this.totalPage = res.data.totalPage;
        if (this.params.pageNo == 1) {
          this.data = res.data.results;
        } else {
          this.data = this.data.concat(res.data.results);
        }
      });
    },
    toggle(item) {
      this.$refs.popup.open("center");
      this.popupData.orderNo = item.orderNo;
      this.popupData.date = item.createdAt;
      this.popupData.changeMoney = item.changeMoney;
      if (item.changeType == 2) {
        this.popupData.zhr = item.playerName;
        this.$api
          .safeTransferLog({ orderNo: this.popupData.orderNo })
          .then((res) => {
            this.szr = res.data.results[0].aimName;
          })
          .catch((error) => {
            this.szr = this.$t("receipt.popup.unknown");
          });
      }
    },
    changeType(type) {
      switch (type) {
        case 1:
          return this.$t("receipt.rangData.recharge");
          break;
        case 2:
          return this.$t("receipt.rangData.transfer");
          break;
        case 3:
          return this.$t("receipt.rangData.discount");
          break;
        case 4:
          return this.$t("receipt.rangData.relocate");
          break;
      }
    },
    safeFormatTime(times) {
      let time = new Date(times);
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      return (
        (d < 10 ? "0" + d : d) +
        "." +
        (m < 10 ? "0" + m : m) +
        "." +
        (y < 10 ? "0" + y : y)
      );
    },
  },
  mounted() {
    this.init();
  },
  onReachBottom() {
    if (this.totalPage <= this.params.pageNo) {
      return false;
    }
    this.params.pageNo += 1;
    this.init();
  },
};
</script>

<style scoped lang="scss">
.strongTransfer {
  .strongTransfer-main {
    padding: 10px;
    background: var(--mar-bg);
    position: relative;
    .top-title {
      display: flex;
      justify-content: space-between;
      text-align: center;
      align-items: center;
      .title-font {
        font-size: 18px;
        font-weight: 700;
        color: var(--page-title-color);
      }
      .title-icon {
        color: var(--close-color) !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .top-t {
        width: 10%;
      }
    }
    .bottom-btns {
      align-items: center;
      margin: 15px 0 10px 0;
      .btn {
        display: inline-block;
        padding: 0 31px;
        border-radius: var(--tab-radius);
        width: auto;
        font-size: 15px;
        height: 36px;
        line-height: 36px;
      }
    }
  }
  .header {
    padding: 12px;
    background: var(--mar-bg);
    white-space: nowrap;
    overflow-x: scroll;
    .btn {
      height: 30px;
      font-size: 12px;
      margin-right: 10px;
      padding: 0 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      border-radius: var(--card-radius);
      color: var(--body-color);
      padding: 0 10px;
      min-width: 20%;
      background-color: var(--tab-item-bg);
      &:after {
        border: none !important;
      }
    }
    .active {
      height: 34px;
      font-weight: 700;
      color: #fff;
      background: var(--ac-rec-row-active-bg);
    }
  }
  .ts-dsd {
    margin: 10px auto;
    width: 95%;
    .ts-tx {
      margin-top: 10px;
      padding: 10px;
      color: var(--body-color);
      border-radius: var(--card-radius);
      background: var(--card-style);
      box-shadow: var(--card-shadow);

      .tex-ts {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        .dss-t {
          width: 28%;
          display: flex;
          align-content: center;
          justify-content: space-around;
        }
        .ddd {
          font-size: 18px;
          color: var(--index-more-color);
        }
      }
    }
  }
  .popupBox {
    padding: 20px 10px;
    border-radius: 16px;
    background: var(--table-top-color) !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    .pop-ttt {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      padding: 10px 0;
      .pop-p {
        color: var(--close-color) !important;
        padding: 0 20px 0 0;
      }
      .pop-tx {
        padding: 0 0 0 20px;
        font-size: 16px;
      }
    }
  }
}
</style>
