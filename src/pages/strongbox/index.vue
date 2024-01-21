<template>
  <view class="content strongbox">
    <view class="strongbox-main">
      <view class="top-title">
        <uni-icons
          class="title-icon"
          type="back"
          size="30"
          @click="$Router.back()"
        ></uni-icons>
        <text class="title-font">{{ $t("strongBox.title") }}</text>
        <text class="mingxi" @click="goReceipt"></text>
        <!-- <text class="mingxi" @click="goReceipt">{{
           $t("strongBox.bill")
        }}</text> -->
      </view>
    </view>
    <view class="main-cont">
      <view class="mid">
        <view class="md-txt">
          <view class="yue">{{ $t("strongBox.balance") }} </view>
          <view class="amount"
            >{{ symbol }} {{ money }}
            <text class="reload" @click="getSafeInfo"
              ><uni-icons type="reload" color="" size="30"></uni-icons></text
          ></view>
          <view class="botton">
            <view>
              <view>{{ $t("strongBox.todayAmount") }}</view>
              <view class="left-text">{{ symbol }} {{ todayIncome }}</view>
            </view>
            <view>
              <view>{{ $t("strongBox.grandTotalAmount") }}</view>
              <view class="rig-text">{{ symbol }} {{ totalIncome }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="menus">
        <view class="m-txt" @click="goTransfer">
          <image class="box-image" src="/static/images/safeBox/zz.png" />
          <view class="b-tx">{{ $t("strongBox.transfer") }}</view>
        </view>
        <view class="m-txt" @click="goChongzhi">
          <image class="box-image" src="/static/images/safeBox/cz.png" />
          <view class="b-tx">{{ $t("strongBox.recharge") }}</view>
        </view>
        <view class="m-txt" @click="goRelocate">
          <image class="box-image" src="/static/images/safeBox/tx.png" />
          <view class="b-tx">{{ $t("strongBox.huaZhuan") }}</view>
        </view>
        <view class="m-txt" @click="goReceipt">
          <image class="box-image" src="/static/images/safeBox/mx.png" />
          <view class="b-tx">{{ $t("strongBox.bill") }}</view>
        </view>
        <view class="m-txt" @click="gocebuy" v-if="false">
          <image class="box-image" src="/static/images/safeBox/zz.png" />
          <view class="b-tx">c2c</view>
        </view>
      </view>
      <view class="tx-sm">
        <view class="tx-tx">
          <view class="tit">{{ $t("illustrate.title") }}：</view>
          <view class="txt1">{{ $t("illustrate.illustrateList.one") }}</view>
          <view class="txt">{{ $t("illustrate.illustrateList.two") }}</view>
          <view class="txt">{{ $t("illustrate.illustrateList.three") }}</view>
          <view class="txt">{{ $t("illustrate.illustrateList.Four") }}</view>
        </view>
      </view>
    </view>
    <u-tabbar></u-tabbar>
  </view>
</template>

<script>
import NavAside from "@/components/nav-aside/nav-aside.vue";
import Recharge from "./components/recharge.vue";
export default {
  components: { Recharge, NavAside },
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
    goChongzhi() {
      this.$Router.push("/safeBoxcz");
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
    gocebuy() {
      this.$Router.push("/cebuy");
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
  .strongbox-main {
    padding: 15px;
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
      .mingxi {
        font-size: 14px;
        color: var(--index-more-color);
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
  .main-cont {
    padding: 12px;
    .mid {
      min-height: 180px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url("/static/images/safeBox/bg.png");
      .md-txt {
        font-family: "STKaiti";
        padding: 0 15px 0 20px;
        color: #fff;
        .yue {
          padding-top: 10px;
          font-size: 18px;
        }
        .amount {
          padding-top: 20px;
          font-size: 26px;
          font-weight: 500;
          .reload {
            margin-left: 10px;
          }
        }
        .botton {
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          .left-text {
            margin-top: 10px;
          }
          .rig-text {
            margin-top: 10px;
            text-align: right;
          }
        }
      }
    }
  }
  .menus {
    height: 120px;
    align-items: center;
    display: flex;
    justify-content: space-around;
    .m-txt {
      text-align: center;
      .box-image {
        width: 30px;
        height: 30px;
      }
      .b-tx {
        margin-top: 5px;
      }
    }
  }
  .tx-sm {
    width: 100%;
    min-height: 200px;
    border-radius: 8px;
    font-size: 14px;
    background-color: var(--box-backgroud-color);
    border: 1px solid var(--box-backgroud-border);
    .tx-tx {
      padding: 15px 10px;
      .tit {
        font-size: 18px;
      }
      .txt1 {
        padding: 10px 0 5px 0;
      }
      .txt {
        padding: 5px 0;
      }
    }
  }
}
</style>
