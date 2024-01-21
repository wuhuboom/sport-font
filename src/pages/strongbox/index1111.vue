<template>
  <view class="content strongbox">
    <view class="top">
      <view class="icon-back" @click="backHome"></view>
      <view class="title">{{ $t("strongBox.title") }}</view>
      <view class="icon-right" @click="goReceipt">
        <view class="top-right-img"></view>
        <p class="top-right-p">{{ $t("strongBox.bill") }}</p>
      </view>
    </view>
    <view class="mid">
      <view class="mid-left">
        <view class="mid-left-icon">
          <image
            class="mid-left-coin img"
            src="/static/images/strongbox/coin.png"
          />
        </view>
        <view class="mid-left-icon">
          <image
            class="mid-left-dollar1 img"
            src="/static/images/strongbox/dollar1.png"
          />
        </view>
        <view class="mid-left-icon">
          <image
            class="mid-left-dollar2 img"
            src="/static/images/strongbox/dollar2.png"
          />
        </view>
      </view>
      <view class="mid-right">
        <view class="balance mid-right-icon"
          >{{ $t("strongBox.balance") }}
          <span class="balance-span">:{{ symbol }}{{ money }}</span></view
        >
        <view class="grandTotal mid-right-icon"
          >{{ $t("strongBox.todayAmount") }}:{{ symbol }}{{ todayIncome }}</view
        >
        <view class="yesterday mid-right-icon"
          >{{ $t("strongBox.grandTotalAmount") }}:{{ symbol
          }}{{ totalIncome }}</view
        >
      </view>
    </view>
    <view class="box-one box-flex">
      <view class="box-one-left box" @click="goTransfer">
        <image class="box-image" src="/static/images/strongbox/transfer.png" />
        <view class="box-font">
          <p class="box-font-title">{{ $t("strongBox.transfer") }}</p>
          <!-- <P class="box-font-p">({{ $t("strongBox.transferIllustrate") }})</P> -->
        </view>
      </view>
      <view class="box-one-right box" @click="goRelocate">
        <image class="box-image" src="/static/images/strongbox/allocate.png" />
        <view class="box-font">
          <p class="box-font-title">{{ $t("strongBox.huaZhuan") }}</p>
          <!-- <P class="box-font-p">({{ $t("strongBox.huaZhuanSm") }})</P> -->
        </view>
      </view>
    </view>
    <view class="box-two box-flex">
      <view class="box-two-left box" @click="toggle">
        <image class="box-image" src="/static/images/strongbox/recharge.png" />
        <view class="box-font">
          <p class="box-font-title">{{ $t("strongBox.recharge") }}</p>
          <!-- <P class="box-font-p">({{ $t("strongBox.rechargeSm") }})</P> -->
        </view>
      </view>
      <view class="box-two-right box" @click="goDetails">
        <image class="box-image" src="/static/images/strongbox/detail.png" />
        <view class="box-font">
          <p class="box-font-title">{{ $t("strongBox.illustrate") }}</p>
          <!-- <P class="box-font-p">({{ $t("strongBox.illustrateSm") }})</P> -->
        </view>
      </view>
    </view>
    <view>
      <!-- 普通弹窗 -->
      <uni-popup background-color="transparent" ref="popup">
        <Recharge></Recharge>
      </uni-popup>
    </view>
    <u-tabbar></u-tabbar>
  </view>
</template>

<script>
import Recharge from "./components/recharge.vue";
export default {
  components: { Recharge },
  data() {
    return {
      money: "",
      todayIncome: "",
      totalIncome: "",
      symbol: "",
    };
  },
  computed: {},
  methods: {
    getSafeInfo() {
      this.$api.safeInfo().then((res) => {
        this.money = res.data.money / this.amountRate;
        this.todayIncome = res.data.todayIncome / this.amountRate;
        this.totalIncome = res.data.totalIncome / this.amountRate;
        this.symbol = res.data.symbol;
      });
    },
    backHome() {
      this.$Router.push("/");
    },
    goTransfer() {
      this.$Router.push("/strongTransfer");
    },
    goDetails() {
      this.$Router.push("/strongDetails");
    },
    goReceipt() {
      this.$Router.push("/strongReceipt");
    },
    goRelocate() {
      this.$Router.push("/strongRelocate");
    },
    toggle() {
      this.$refs.popup.open("center");
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.getSafeInfo();
  },
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
.strongbox {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/static/images/strongbox/bg.png");
  .top {
    padding: 10% 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .icon-back {
      width: 43px;
      height: 19px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url("/static/images/strongbox/back.png");
    }

    .title {
      font-family: "Century Gothic Bold";
      font-size: 24px;
      letter-spacing: 3px;
      color: #fff;
    }
    .icon-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      .top-right-img {
        width: 27px;
        height: 33px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url("/static/images/strongbox/receipt.png");
      }
      .top-right-p {
        padding-top: 5px;
        font-weight: 600;
        font-family: Arial, "Microsoft YaHei";
        font-size: 12px;
        color: #fff;
        letter-spacing: 1px;
      }
    }
  }
  .mid {
    width: 85%;
    margin: auto;
    border: 1px solid rgb(60, 86, 147, 0.5);
    background-color: rgb(60, 86, 147, 0.5);
    border-radius: 8px;
    display: flex;
    padding: 10px 0;
    .mid-left {
      width: 20%;
      display: flex;
      flex-direction: column;
      .mid-left-coin {
        width: 34px;
        height: 17px;
      }
      .mid-left-dollar1 {
        width: 7px;
        height: 13px;
      }
      .mid-left-dollar2 {
        width: 15px;
        height: 13px;
      }
    }
    .mid-right {
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      .balance {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 3px;
        font-family: "Arial";
        .balance-span {
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 1px;
        }
      }
      .grandTotal {
        font-size: 12px;
        color: #fff;
        font-weight: 500;
        font-family: "Arial";
        letter-spacing: 1px;
      }
      .yesterday {
        font-size: 12px;
        color: #fff;
        font-family: "Arial";
        letter-spacing: 1px;
      }
    }
  }
  .box-one {
    padding-top: 10%;
    .box-one-left {
      background-image: url("/static/images/strongbox/box1.png");
    }
    .box-one-right {
      background-image: url("/static/images/strongbox/box2.png");
    }
  }
  .box-two {
    padding-top: 20px;
    .box-two-left {
      background-image: url("/static/images/strongbox/box3.png");
    }
    .box-two-right {
      background-image: url("/static/images/strongbox/box4.png");
    }
  }
}
.mid-left-icon {
  height: 5vh;
  text-align: right;
  line-height: 5vh;
}
.mid-right-icon {
  height: 5vh;
  text-align: left;
  line-height: 5vh;
}
.box-image {
  width: 58px;
  height: 58px;
}
.box-font-title {
  color: #fff;
  text-align: center;
  font-size: 14px;
}
.box-font-p {
  color: #fff;
  transform: scale(0.7);
  white-space: nowrap;
}
.box-flex {
  display: flex;
  width: 85%;
  margin: auto;
  justify-content: space-between;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 40vw;
  height: 20vh;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
