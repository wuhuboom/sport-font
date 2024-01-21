<template>
  <view class="content strongReceipt bg">
    <view class="top">
      <view class="top-back bg" @click="goStrongBox"></view>
      <view class="top-mid">
        <image
          class="top-mid-img"
          src="/static/images/strongReceipt/Receipticon.png"
        />
        <p class="top-mid-p">{{ $t("receipt.title") }}</p>
      </view>
      <view class="top-right"></view>
    </view>
    <view class="box">
      <uni-data-select
        v-model="value"
        :localdata="range"
        :clear="false"
        @change="changeSelect"
      ></uni-data-select>
      <view class="font-fg"></view>
      <view class="box-tb-head">
        <p class="tb-p">{{ $t("receipt.tableHead.date") }}</p>
        <p class="tb-p">{{ $t("receipt.tableHead.categories") }}</p>
        <p class="tb-p">{{ $t("receipt.tableHead.amount") }}</p>
        <p class="tb-p">{{ $t("receipt.tableHead.details") }}</p>
      </view>
      <view class="font-fg"></view>
      <view class="box-tb-body" v-for="(item, index) in data" :key="index">
        <p class="tb-p">{{ safeFormatTime(item.createdAt) }}</p>
        <p class="tb-p">{{ changeType(item.changeType) }}</p>
        <p class="tb-am">{{ item.changeMoney }}</p>
        <view class="tb-p" @click="toggle(item)"
          ><image class="tb-img" src="/static/images/strongReceipt/more.png"
        /></view>
      </view>
      <uni-pagination
        show-icon="true"
        :total="totalNum"
        :current="pageNo"
        @change="change"
      ></uni-pagination>
    </view>
    <view>
      <!-- 普通弹窗 -->
      <uni-popup background-color="transparent" ref="popup">
        <view class="popupBox bg">
          <view>
            <p>{{ $t("receipt.popup.orderNo") }}</p>
            <p>{{ popupData.orderNo }}</p>
          </view>
          <view>
            <p>{{ $t("receipt.popup.creationDate") }}</p>
            <p>{{ safeFormatTime(popupData.date) }}</p>
          </view>
          <view>
            <p>{{ $t("receipt.popup.confirmationDate") }}</p>
            <p>{{ safeFormatTime(popupData.date) }}</p>
          </view>
          <view>
            <p>{{ $t("receipt.popup.state") }}</p>
            <p>sussess</p>
          </view>
          <view v-if="type === 1">
            <p>{{ $t("receipt.popup.transferPerson") }}</p>
            <p>{{ popupData.zhr }}</p>
          </view>
          <view v-if="type === 1">
            <p>{{ $t("receipt.popup.payee") }}</p>
            <p>{{ szr }}</p>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      params: {
        changeType: "",
        pageNo: 1,
        pageSize: 10,
      },
      type: 2,
      totalNum: 0,
      pageNo: 1,
      value: 1,
      szr: "",
      range: [
        { value: 1, text: this.$t("receipt.rangData.recharge") },
        { value: 2, text: this.$t("receipt.rangData.transfer") },
        { value: 3, text: this.$t("receipt.rangData.discount") },
        { value: 4, text: this.$t("receipt.rangData.relocate") },
      ],
      data: [],
      popupData: {
        orderNo: "",
        date: "",
        status: "",
        zhr: "",
      },
    };
  },
  computed: {},
  methods: {
    goStrongBox() {
      this.$Router.push("/strongBox");
    },
    init() {
      this.$api.safeChangeLog(this.params).then((res) => {
        this.totalNum = res.data.totalCount;
        this.data = res.data.results;
      });
    },
    change(e) {
      this.params.pageNo = e.current;
      this.pageNo = e.current;
      this.init();
    },
    changeSelect(e) {
      this.params.changeType = e;
      this.params.pageNo = 1;
      this.pageNo = 1;
      this.init();
    },
    toggle(item) {
      this.$refs.popup.open("center");
      this.popupData.orderNo = item.orderNo;
      this.popupData.date = item.createdAt;
      if (item.changeType == 2) {
        this.type = 1;
        this.popupData.zhr = item.playerName;
        this.$api
          .safeTransferLog({ orderNo: this.popupData.orderNo })
          .then((res) => {
            this.szr = res.data.results[0].aimName;
          })
          .catch((error) => {
            this.szr = this.$t("receipt.popup.unknown");
          });
      } else {
        this.type = 2;
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
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  mounted() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.init();
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() {
  //   uni.stopPullDownRefresh();
  // },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style scoped lang="scss">
.strongReceipt {
  background-image: url("/static/images/strongReceipt/bg.jpg");
  .top {
    padding: 8% 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .top-back {
      width: 43px;
      height: 19px;
      background-image: url("/static/images/strongbox/back.png");
    }
    .top-mid {
      text-align: center;
      .top-mid-img {
        width: 46px;
        height: 55px;
      }
      .top-mid-p {
        font-family: "Century Gothic Bold";
        font-size: 18px;
        letter-spacing: 2px;
        color: #fff;
      }
    }
    .top-right {
      width: 43px;
    }
  }
  .box {
    margin: auto;
    width: 85%;
    height: 300px;
    .box-tb-head {
      margin: 10px 0;
      height: 24px;
      border-radius: 10px;
      background-color: rgb(141, 162, 181) !important;
      display: flex;
      font-size: 14px !important;
      font-family: "Century Gothic Bold" !important;
      align-items: center;
      color: #fff;
    }
    .box-tb-body {
      display: flex;
      font-family: "Century Gothic" !important;
      font-size: 14px !important;
      color: #fff;
      padding-top: 10px;
    }
    .tb-img {
      width: 16px;
      height: 22px;
    }
    .tb-am {
      width: 25%;
      align-items: center;
      text-align: center;
    }
    .tb-p {
      width: 25%;
      text-align: center;
      align-items: center;
    }
  }
  .popupBox {
    width: 248px;
    height: 400px;
    background-image: url("/static/images/strongReceipt/box.png");
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #fff;
    font-family: "Century Gothic";
    font-size: 14px;
    justify-content: space-around;
  }

  &::v-deep .uni-select__selector-item {
    margin-right: 24px;
    font-family: "Century Gothic Bold" !important;
    justify-content: center !important;
    color: #2195c8;
    line-height: 25px;
  }
  &::v-deep .uni-select__input-text {
    text-align: center !important;
    font-size: 14px !important;
    font-family: "Century Gothic Bold" !important;
    color: #fff;
  }
  &::v-deep .uni-select__selector {
    background-color: #fff;
    border: var(--uni-select__solid) !important;
    border-radius: var(--card-radius) !important;
  }
  &::v-deep .uni-select {
    margin: 10% 0;
    height: 24px;
    border-radius: 10px;
    background-color: rgb(131, 175, 204) !important;
  }
  &::v-deep .uniui-bottom {
    color: #fff !important;
  }
  &::v-deep .uniui-top {
    color: #fff !important;
  }
}
.font-fg {
  width: 100%;
  border: 1px solid rgb(74, 165, 209);
  background-image: url("/static/images/strongReceipt/divder.png");
}

.bg {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
