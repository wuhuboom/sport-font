<template>
  <view class="content lottery">
    <view class="lottery-top">
      <uni-icons type="close" size="40" @click="close" color="#fff"></uni-icons>
    </view>
    <view class="title">
      <image class="title-image" src="/static/images/lottery/title.png" />
    </view>
    <view class="quk-card">
      <swiper
        class="swiper"
        :indicator-dots="false"
        :autoplay="true"
        :interval="3000"
        :duration="2000"
        :circular="true"
        :vertical="true"
        :display-multiple-items="1"
        easing-function="linear"
      >
        <swiper-item v-for="(item, index) in bingoPlay" :key="index">
          <view class="swiper-item">
            <text class="text-mid"
              >{{ $t("lottery.congratulation") }} {{ item.playerName }}</text
            >
            <text class="text-mid"
              >{{ $t("lottery.get") }} {{ item.money }}</text
            >
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- <view class="zhizhen">
      <image class="zhizhen-image" src="/static/images/lottery/zizhen.png" />
    </view> -->
    <view class="wheel">
      <LuckyWheel
        ref="myLucky"
        width="280px"
        height="280px"
        :blocks="blocks"
        :prizes="prizes"
        :buttons="buttons"
        @start="startCallBack"
        @end="endCallBack"
      />
    </view>
    <view class="suzi">{{ symbol }}{{ draw != "" ? draw[0].pay : "" }} </view>
    <view class="anniu" @click="startCallBack">
      <view class="btns">{{ $t("lottery.click") }}</view>
    </view>
    <!-- <view class="cishu">您有1次抽奖机会</view> -->
    <view class="guize">
      <view class="bt">{{ $t("lottery.lotteryRules") }}</view>
      <view class="sm">{{ $t("lottery.lotteryIll") }}</view>
    </view>
    <view class="bts">{{ $t("lottery.leaderboard") }}</view>
    <view class="phb">
      <view class="img">
        <view class="two">
          <view class="name">{{
            bingoRank.length > 1 ? bingoRank[1].value : ""
          }}</view>
          <view class="num">{{
            bingoRank.length > 1 ? bingoRank[1].score : ""
          }}</view>
        </view>
        <view class="one">
          <view class="name">{{
            bingoRank.length != 0 ? bingoRank[0].value : ""
          }}</view>
          <view class="num">{{
            bingoRank.length != 0 ? bingoRank[0].score : ""
          }}</view>
        </view>
        <view class="three">
          <view class="name">{{
            bingoRank.length > 2 ? bingoRank[2].value : ""
          }}</view>
          <view class="num">{{
            bingoRank.length > 2 ? bingoRank[2].score : ""
          }}</view>
        </view>
      </view>
      <view class="table">
        <view class="head">
          <view class="pm"> {{ $t("lottery.ranking") }} </view>
          <view class="pm"> {{ $t("lottery.user") }} </view>
          <view class="pm"> {{ $t("lottery.amount") }} </view>
        </view>
        <view class="body">
          <view v-for="(item, index) in bingoRank" :key="index" class="conet">
            <view class="pm">{{ index + 1 }}</view>
            <view class="pm">{{ item.value }}</view>
            <view class="pm">{{ item.score }}</view>
          </view>
        </view>
      </view>
    </view>
    <uni-popup background-color="transparent" ref="popup">
      <view class="popup">
        <view class="contex">
          <view> {{ $t("lottery.tips") }} </view>
          <view class="num">{{ chouz }}</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import LuckyWheel from "@lucky-canvas/uni/lucky-wheel";
export default {
  components: { LuckyWheel },
  data() {
    return {
      blocks: [
        {
          padding: "16px",
          imgs: [
            {
              src: require("../../static/images/lottery/ll.png"),
              width: "100%",
              rotate: true,
            },
          ],
        },
        {
          imgs: [
            {
              src: require("../../static/images/lottery/pzd1.png"),
              width: "100%",
              rotate: true,
            },
          ],
        },
      ],
      prizes: [],
      buttons: [
        {
          radius: "30px",
          pointer: false,
          imgs: [
            {
              top: "-30px",
              src: require("../../static/images/lottery/cen.png"),
              width: "100%",
            },
          ],
        },
      ],
      bingoPlay: [],
      bingoRank: [],
      draw: [],
      chouz: "",
      symbol: "",
    };
  },
  computed: {},
  methods: {
    // 点击抽奖按钮触发回调
    startCallBack() {
      // 先开始旋转
      this.$refs.myLucky.play();
      this.$api
        .playerBingo({ model: "0", money: "100" })
        .then((res) => {
          setTimeout(() => {
            // 调用stop停止旋转并传递中奖索引
            this.$refs.myLucky.stop(res.data.index);
          }, 3000);
        })
        .catch((error) => {
          const errorMsg = error.data[0].msgKey;
          if (errorMsg == "dayDrawMax") {
            uni.showToast({
              title: this.$t("lottery.errorMsg"),
              icon: "error",
            });
          } else if (errorMsg == "balanceNotEnough") {
            uni.showToast({
              title: this.$t("lottery.balanceNotEnough"),
              icon: "error",
            });
          } else if (errorMsg == "unLotteryDraw") {
            uni.showToast({
              title: this.$t("lottery.unLotteryDraw"),
              icon: "error",
            });
          } else if (errorMsg == "testerCatnotDraw") {
            uni.showToast({
              title: this.$t("lottery.testerCatnotDraw"),
              icon: "error",
            });
          } else {
            uni.showToast({
              title: this.$t("lottery.unknown"),
              icon: "error",
            });
          }
          this.$refs.myLucky.stop();
        });

      //this.$refs.myLucky.stop();
      // 使用定时器来模拟请求接口
    },
    close() {
      this.$Router.push("/");
    },
    // 抽奖结束触发回调
    endCallBack(prize) {
      if (JSON.stringify(prize) == "{}") {
        return;
      }
      // 奖品详情
      this.chouz = prize.fonts[0].text;
      this.$refs.popup.open("center");
    },
    async init() {
      const res = await this.$api.bingoRank();

      this.bingoRank = res.data;
      const dd = await this.$api.bingoCount();
      this.bingoPlay = dd.data.bingoPlayers;
      this.symbol = dd.data.symbol;
      this.draw = dd.data.draw;
      const leng = this.draw[0].bouns;
      const unu = leng.split(",");
      for (var i = 0; i < unu.length; i++) {
        var p = {
          fonts: [
            { text: unu[i], top: "10%", fontColor: "#fff", fontSize: "15" },
          ],
        };
        this.prizes.push(p);
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    this.init();
  },
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
.lottery {
  width: 100%;
  min-height: 100vh;
  background: url("/static/images/lottery/bg.png") no-repeat;
  background-size: 100% 120%;
  .lottery-top {
    position: relative;
    background-size: cover;
    .uni-icons {
      position: absolute;
      top: 10rpx;
      right: 10rpx;
    }
  }
  .title {
    padding: 10px 0 0 0;
    width: 60%;
    margin: auto;
    .title-image {
      width: 100%;
      height: 50px;
    }
  }
  .quk-card {
    margin: 20px 1px;
    max-width: 55%;
    background-color: rgb(48, 80, 91);
    opacity: 0.7;
    font-size: 12px;
    color: #fff;
    border-radius: 0 15px 15px 0;
    height: 30px;
  }
  .swiper {
    height: 30px;
    width: 100%;
  }
  .swiper-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .text-mid {
      line-height: 30px;
    }
  }
  .zhizhen {
    position: relative;
    text-align: center;
    overflow: hidden;
    z-index: 999;
    .zhizhen-image {
      width: 55px;
      height: 80px;
    }
  }
  .wheel {
    margin-top: 40px;
  }
  .suzi {
    background-color: rgb(72, 0, 103);
    line-height: 36px;
    border-radius: 20px;
    width: 28%;
    margin: 70rpx auto;
    text-align: center;
    color: #fff;
  }
  .anniu {
    width: 40%;
    height: 50px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    margin: auto;
    background: url("/static/images/lottery/an.png") no-repeat;
    background-size: 100% 100%;
    .btns {
      width: 88%;
      text-align: center;
    }
  }
  .cishu {
    margin-top: 10px;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
  .guize {
    margin-top: 30px;
    .bt {
      width: 25%;
      height: 30px;
      color: #fff;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      border-radius: 0 20px 20px 0;
      background-color: rgb(229, 86, 34);
    }
    .sm {
      padding: 20px 20px;
      font-size: 13px;
      color: #fff;
    }
  }
  .bts {
    width: 25%;
    height: 30px;
    color: #fff;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    border-radius: 0 20px 20px 0;
    background-color: rgb(229, 86, 34);
  }
  .phb {
    width: 90%;
    margin: auto;

    .img {
      margin: 30px auto;
      display: flex;
      font-size: 13px;
      justify-content: space-around;
      .one {
        width: 25%;
        margin-top: -35px;
        height: 120px;
        background: url("/static/images/lottery/1.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        .name {
          padding: 20px 0 5px 0;
        }
      }
      .two {
        width: 25%;
        height: 120px;
        background: url("/static/images/lottery/2.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        .name {
          padding: 20px 0 5px 0;
        }
      }
      .three {
        width: 25%;
        height: 120px;
        background: url("/static/images/lottery/3.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        .name {
          padding: 20px 0 5px 0;
        }
      }
    }
    .table {
      margin: 10px auto;
      .head {
        display: flex;
        justify-content: space-around;
        color: rgb(147, 91, 42);
        font-weight: 700;
        font-size: 13px;
        .pm {
          text-align: center;
          width: 25%;
        }
      }
      .body {
        height: 200px;
        padding: 20px 0 40px 0;
        font-size: 13px;
        overflow: hidden; //主要代码
        overflow-y: scroll; //主要代码
        .conet {
          display: flex;
          justify-content: space-around;
          padding: 8px 0;
          .pm {
            text-align: center;
            width: 25%;
            color: #fff;
          }
        }
      }
    }
  }
  .popup {
    width: 280px;
    height: 180px;
    background: url("/static/images/lottery/zjtk.png") no-repeat;
    background-size: 100% 100%;
    .contex {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 100px;
    }
  }
}
</style>
