<template>
  <view class="content oreder">
    <uni-nav-bar
      left-icon="left"
      :border="false"
      backgroundColor="rgb(17,17,17)"
      color="#fff"
      @clickLeft="$Router.back()"
    />
    <view class="order-steps">
      <view class="steps-top">
        <view class="setp">
          <view class="bz1 bz1-a">1</view>
          <view class="font-a">订单已生成</view>
        </view>
        <view :class="active > 1 ? 'bza' : 'bz2'"></view>
        <view class="setp">
          <view :class="active > 1 ? 'bz1 bz1-a' : 'bz1 bz1-n'">2</view>
          <view :class="active > 1 ? 'font-a' : 'font-s'">向卖家付款</view>
        </view>
        <view :class="active > 2 ? 'bza' : 'bz2'"></view>
        <view class="setp">
          <view :class="active > 2 ? 'bz1 bz1-a' : 'bz1 bz1-n'">3</view>
          <view :class="active > 2 ? 'font-a' : 'font-s'">等待到账</view>
        </view>
      </view>
    </view>
    <createOrder
      :orderDetail="orderDetail"
      @buyType="toggle"
      v-if="active == 1 && orderDetail.payType == null"
    ></createOrder>
    <payment
      :orderDetail="orderDetail"
      @initOrder="init"
      v-if="active == 1 && orderDetail.payType != null"
    ></payment>
    <collection v-if="active == 2" :orderDetail="orderDetail"></collection>
    <uni-popup ref="popup" background-color="transparent">
      <view class="pay-method">
        <view class="pay-top">
          <view class="line"></view>
          <view class="title">支付方式</view>
          <view class="bottom-line"></view>
        </view>
        <view
          class="method"
          v-for="(item, index) in buyTypeList"
          :key="index"
          @click="checkedPayType(item, index)"
        >
          <view class="name">{{ item.payName }}</view>
          <img
            v-show="item.checked == 1"
            src="/static/images/ce/buy/checked.png"
            alt=""
            width="25px"
            height="25px"
          />
          <img
            v-show="item.checked != 1"
            src="/static/images/ce/buy/nos.png"
            alt=""
            width="25px"
            height="25px"
          />
        </view>
        <view style="height: 20px"></view>
        <view class="btn-confirm" @click="confirm">确定</view>
        <view style="height: 20px"></view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import createOrder from "./components/createOrder.vue";
import payment from "./components/payment.vue";
import collection from "./components/collection.vue";
export default {
  components: { createOrder, payment, collection },
  data() {
    return {
      active: 0,
      timer: null,
      orderDetail: {},
      buyTypeList: [],
      buyData: { id: "", payId: "" },
    };
  },
  computed: {},
  methods: {
    async init() {
      let id = this.$route.query.id;
      this.buyData.id = id;
      let data = await this.$api.fbSaleOrderDetail({ id: id });
      this.orderDetail = data.data;
      if (this.orderDetail.status < 4) {
        this.active = this.orderDetail.status;
      }
      if (
        this.orderDetail.status == 5 ||
        this.orderDetail.status == 4 ||
        this.orderDetail.status == 3
      ) {
        clearTimeout(this.timer);
        this.$Router.push({
          path: "/orderDetail",
          query: { id: this.orderDetail.id, type: 2 },
        });
      }
      console.log(this.orderDetail);
    },
    async initBuyType() {
      let id = this.$route.query.id;
      let buy = await this.$api.fbBuy1({ id: id });
      this.buyTypeList = buy.data;

      this.buyTypeList.forEach((element) => {
        this.$set(element, "checked", 0);
      });
    },
    toggle() {
      this.$refs.popup.open("bottom");
    },
    checkedPayType(item, index) {
      this.buyTypeList.forEach((element) => {
        this.$set(element, "checked", 0);
      });
      item.checked = 1;
      this.buyData.payId = item.id;
    },
    confirm() {
      if (this.buyData.payId == "") {
        uni.showToast({
          title: "请选择支付方式",
          icon: "none",
          mask: true,
        });
        return;
      }
      this.$api.fbBuy2(this.buyData).then((res) => {
        this.$refs.popup.close();
        this.init();
      });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    this.init();

    this.initBuyType();
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.timer = setInterval(() => {
      this.init();
    }, 10000);
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
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
.oreder {
  .order-steps {
    width: 90%;
    margin: auto;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .steps-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .setp {
        display: flex;
        font-size: 12px;
        flex-direction: column;
        align-items: center;
        text-align: center;
        .bz1 {
          width: 24px;
          height: 24px;
          line-height: 24px;

          border-radius: 50%;
          text-align: center;
        }
        .bz1-n {
          color: rgb(255, 255, 255);
          background-color: rgb(159, 159, 159);
        }
        .font-s {
          margin-top: 10px;
        }
        .font-a {
          margin-top: 10px;
          color: rgb(232, 118, 62);
        }
        .bz1-a {
          background-color: rgb(232, 118, 62);
          color: #000;
        }
      }
      .bz2 {
        width: 20%;
        height: 1px;
        background-color: rgb(112, 112, 112);
      }
      .bza {
        width: 20%;
        height: 1px;
        background-color: rgb(232, 118, 62);
      }
    }
  }
  .pay-method {
    width: 100%;
    background-color: rgb(36, 35, 42);
    border-radius: 20px 20px 0 0;
    .pay-top {
      display: flex;
      flex-direction: column;
      height: 80px;
      justify-content: space-around;
      text-align: center;
      .line {
        margin: auto;
        width: 35px;
        height: 5px;
        background-color: rgb(59, 58, 66);
        border-radius: 5px;
      }
      .bottom-line {
        margin-top: 20px;
        border: rgb(49, 48, 56) 1px solid;
      }
    }
    .method {
      width: 90%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      border-bottom: rgb(49, 48, 56) 1px solid;
    }
    .btn-confirm {
      width: 80%;
      background-color: rgb(232, 118, 62);
      height: 48px;
      line-height: 48px;
      margin: auto;
      text-align: center;
      border-radius: 50px;
    }
  }
}
</style>
