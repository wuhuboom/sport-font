<template>
  <view class="vip content">
    <nav-aside></nav-aside>
    <view class="invite-main">
      <view class="top-title">
        <text class="title-font">{{ $t("vip.title") }}</text>
        <uni-icons
          class="title-icon"
          type="close"
          size="30"
          @click="$Router.back()"
        ></uni-icons>
      </view>
      <view class="top-img"></view>
      <view class="fan-card card-mid">
        <scroll-view
          class="scroll-content"
          :scroll-x="true"
          :show-scrollbar="false"
        >
          <view
            class="invite-num"
            v-for="(item, index) in inviteNums"
            :key="index"
          >
            <image
              class="invite-num-img"
              :src="inviteNumImg"
              mode="scaleToFill"
            />
            <p class="nums">
              <text
                style="font-size: 12px; font-style: oblique; margin-right: 2px"
                >LV.</text
              ><text style="font-weight: 700">{{ item }}</text>
            </p>
          </view>
        </scroll-view>
        <p class="vip-p">Promotion VIP{{ 8 }}</p>
        <p class="vip-size">1.Directly push subordinates:0/1000</p>
        <p class="vip-size">2.Team size:0/5000</p>
      </view>

      <view class="mean">
        <text>1. What does it mean to be an active user?</text>
        <p class="mean-p">
          Valid users: The subordinates you promote and meet the recharge
          conditions are called valid users.
        </p>
      </view>
      <view class="mean">
        <text>2. How to boost your VIP effectively</text>
        <p class="mean-p">
          Prompt VIP level: Directly affiliated first-level users and team valid
          users can be promoted to the next level if they meet the conditions at
          the same time
        </p>
      </view>
      <view style="height: 100px"></view>
      <view class="invite-bottom">
        <view class="link-code">
          <view class="code m-line">{{ $t("vip.link.text") }}{{ link }}</view>
          <view class="code m-line"
            >{{ $t("vip.code.text") }}{{ vuex_user.invitationCode }}</view
          >
        </view>
        <view class="bottom-btns">
          <button class="bottom-btn" type="default" @click="copyCode(link)">
            {{ $t("vip.link.btn") }}
          </button>
          <button
            class="bottom-btn"
            type="default"
            @click="copyCode(vuex_user.invitationCode)"
          >
            {{ $t("vip.code.btn") }}
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import NavAside from "@/components/nav-aside/nav-aside.vue";
export default {
  name: "vip",
  components: { NavAside },
  props: {},
  data() {
    return {
      link: "",
      money: "30.00",
      inviteNums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      inviteNumImg: "../../static/images/temporary/vip.png",
      curunit: "../../static/images/temporary/curunit.png",
    };
  },
  computed: {},
  methods: {
    copyCode(value) {
      uni.setClipboardData({
        data: value,
        success: () => {
          uni.showToast({ title: this.$t("invite.copyMsg") });
        },
      });
    },
    getLink() {
      const domain = window.location.protocol + "//" + window.location.host;
      this.link = domain + "/#/register?code=" + this.vuex_user.invitationCode;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.getLink();
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
.vip {
  margin-top: 60px;
  .invite-main {
    padding: 15px;
    .top-title {
      display: flex;
      justify-content: space-between;
      text-align: center;
      align-items: center;
      .title-font {
        font-size: 15px;
        font-weight: 700;
        color: var(--page-title-color);
      }
      .title-icon {
        font-weight: 700;
        color: var(--close-color) !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .top-img {
    margin: 10px 0 10px 0;
    width: 100%;
    height: 160px;
    background-image: url("/static/images/temporary/invite.png");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 8px;
  }
  .card-mid {
    .scroll-content {
      width: 95%;
      height: 100%;
      white-space: nowrap;
      padding: 10px;
      border-radius: var(--card-radius) var(--card-radius) 0 0;
      background-color: var(--bs-popup-hd);
      .invite-num {
        padding: 10px !important;
        display: inline-block;
        margin-right: 10px;
        border-radius: var(--card-radius);
        background: var(--table-top-color);
        border: 2px solid var(--border-color);
        color: var(--text-gray-color);
        text-align: center;
        align-items: center;
        .invite-num-img {
          width: 28px;
          height: 18px;
        }
        .nums {
          font-size: 14px;
          color: var(--body-color);
        }
      }
    }
    &::v-deep .uni-scroll-view::-webkit-scrollbar {
      display: none;
    }
    .vip-p {
      padding: 10px;
      font-size: 14px;
      font-weight: 700;
    }
    .vip-size {
      padding: 0 0 5px 10px;
      color: #999;
      font-size: 14px;
    }
  }
  .receiving {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    .receiving-font {
      padding: 15px 0 0 15px;
    }
    .curunit {
      display: flex;
      flex-direction: row;
      justify-content: center;
      .curunit-img {
        width: 50%;
        align-items: center;
        display: flex;
        padding: 15px;
        .img-curunit {
          height: 40px;
          width: 45px;
          background: var(--inv-bar-bg);
          border: 2px solid var(--inv-bar-border-color);
          border-radius: 7px;
          margin-right: 10px;
        }
      }
      .nums-curunit {
        display: flex;
        text-align: center;
        align-items: center;
        width: 50%;
        padding: 15px;
        .curunit-nums {
          min-width: 50px;
          line-height: 40px;
          background: var(--inv-bar-bg);
          border: 2px solid var(--inv-bar-border-color);
          border-radius: 7px;
          font-weight: 700;
          margin: 0 10px 0 0;
        }
      }
    }
    .develop {
      color: #e4cfa6 !important;
      font-size: 11px;
      text-align: center;
    }
    .claimed-btn {
      width: 90%;
      margin: 15px 15px 10px 15px;
      height: 44px;
      border-radius: 8px;
      background: var(--btn-gray-color) !important;
      text-align: center;
      line-height: 44px;
    }
  }
  .btn--gray {
    color: #999 !important;
  }
  .mean {
    margin: 15px 0 0 0;
    font-size: 14px;
    .mean-p {
      padding-top: 10px;
      color: #898d97;
    }
  }
  .invite-bottom {
    position: fixed;
    width: 100%;
    height: auto;
    left: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 15px;
    .link-code {
      display: flex;
      font-size: 12px;
      padding: 0 10px 0 0;
      justify-content: space-between;
      .code {
        width: 46%;
      }
    }
    .bottom-btns {
      display: flex;
      flex-direction: row;
      padding: 10px 0 0 0;
      margin: 0 10px 0 -20px;
      .bottom-btn {
        width: 40%;
        font-size: 15px;
        height: 40px;
        font-weight: 700;
        background-color: var(--inv-btn-bg) !important;
        color: #ccc !important;
      }
    }
  }
  .fan-card {
    color: var(--body-color);
    border-radius: var(--card-radius);
    background: var(--card-style);
    box-shadow: var(--card-shadow);
  }
  .m-line {
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
</style>
