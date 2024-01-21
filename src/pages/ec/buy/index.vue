<template>
  <view class="content ecbuy">
    <uni-nav-bar
      left-icon="left"
      title="C2C"
      :border="false"
      backgroundColor="rgb(17,17,17)"
      color="#fff"
      :fixed="true"
      @clickLeft="goback"
    />
    <view class="head">
      <view class="head-top">购买</view>
      <view class="head-serch">
        <view class="serch-input">
          <uni-easyinput
            class="easy-inp"
            placeholder="金额"
            v-model="serchPrarms.bmin"
          />
        </view>
        <view class="serch-btn" @click="serchSale">搜索</view>
      </view>
      <view class="head-sort">
        <view class="sort-p" @click="chengeSort(1)">
          <view>成交量</view>
          <img
            :src="
              chengj == 0
                ? '/static/images/ce/buy/sort.png'
                : '/static/images/ce/buy/sorta.png'
            "
            width="20"
            height="20"
          />
        </view>
        <view class="sort-p" @click="chengeSort(2)">
          <view>成交率</view>
          <img
            :src="
              chengl == 0
                ? '/static/images/ce/buy/sort.png'
                : '/static/images/ce/buy/sorta.png'
            "
            width="20"
            height="20"
          />
        </view>
        <view class="sort-p" @click="chengeSort(3)">
          <view>价格排序</view>
          <img
            :src="
              jiag == 0
                ? '/static/images/ce/buy/sort.png'
                : '/static/images/ce/buy/sorta.png'
            "
            width="20"
            height="20"
          />
        </view>
        <view style="width: 15%; text-align: right" @click="toggle">
          <img src="/static/images/ce/buy/serch.png" width="30" height="30" />
        </view>
      </view>
    </view>
    <view class="table">
      <view class="table-body" v-for="(item, index) in saleList" :key="index">
        <view class="table-head">
          <view class="head-left">
            <img
              style="margin-left: 10px"
              src="https://new22.pigk.xyz/static/image/user.png"
              height="30"
              width="30"
            />
            <view style="margin: 0 10px; font-weight: 600; font-size: 13px">{{
              item.merName
            }}</view>
            <img src="/static/images/ce/buy/renz.png" width="25" height="25" />
            <view style="font-size: 12px; color: rgb(232, 118, 62)"
              >已认证</view
            >
          </view>
          <view class="head-right" @click="goDetail(item)"> 买入 </view>
        </view>
        <view class="table-content">
          <view class="content-top">
            <p style="font-size: 12px; color: rgb(162, 160, 168)">
              成交率
              <span style="margin-left: 5px; color: rgb(255, 255, 255)">
                {{
                  ((item.cumulativeSucc / item.cumulativeCount) * 100).toFixed(
                    0
                  )
                }}%</span
              >
            </p>
            <p
              style="
                margin-left: 15px;
                font-size: 12px;
                color: rgb(162, 160, 168);
              "
            >
              成交量
              <span style="margin-left: 5px; color: rgb(255, 255, 255)">
                {{ item.cumulativeSucc }}</span
              >
            </p>
          </view>
          <view class="content-mid">
            <p style="font-size: 12px; color: rgb(162, 160, 168)">
              限额 ：{{ item.minBalance }} - {{ item.maxBalance }}
            </p>
          </view>
          <view class="content-mid">
            <p style="font-size: 12px; color: rgb(162, 160, 168)">
              支付方式 ：{{ item.payTypes }}
            </p>
          </view>
        </view>
      </view>
      <view style="height: 120px"></view>
    </view>
    <uni-popup ref="popup" background-color="transparent" @change="closePop">
      <view class="pay-method">
        <view class="pay-top">
          <view class="line"></view>
          <view class="title">支付方式</view>
          <view class="bottom-line"></view>
        </view>
        <view
          class="method"
          v-for="(item, index) in payTypeList"
          :key="index"
          @click="checkedPayType(item, index)"
        >
          <view class="name">{{ item.name }}</view>
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
      </view>
    </uni-popup>
    <cetable></cetable>
  </view>
</template>

<script>
import cetable from "@/components/cetable/cetab-bar.vue";
export default {
  components: { cetable },
  data() {
    return {
      active: 0,
      payTypeList: [],
      checkedPayTypeSerch: [],
      chengj: 0,
      chengl: 0,
      jiag: 0,
      serchPrarms: {
        bmin: "",
        type: "",
        sort: "",
        pageNo: "1",
        pageSize: "20",
      },
      saleList: [],
    };
  },
  computed: {},
  methods: {
    goDetail(item) {
      this.$Router.push({ path: "/buyDetail", query: { id: item.id } });
    },
    toggle() {
      this.$refs.popup.open("bottom");
    },

    getSaleList() {
      //获取商户列表
      this.$api.saleList(this.serchPrarms).then((res) => {
        this.saleList = res.data.results;
      });
    },
    fbConfig() {
      //获取配置操作
      this.$api.fbConfig().then((res) => {
        this.payTypeList = res.data.payTypeList;
        this.payTypeList.forEach((element) => {
          this.$set(element, "checked", 0);
        });
      });
    },
    checkedPayType(item, index) {
      if (this.payTypeList[index].checked == 1) {
        this.payTypeList[index].checked = 0;
        this.checkedPayTypeSerch = this.checkedPayTypeSerch.filter(
          (e) => e != item.name
        );
      } else {
        this.checkedPayTypeSerch.push(item.name);
        this.payTypeList[index].checked = 1;
      }
    },
    //查询按钮
    serchSale() {
      this.getSaleList();
    },
    //弹出层关闭事件
    closePop(e) {
      if (!e.show) {
        if (this.checkedPayTypeSerch.length == 0) {
          this.reset();
          this.getSaleList();
          return;
        }
        let data = "";
        this.checkedPayTypeSerch.forEach((item) => {
          if (data == "") {
            data = item;
          } else {
            data += "," + item;
          }
        });
        this.serchPrarms.type = data;
        this.getSaleList();
      }
    },
    //排序操作
    chengeSort(index) {
      if (index == 1) {
        if (this.chengj == 1) {
          this.reset();
          this.getSaleList();
        } else {
          this.chengj = 1;
          this.chengl = 0;
          this.jiag = 0;
          this.serchPrarms.sort = 1;
          this.getSaleList();
        }
      } else if (index == 2) {
        if (this.chengl == 1) {
          this.reset();
          this.getSaleList();
        } else {
          this.chengl = 1;
          this.chengj = 0;
          this.jiag = 0;
          this.serchPrarms.sort = 2;
          this.getSaleList();
        }
      } else {
        if (this.jiag == 1) {
          this.reset();
          this.getSaleList();
        } else {
          this.jiag = 1;
          this.chengl = 0;
          this.chengj = 0;
          this.serchPrarms.sort = 3;
          this.getSaleList();
        }
      }
    },
    goback() {
      this.$Router.push("/strongbox");
    },
    //表单重置
    reset() {
      this.serchPrarms = {
        bmin: "",
        type: "",
        sort: "",
        pageNo: "1",
        pageSize: "20",
      };
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.fbConfig();
    this.getSaleList();
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
.ecbuy {
  .head {
    padding: 0 15px;
    .head-top {
      margin: 15px 0;
      font-size: 22px;
    }
    .head-serch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .serch-input {
        width: 80%;
      }
      .serch-btn {
        width: 15%;
        line-height: 40px;
        font-size: 12px;
        text-align: center;
        border-radius: var(--card-radius) !important;
        background-color: rgb(232, 118, 62);
      }
    }
    .head-sort {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sort-p {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 25%;
        color: rgb(162, 160, 168);
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        border: 1px rgb(112, 112, 112) solid;
        border-radius: 5px;
      }
    }
  }
  .table {
    margin-top: 20px;
    padding: 0 15px;
    .table-body {
      margin-top: 10px;
      height: 160px;
      background-color: rgb(42, 42, 42);
      border-radius: 8px;
      .table-head {
        background-color: rgb(26, 26, 26);
        height: 46px;
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .head-left {
          display: flex;
          align-items: center;
        }
        .head-right {
          background-color: rgb(232, 118, 62);
          height: 26px;
          line-height: 26px;
          text-align: center;
          width: 20%;
          font-size: 12px;
          border-radius: 20px 0 0 20px;
        }
      }
      .table-content {
        font-size: 13px;
        padding: 0 15px;
        display: flex;
        flex-direction: column;
        height: 110px;
        justify-content: space-around;
        .content-top {
          display: flex;
        }
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
  }
  &::v-deep .uni-easyinput__content {
    background-color: var(--form-main-uni-easyinput__content) !important;
    border: var(--easyinput__border) !important;
    box-shadow: var(--shadow-bg);
    border-radius: var(--card-radius) !important;
    height: 40px;
    padding: 0 15px 0 10px;
    color: var(--easyinput__color);
  }
  &::v-deep .uni-select__input-text {
    font-size: 12px !important;
    color: var(--navbar-color);
  }
}
</style>
