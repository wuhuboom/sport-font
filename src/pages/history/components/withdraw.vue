<template>
  <view class="deposit-withdraw">
    <view class="history-body">
      <uni-data-select
        class=""
        v-model="params.time"
        :localdata="range"
        :clear="false"
        @change="change"
      ></uni-data-select>
      <view class="body-top">
        <text>{{ $t("history.withdraw.typeTimeHd") }}</text>
        <text>{{ $t("history.withdraw.AmountHd") }}</text>
        <text>{{ $t("history.withdraw.StatusHd") }}</text>
      </view>
      <view class="card-body" v-for="(item, index) in datas" :key="index">
        <view class="show-card" :id="'showCard' + item.id">
          <view class="show-card-text">
            <text class="show-text1 show-text">{{
              item.type === "1"
                ? $t("history.withdraw.typeBank")
                : $t("history.withdraw.typeUstd")
            }}</text>
            <text class="show-text2 show-text">{{
              item.money / amountRate
            }}</text>
            <text class="show-text3 show-text">{{
              statusType(item.status)
            }}</text>
          </view>
          <view class="card-time">{{ formatTimes(item.createdAt) }}</view>
          <view
            class="see-more"
            :id="'showMoreCard' + item.id"
            @click="showMoreCard(item.id)"
            >{{ $t("history.withdraw.seeMoreBtn") }}</view
          >
        </view>
        <view class="hide-card hide-style" :id="'hideCard' + item.id">
          <view class="font-left text-right"
            >{{ $t("history.withdraw.objectionText")
            }}<text class="text-green font-right" @click="onlineService">{{
              $t("history.withdraw.serviceBtn")
            }}</text></view
          >
          <view class="font-left"
            >{{ $t("history.withdraw.usdtRate") }}:<text class="font-right">{{
              item.usdtRate
            }}</text></view
          >
          <view class="font-left"
            >{{ $t("history.withdraw.orderNo") }}:<text class="font-right">{{
              item.orderNo
            }}</text
            ><uni-icons
              @click="copyCode(item.orderNo)"
              class="icon-fuzhi"
              custom-prefix="iconfont"
              type="icon-fuzhi"
              size="20"
            ></uni-icons
          ></view>
          <view class="font-left"
            >{{ $t("history.withdraw.usdtMoney") }}:<text class="font-right">{{
              item.usdtMoney / amountRate
            }}</text></view
          >
          <view class="font-left"
            >{{ $t("history.withdraw.commission") }}:<text class="font-right">{{
              item.commission / amountRate
            }}</text></view
          >
          <view class="font-left"
            >{{ $t("history.withdraw.Remarks") }}:<text class="font-right">{{
              item.remark
            }}</text></view
          >
        </view>
      </view>
    </view>
    <no-data v-if="nodataStatus == 0"></no-data>
  </view>
</template>

<script>
import { formatTime } from "@/utils";
import NoData from "@/components/no-data/no-data.vue";
export default {
  name: "deposit-withdraw",
  components: { NoData },
  data() {
    return {
      range: [
        { value: "", text: this.$t("history.withdraw.selectAll") },
        { value: 1, text: this.$t("history.withdraw.selectToday") },
        { value: 2, text: this.$t("history.withdraw.selectYesterday") },
        { value: 3, text: this.$t("history.withdraw.selectSeven") },
        { value: 4, text: this.$t("history.withdraw.selectTen") },
        { value: 5, text: this.$t("history.withdraw.selectThiry") },
      ],
      activeBtn: 0,
      params: {
        time: 1,
        status: "",
        pageNo: 1,
        pageSize: 20,
      },
      datas: [],
      totalPage: 0,
      nodataStatus: 0,
    };
  },
  computed: {},
  methods: {
    initData() {
      this.$api
        .withdrawalLog(this.params)
        .then((res) => {
          this.totalPage = res.data.totalPage;
          res.data.results.length !== 0
            ? (this.nodataStatus = 1)
            : (this.nodataStatus = 0);
          if (this.params.pageNo == 1) {
            this.datas = res.data.results;
          } else {
            this.datas = this.datas.concat(res.data.results);
          }
        })
        .catch((err) => {});
    },
    toggleBtn(index) {
      this.activeBtn = index;
    },
    copyCode(value) {
      uni.setClipboardData({
        data: value,
        success: () => {
          uni.showToast({ title: this.$t("history.withdraw.copeMsg") });
        },
      });
    },
    showMoreCard(index) {
      let moreCard = document.getElementById("showMoreCard" + index);
      let hideCard = document.getElementById("hideCard" + index);
      let showCard = document.getElementById("showCard" + index);
      moreCard.className = "see more hide-style";
      hideCard.className = "hide-card";
      showCard.className += " show-style";
    },
    addData() {
      if (this.totalPage <= this.params.pageNo) {
        return false;
      }
      this.params.pageNo += 1;
      this.initData();
    },
    change(e) {
      this.params.pageNo = 1;
      this.params.time = e;
      this.initData();
    },
    formatTimes(times) {
      return formatTime(times);
    },
    onlineService() {
      this.$api.getServ().then((res) => {
        window.location.href = res.data.serviceAddr;
      });
    },
    statusType(val) {
      switch (val) {
        case 1:
          return this.$t("history.withdraw.statusToBeReviewed");
        case 2:
          return this.$t("history.withdraw.statusAudited");
        case 3:
          return this.$t("history.withdraw.statusFail");
        case 4:
          return this.$t("history.withdraw.statusSuccess");
        case 5:
          return this.$t("history.withdraw.statusPayment");
      }
    },
  },
  mounted() {
    this.initData();
  },
  watch: {},
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
.deposit-withdraw {
  .history-body {
    padding: 14px;
    border-radius: var(--card-radius) !important;
    .body-top {
      padding: 10px 0 10px 0;
      display: flex;
      justify-content: space-between;
      color: var(--text-gray-color);
      border-bottom: 1px dashed var(--dotted-bg-1);
    }
    &::v-deep .uni-select {
      margin-top: 15px;
      font-size: 16px;
      background-color: var(--form-main-uni-easyinput__content);
      color: var(--easyinput__color);
      border: var(--easyinput__border) !important;
      box-shadow: var(--shadow-bg);
      box-sizing: border-box;
      border-radius: 8px;
      padding: 0 5px;
      padding-left: 10px;
      position: relative;
      display: flex;
      -webkit-user-select: none;
      user-select: none;
      flex-direction: row;
      align-items: center;
      height: 50px;
    }
    &::v-deep .uni-select__selector-item {
      font-size: 16px !important;
    }
    &::v-deep .uni-select__input-text {
      color: var(--navbar-color);
    }
    &::v-deep .uni-select__selector {
      background-color: var(--uni-select__selector-bg) !important;
      border: var(--uni-select__solid) !important;
      border-radius: var(--card-radius) !important;
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
