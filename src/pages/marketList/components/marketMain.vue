<template>
  <view class="marketMain">
    <view class="all-main">
      <uni-collapse class="uni-collapse">
        <uni-collapse-item
          v-for="(item, index) in market"
          :key="index"
          :show-animation="true"
          :border="false"
          :show-arrow="false"
          title-border="none"
          :open="true"
        >
          <template #title>
            <view class="item-title" @click="changeIcon(index)">
              <text>{{ item.allianceName }} </text>
              <uni-icons
                :id="'marketIcon-' + index"
                class="market-icon"
                type="forward"
                size="16"
              />
            </view>
          </template>
          <view
            class="markrt"
            v-for="(itemSon, indexSon) in item.list"
            :key="indexSon"
            @tap="goEventDetails(itemSon)"
          >
            <view class="ids"
              >id : {{ itemSon.id + "&nbsp;" }}
              <p @tap.stop="copyCode(itemSon.id)">
                <uni-icons
                  custom-prefix="iconfont"
                  color=""
                  type="icon-fuzhi"
                  size="20"
                ></uni-icons>
              </p>
            </view>
            <view class="market-card">
              <view class="card-left">
                <view class="teamName">{{ itemSon.mainName }}</view>
                <view
                  class="team1Img market-img"
                  :style="{ backgroundImage: `url(${itemSon.mainLogo})` }"
                ></view>
              </view>
              <view class="card-mid">
                <text class="card-vs">VS</text>
                <text class="times">{{ format(itemSon.startTime) }}</text>
              </view>
              <view class="card-right">
                <view
                  class="team2Img market-img"
                  :style="{ backgroundImage: `url(${itemSon.guestLogo})` }"
                ></view>
                <view class="teamName">{{ itemSon.guestName }}</view>
              </view>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>
    <view class="bottom"></view>
  </view>
</template>

<script>
export default {
  name: "marketMain",
  components: {},
  props: ["market"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    goEventDetails(item) {
      if (item.gameStatus === 1) {
        this.$Router.push({ name: "eventDetails", params: { id: item.id } });
      } else {
        uni.showToast({
          title: this.$t("marketList.msg"),
          icon: "error",
          mask: true,
        });
      }
    },
    changeIcon(index) {
      var element = document.getElementById("marketIcon-" + index);
      if (element.className.indexOf("iconTransform") === -1) {
        element.className = "uni-icons iconTransform uniui-forward";
      } else {
        element.className = "uni-icons market-icon uniui-forward";
      }
    },
    copyCode(datas) {
      const that = this;
      uni.setClipboardData({
        data: String(datas),
        success: function () {
          uni.showToast({ title: that.$t("history.withdraw.copeMsg") });
        },
      });
    },

    //时间戳格式化
    add(m) {
      return m < 10 ? "0" + m : m;
    },
    format(times) {
      //times是整数，否则要parseInt转换
      var time = new Date(times);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        this.add(h) + ":" + this.add(mm) + " " + this.add(d) + "/" + this.add(m)
      );
    },
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
.marketMain {
  .iconTransform {
    color: var(--body-color) !important;
    transform: rotate(90deg);
  }
  .market-icon {
    color: var(--body-color) !important;
    transform: rotate(0deg);
  }
  .market-img {
    width: 30px;
    height: 30px;
    background-position: 0% 0%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .teamName {
    font-size: 12px;
    width: 100px;
    word-wrap: break-word;
  }
  .all-main {
    .uni-collapse {
      padding: 20px 0 0 0;
      display: flex;
      justify-content: space-around;
      background-color: var(--body-bg);
      &::v-deep .uni-collapse-item {
        margin: 0 10px 10px 10px;
        .uni-collapse-item__wrap {
          background-color: var(--body-bg);
        }
      }
      .item-title {
        min-height: 20px;
        border-radius: var(--card-radius);
        background-color: var(--form-main-uni-easyinput__content);
        border: 1px solid var(--border-color);
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .markrt {
        height: 100px;
        border-radius: var(--card-radius);
        color: var(--body-color);
        background: var(--card-style);
        box-shadow: var(--card-shadow);
        margin-top: 10px;
        .ids {
          margin: 5px;
          width: 50%;
          display: flex;
          align-items: center;
        }
        .market-card {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          .card-left {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: right;
            .team1Img {
              margin-left: 10px;
            }
          }
          .card-mid {
            width: 20%;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 0 10px;
            .card-vs {
              font-weight: 600;
              font-size: 14px;
              color: var(--light-color) !important;
            }
            .times {
              margin-top: 10px;
              color: var(--time-color);
              font-size: 12px;
            }
          }
          .card-right {
            display: flex;
            align-items: center;
            .team2Img {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  .bottom {
    height: 200px;
  }
}
</style>
