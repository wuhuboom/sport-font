<template>
  <view class="invite content">
    <nav-aside></nav-aside>
    <view class="invite-main">
      <view class="top-title">
        <text class="title-font">{{ $t("invite.title") }}</text>
        <uni-icons
          class="title-icon"
          type="close"
          color="#fff"
          size="30"
          @click="$Router.back()"
        ></uni-icons>
      </view>
    </view>
    <view class="qr-box">
      <view class="code">
        <canvas
          canvas-id="qrcode"
          v-show="qrShow"
          style="width: 150px; margin: auto"
        />
      </view>
      <view class="link">{{ link }}</view>
      <button class="btn" type="default" @click="copyCode(link)">
        {{ $t("invite.code.btn") }}
      </button>
    </view>
  </view>
</template>
<script>
import uQRCode from "@/common/uqrcode.js";
import NavAside from "@/components/nav-aside/nav-aside.vue";
export default {
  name: "invite",
  components: { NavAside },
  props: {},
  data() {
    return {
      qrShow: false,
      link: "",
    };
  },
  computed: {},
  methods: {
    copyCode(value) {
      uni.setClipboardData({
        data: value,
        success: () => {
          uni.showToast({ title: this.$t("vip.copyMsg") });
        },
      });
    },
    getLink() {
      const domain = window.location.protocol + "//" + window.location.host;
      this.link = domain + "/#/register?code=" + this.vuex_user.invitationCode;
    },
    qrcode() {
      this.qrShow = true;
      uQRCode.make({
        canvasId: "qrcode",
        componentInstance: this,
        text: this.link,
        size: 150,
        margin: 0,
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        fileType: "jpg",
        errorCorrectLevel: uQRCode.errorCorrectLevel.H,
        success: (res) => {},
      });
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
    this.qrcode();
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
.invite {
  padding-top: 60px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("/static/images/yqhy.png");
  .qr-box {
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    width: 90%;
    border-radius: 10px;
    background: rgba(1, 8, 34, 0.6);
    margin: auto;
    .code {
      border-radius: 10px;
      padding: 15px;
      margin: 0 auto;
      background: #fff;
    }
    .link {
      font-size: 14px;
      color: #fff;
    }
    .btn {
      width: 80%;
      border-radius: var(--card-radius);
      color: #fff !important;
      background: rgb(229, 81, 29);
    }
  }

  .invite-main {
    padding: 15px;
    .top-title {
      display: flex;
      justify-content: space-between;
      text-align: center;
      align-items: center;
      .title-font {
        font-size: 16px;
        font-weight: 700;
        color: #fff;
      }
      .title-icon {
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  // .top-img {
  //   margin: 10px 0 10px 0;
  //   width: 100%;
  //   height: 160px;
  //   background-image: url("/static/images/temporary/invite.png");
  //   background-position: center center;
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   border-radius: 8px;
  // }
  // .invite-nums {
  //   display: flex;
  //   font-size: 12px;
  //   text-align: center;
  //   border-radius: var(--card-radius) var(--card-radius) 0 0;
  //   background-color: var(--bs-popup-hd);
  //   padding: 10px;
  //   .invite-num {
  //     display: flex;
  //     flex-direction: column;
  //     padding: 2px;
  //     color: var(--text-gray-color);
  //     background: var(--table-top-color);
  //     border: 2px solid var(--border-color);
  //     border-radius: var(--card-radius);
  //     margin: 5px;
  //     .invite-num-img {
  //       width: 40px;
  //       height: 32px;
  //       border-radius: 0px;
  //       overflow: visible;
  //       opacity: 1;
  //     }
  //   }
  // }
  // .receiving {
  //   display: flex;
  //   flex-direction: column;
  //   font-size: 15px;
  //   .receiving-font {
  //     padding: 15px 0 0 15px;
  //   }
  //   .curunit {
  //     display: flex;
  //     flex-direction: row;
  //     justify-content: center;
  //     .curunit-img {
  //       width: 50%;
  //       align-items: center;
  //       display: flex;
  //       padding: 15px;
  //       .img-curunit {
  //         height: 40px;
  //         width: 45px;
  //         background: var(--inv-bar-bg);
  //         border: 2px solid var(--inv-bar-border-color);
  //         border-radius: 7px;
  //         margin-right: 10px;
  //       }
  //     }
  //     .nums-curunit {
  //       display: flex;
  //       text-align: center;
  //       align-items: center;
  //       width: 50%;
  //       padding: 15px;
  //       .curunit-nums {
  //         min-width: 50px;
  //         line-height: 40px;
  //         background: var(--inv-bar-bg);
  //         border: 2px solid var(--inv-bar-border-color);
  //         border-radius: 7px;
  //         font-weight: 700;
  //         margin: 0 10px 0 0;
  //       }
  //     }
  //   }
  //   .develop {
  //     color: #e4cfa6 !important;
  //     font-size: 11px;
  //     text-align: center;
  //   }
  //   .claimed-btn {
  //     width: 90%;
  //     margin: 15px 15px 10px 15px;
  //     height: 44px;
  //     border-radius: 8px;
  //     background: var(--btn-gray-color) !important;
  //     text-align: center;
  //     line-height: 44px;
  //   }
  // }
  // .btn--gray {
  //   color: #999 !important;
  // }
  // .mean {
  //   margin: 15px 0 0 0;
  //   font-size: 14px;
  //   .mean-p {
  //     padding-top: 10px;
  //     color: #898d97;
  //   }
  // }
  // .invite-bottom {
  //   position: fixed;
  //   width: 100%;
  //   height: auto;
  //   left: 0;
  //   bottom: 0;
  //   z-index: 999;
  //   background-color: rgba(0, 0, 0, 0.8);
  //   color: #fff;
  //   padding: 15px;
  //   .link-code {
  //     display: flex;
  //     font-size: 12px;
  //     padding: 0 10px 0 0;
  //     justify-content: space-between;
  //     .code {
  //       width: 46%;
  //     }
  //   }
  //   .bottom-btns {
  //     display: flex;
  //     flex-direction: row;
  //     padding: 10px 0 0 0;
  //     margin: 0 10px 0 -20px;
  //     .bottom-btn {
  //       width: 40%;
  //       font-size: 15px;
  //       height: 40px;
  //       font-weight: 700;
  //       background-color: var(--inv-btn-bg) !important;
  //       color: #ccc !important;
  //     }
  //   }
  // }
  // .fan-card {
  //   color: var(--body-color);
  //   border-radius: var(--card-radius);
  //   background: var(--card-style);
  //   box-shadow: var(--card-shadow);
  // }
  // .m-line {
  //   overflow: hidden;
  //   word-break: break-all;
  //   text-overflow: ellipsis;
  //   display: -webkit-box;
  //   -webkit-box-orient: vertical;
  //   -webkit-line-clamp: 1;
  // }
}
</style>
