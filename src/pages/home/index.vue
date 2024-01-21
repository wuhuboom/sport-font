<template>
  <view class="content home" @click="handleOutClick">
    <nav-aside></nav-aside>

    <movable-area v-if="switchShow" class="movable-area">
      <movable-view class="movable-view" :x="x" :y="y" direction="all">
        <image
          @click.stop="goLottery"
          class="box-image"
          src="/static/images/safeBox/choujiang.png"
      /></movable-view>
    </movable-area>
    <view class="topbar"></view>
    <view class="main">
      <view class="index-banner">
        <uni-swiper-dot
          class="index-swiper"
          :info="sliderList"
          :current="current"
          :mode="mode"
        >
          <swiper
            style="height: 384rpx"
            @change="change"
            :current="swiperDotIndex"
            :autoplay="true"
          >
            <swiper-item v-for="(item, index) in sliderList" :key="index">
              <view
                class="swiper-img"
                :style="{
                  backgroundImage: `url(${item.localPath})`,
                }"
              >
              </view>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>
      <uni-notice-bar
        class="home-notice"
        show-icon
        scrollable
        :text="notice"
        :speed="50"
      />
      <view class="index-panel">
        <view class="panel-top">
          <p class="panel-icon"></p>
          <text class="panel-text">{{ $t("home.Upcoming") }}</text>
          <view class="strongbox"></view>
        </view>
        <view class="panel-body" @click.stop="goEventDetails(eventDetails.id)">
          <view class="fan-card">
            <view class="card-body">
              <view class="body-left">
                <view class="u-img">
                  <view
                    class="img-one"
                    :style="{
                      backgroundImage: `url(${eventDetails.mainLogo})`,
                    }"
                  ></view>
                </view>
                <view class="u-img2">
                  <view
                    class="img-two"
                    :style="{
                      backgroundImage: `url(${eventDetails.guestLogo})`,
                    }"
                  ></view>
                </view>
              </view>
              <view class="body-right">
                <view class="right-name">{{ eventDetails.mainName }}</view>
                <view class="right-gradient">
                  <view class="vs">VS</view>
                  <view class="bottomBor"></view>
                </view>
                <view class="right-name">{{ eventDetails.guestName }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="coming-bar">
          <view class="bar-item">
            <uni-icons
              class="icon-time"
              custom-prefix="iconfont"
              type="icon-shijian"
              size="16"
            ></uni-icons>
            <view>{{ format(eventDetails.startTime) }}</view>
          </view>
          <view class="bar-ls-name">
            <uni-icons
              class="icon-football"
              custom-prefix="iconfont"
              type="icon-zuqiu"
              size="16"
            ></uni-icons>
            <p>{{ eventDetails.allianceName }}</p>
          </view>
        </view>
      </view>
      <view class="u-m-b-16">
        <view class="skeleton-fillet">
          <view class="skeleton-fillet-icon">
            <text class="ing-icon"></text>{{ $t("home.topEvents") }}
          </view>
          <view class="index-more" @click="goAllEvents">{{
            $t("home.moreEvents")
          }}</view>
        </view>
        <view class="u-skeleton-fillet">
          <uni-swiper-dot class="fillet-swiper" :filletSwiper="eventDetailsOne">
            <swiper class="fillet-swiper-box">
              <swiper-item
                @tap="goEventDetails(item.id)"
                class="fillet-swiper-item"
                v-for="(item, index) in eventDetailsOne"
                :key="index"
              >
                <view class="game-box-card">
                  <view class="market-greendark">
                    <view class="game-top">
                      <view class="game-top-left">
                        <uni-icons
                          class="game-top-time"
                          custom-prefix="iconfont"
                          type="icon-shijian"
                          size="16"
                        ></uni-icons>
                        <uni-countdown
                          class="game-top-time-down"
                          :font-size="12"
                          :show-day="false"
                          :hour="formatMs(item.remainingTime, 'h')"
                          :minute="formatMs(item.remainingTime, 'mm')"
                          :second="formatMs(item.remainingTime, 'ss')"
                        />
                      </view>
                      <view
                        class="game-top-right"
                        @click="goEventDetails(item.id)"
                      >
                        <text class="game-top-right-font">{{
                          $t("home.more")
                        }}</text>
                        <view class="game-top-right-icon"></view>
                      </view>
                    </view>
                    <view class="game-body">
                      <view class="game-body-id"
                        >id : {{ item.id + "&nbsp;" }}
                        <p @tap.stop="copyCode(item.id)">
                          <uni-icons
                            custom-prefix="iconfont"
                            color=""
                            type="icon-fuzhi"
                            size="20"
                          ></uni-icons>
                        </p>
                      </view>
                      <view class="game-body-main">
                        <view class="game-body-main-col">
                          <view class="game-body-main-col-view">
                            <image
                              class="game-body-main-col-view-img"
                              :src="item.mainLogo"
                              mode="scaleToFill"
                            />
                          </view>

                          <view class="game-body-main-col-name">{{
                            item.mainName
                          }}</view>
                        </view>
                        <view class="game-body-main-center">
                          <view class="game-body-main-center-score">VS</view>
                          <!-- <view class="game-body-main-center-odds">{{
                            item.odds
                          }}</view> -->
                        </view>
                        <view class="game-body-main-col">
                          <view class="game-body-main-col-view">
                            <image
                              class="game-body-main-col-view-img"
                              :src="item.guestLogo"
                              mode="scaleToFill"
                            />
                          </view>

                          <view class="game-body-main-col-name">{{
                            item.guestName
                          }}</view>
                        </view>
                      </view>
                      <!-- <view class="game-body-bar">
                        <view class="game-body-bar-progress">
                          <view
                            class="progress-active"
                            :style="{ width: item.percent + '%' }"
                          ></view>
                        </view>
                        <view class="game-body-volume"
                          >Trading Volume:{{ item.tradingVolume }}M</view
                        >
                      </view> -->
                    </view>
                  </view>
                </view>
              </swiper-item>
            </swiper>
          </uni-swiper-dot>
        </view>
        <view class="u-skeleton-fillet" style="margin-top: 28rpx">
          <uni-swiper-dot class="fillet-swiper" :filletSwiper="eventDetailsTwo">
            <swiper class="fillet-swiper-box">
              <swiper-item
                @tap.stop="goEventDetails(item.id)"
                class="fillet-swiper-item"
                v-for="(item, index) in eventDetailsTwo"
                :key="index"
              >
                <view class="game-box-card">
                  <view class="market-greendark">
                    <view class="game-top">
                      <view class="game-top-left">
                        <uni-icons
                          class="game-top-time"
                          custom-prefix="iconfont"
                          type="icon-shijian"
                          size="16"
                        ></uni-icons>
                        <uni-countdown
                          class="game-top-time-down"
                          :font-size="12"
                          :show-day="false"
                          :hour="formatMs(item.remainingTime, 'h')"
                          :minute="formatMs(item.remainingTime, 'mm')"
                          :second="formatMs(item.remainingTime, 'ss')"
                        />
                      </view>
                      <view class="game-top-right">
                        <text class="game-top-right-font">{{
                          $t("home.more")
                        }}</text>
                        <view class="game-top-right-icon"></view>
                      </view>
                    </view>
                    <view class="game-body">
                      <view class="game-body-id"
                        >id : {{ item.id }}
                        <view @tap.stop="copyCode(item.id)">
                          <uni-icons
                            custom-prefix="iconfont"
                            color=""
                            type="icon-fuzhi"
                            size="20"
                          ></uni-icons>
                        </view>
                      </view>
                      <view class="game-body-main">
                        <view class="game-body-main-col">
                          <view class="game-body-main-col-view">
                            <image
                              class="game-body-main-col-view-img"
                              :src="item.mainLogo"
                              mode="scaleToFill"
                            />
                          </view>

                          <view class="game-body-main-col-name">{{
                            item.mainName
                          }}</view>
                        </view>
                        <view class="game-body-main-center">
                          <view class="game-body-main-center-score">VS</view>
                          <!-- <view class="game-body-main-center-odds">{{
                            item.odds
                          }}</view> -->
                        </view>
                        <view class="game-body-main-col">
                          <view class="game-body-main-col-view">
                            <image
                              class="game-body-main-col-view-img"
                              :src="item.guestLogo"
                              mode="scaleToFill"
                            />
                          </view>

                          <view class="game-body-main-col-name">{{
                            item.guestName
                          }}</view>
                        </view>
                      </view>
                      <!-- <view class="game-body-bar">
                        <view class="game-body-bar-progress">
                          <view
                            class="progress-active"
                            :style="{ width: item.percent + '%' }"
                          ></view>
                        </view>
                        <view class="game-body-volume"
                          >Trading Volume:{{ item.tradingVolume }}M</view
                        >
                      </view> -->
                    </view>
                  </view>
                </view>
              </swiper-item>
            </swiper>
          </uni-swiper-dot>
        </view>
        <view class="more-events home-fan-card" @click="goAllEvents">
          <view class="all-events">{{ $t("home.allEvents") }}</view>
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="foot-cell">
        <view class="end-logo">
          <view class="end-logo-center">
            <view class="end-logo-img"></view>
            <text>{{ projectName }}</text>
          </view>
        </view>
        <view class="foot-grid">
          <view class="foot-grid-top">{{
            $t("home.companyRegistrationNumber")
          }}</view>
          <view class="foot-grid-tbottom">{{ $t("home.companyProfile") }}</view>
        </view>
      </view>
      <view class="lang-bar">
        <view class="lang-swicth">
          <easy-select
            ref="easySelect"
            size="medium"
            style="width: 180px"
            :label="vuex_lang_lab"
            :images="vuex_lang_img"
            :options="selectOptions"
            @selectOne="handleSelect"
          ></easy-select>
        </view>
        <view class="btn-ac" @click="btnTop">
          <uni-icons class="icon-arrup" type="top" size="16"></uni-icons>
          <text>{{ $t("home.topBtn") }}</text>
        </view>
      </view>
      <view class="footer-end">
        <!-- <view class="btn-ac-group">
          <view class="mod-bar-light" @click="changeTheme('dark')">
            <uni-icons
              class="light-icon"
              custom-prefix="iconfont"
              type="icon-dark-full"
              size="22"
            ></uni-icons>
          </view>
          <view class="mod-bar-drak" @click="changeTheme('light')">
            <uni-icons
              class="dark-icon"
              custom-prefix="iconfont"
              type="icon-tianqitaiyangqichuang"
              size="22"
            ></uni-icons>
          </view>
        </view> -->
      </view>
      <view class="footer-line"></view>
      <view class="footer-row">
        <view class="col" @click="goAboutUniversal"
          >{{ $t("home.about") }} {{ projectName }}</view
        >
        <view class="col" @click="onlineService">{{
          $t("home.contactUs")
        }}</view>
        <view class="col" @click="goAboutUniversal">{{
          $t("home.termsOfService")
        }}</view>
      </view>
      <view class="footer-info"
        >{{ $t("home.copyright") }} {{ projectName }}</view
      >
    </view>
    <uni-popup
      ref="popupEvent"
      background-color="#fff"
      type="bottom"
      :is-mask-click="true"
    >
      <event-popup></event-popup>
    </uni-popup>
    <uni-popup
      ref="eventDetailsPopup"
      background-color="#fff"
      type="center"
      class="uni-details-popup"
      :is-mask-click="true"
    >
      <details-popup></details-popup>
    </uni-popup>
    <u-tabbar></u-tabbar>
  </view>
</template>
<script>
export default {
  name: "home",
  components: {},
  props: {},
  data() {
    return {
      x: 320, //x坐标
      y: 320, //y坐标
      //轮播图集合
      sliderList: [],
      //公告栏数据
      notice: "",
      eventDetails: {},
      eventDetailsOne: [],
      eventDetailsTwo: [],
      selecValue: {
        img: require("../../static/images/flag/en.jpg"),
        label: "EN",
      },
      selectOptions: [
        {
          label: "EN",
          img: require("../../static/images/flag/en.jpg"),
        },
        {
          label: "INS",
          img: require("../../static/images/flag/in.png"),
        },
        {
          label: "DE",
          img: require("../../static/images/flag/de.png"),
        },
        {
          label: "FR",
          img: require("../../static/images/flag/fr.png"),
        },
        {
          label: "ES",
          img: require("../../static/images/flag/es.png"),
        },
      ],
      current: 0,
      mode: "dot", //default 、round 、 indexes、nav
      swiperDotIndex: 0,
      switchShow: false,
      copyVal: "123",
    };
  },
  computed: {},
  methods: {
    goLottery() {
      this.$Router.push("/lottery");
    },
    handleOutClick() {
      this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions();
    },
    homeinit() {
      //获取热门赛事
      this.$api.getHot().then((res) => {
        if (res.data.length >= 2) {
          let arr1, arr2;
          arr1 = res.data.slice(0, Math.round(res.data.length / 2));
          arr2 = res.data.slice(
            Math.round(res.data.length / 2),
            Math.round(res.data.length / 2) * 2
          );
          this.eventDetails = res.data[0];
          this.eventDetailsOne = arr1;
          this.eventDetailsTwo = arr2;
        }
      });
      //获取系统公告
      this.$api.getSwiper().then((res) => {
        this.notice = res.data[0].content;
      });
      //获取轮播图
      this.$api.getSlider().then((res) => {
        this.sliderList = res.data;
      });
    },
    handleSelect(option) {
      this.selecValue = option;
      this.$updateStore("vuex_lang", option.label.toLowerCase());
      this.$updateStore("vuex_lang_img", option.img);
      this.$updateStore("vuex_lang_lab", option.label);
      this.$i18n.locale = option.label.toLowerCase();
    },
    goEventDetails(id) {
      this.$Router.push({ name: "eventDetails", params: { id: id } });
    },
    goStrongBox() {
      this.$Router.push("/strongbox");
    },
    goAllEvents() {
      this.$Router.push("/marketList");
    },
    goAboutUniversal() {
      this.$Router.push("/aboutUniversal");
    },
    //轮播图滑动
    change(e) {
      this.current = e.detail.current;
    },
    initSelecLang() {
      const currentLang = this.vuex_lang.toUpperCase();
      const currentSelect = this.selectOptions.find(
        (item) => item.label == currentLang
      );
      this.selecValue = currentSelect;
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
    formatMs(times, type) {
      var hours = parseInt(times / (1000 * 60 * 60));
      var minutes = parseInt((times % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = parseInt((times % (1000 * 60)) / 1000);
      if (type === "h") {
        return hours;
      } else if (type === "mm") {
        return minutes;
      } else {
        return seconds;
      }
    },
    appInit() {
      if (this.vuex_token && this.vuex_token !== "") {
        if (Object.keys(this.vuex_user).length < 5) {
          this.$api.getInfo().then((res) => {
            this.$updateStore("vuex_user", res.data);
          });
        }
        if (!this.vuex_serviceAddr || this.vuex_serviceAddr == "") {
          this.$api.getServ().then((res) => {
            this.$updateStore("vuex_serviceAddr", res.data.serviceAddr);
          });
        }
      }
    },
    checkPayPwd() {
      if (this.vuex_token && this.vuex_token !== "") {
        this.$api.checkPayPwd().then((res) => {
          if (res.data.paySet === 1) {
            this.$updateStore("vuex_isPayPwd", 1);
          } else {
            this.$updateStore("vuex_isPayPwd", 2);
            this.$Router.push("/payPwdSet");
          }
        });
      }
    },
    //跳转顶部
    btnTop() {
      uni.pageScrollTo({
        scrollTop: 0,
      });
    },
    onlineService() {
      this.$api.getServ().then((res) => {
        window.location.href = res.data.serviceAddr;
      });
    },
    //刷新一下账户余额
    loadmoney() {
      this.$api.getInfo().then((res) => {
        this.$updateStore("vuex_user", res.data);
      });
    },
    checkLottery() {
      this.$api.bingoCount().then((res) => {
        if (res.data.switch == 1) {
          this.switchShow = true;
        }
      });
    },
    tap: function (e) {
      this.x = this.old.x;
      this.y = this.old.y;
      this.$nextTick(function () {
        this.x = 30;
        this.y = 30;
      });
    },
    onChange: function (e) {
      this.old.x = e.detail.x;
      this.old.y = e.detail.y;
    },
  },
  watch: {},
  mounted() {
    this.checkPayPwd();
    this.homeinit();
    this.appInit();
    this.checkLottery();
    //this.initSelecLang();
    this.loadmoney();
    this.$updateStore("projectName", config.projectName);
    this.$updateStore("baseUrl", config.baseUrl);
    this.$updateStore("amountRate", config.amountRate);
    console.log();
  },
  onShow() {},
};
</script>
<style scoped lang="scss">
$all_width: 96rpx;
$all_height: 96rpx;
.home {
  .home-fan-card {
    color: var(--body-color);
    border-radius: var(--card-radius);
    background: var(--card-style);
    box-shadow: var(--card-shadow);
    border: var(--fan-card-border);
  }

  .main {
    margin-top: 60px;
    background-image: var(--index-main-bg);
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
    background-attachment: fixed;
    padding: calc(30rpx + env(safe-area-inset-top)) 30rpx 30rpx 30rpx;

    .index-banner {
      display: flex;
      align-items: flex-end;

      .index-swiper {
        width: 460rpx;
        height: 384rpx;

        .swiper-img {
          width: 100%;
          height: 100%;
          border-radius: var(--card-radius);
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: 100% 100%;
        }
      }

      .banner-left {
        height: 354rpx;
        width: 240rpx;
        margin-left: 10px;
        border-radius: var(--card-radius);
        background-repeat: no-repeat;
        background-position: 50;
        background-size: cover;
      }
    }

    .index-panel {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      margin-top: 20rpx !important;
      margin-bottom: 30rpx !important;

      .panel-top {
        display: flex;
        height: 60rpx;
        .strongbox {
          color: var(--index-more-color);
          display: inline-flex;
          margin-left: auto;
        }

        .panel-icon {
          width: 40rpx;
          height: 40rpx;
          margin-right: 20rpx;
          background-image: var(--game-icon);
          background-repeat: no-repeat;
          background-size: contain;
          background-position: 50%;
        }

        .panel-text {
          font-size: 14px;
          font-weight: 700;
        }
      }

      .panel-body {
        display: flex;

        .fan-card {
          width: 100%;
          color: var(--body-color);
          border-radius: var(--card-radius);
          background: var(--card-style);
          box-shadow: var(--card-shadow);
          padding: 30rpx 0rpx;
          display: flex;
          background-color: var(--home-card-color);
          border: var(--fan-card-border);
          padding: 30rpx 0;

          .card-body {
            display: flex;
            padding: 0 28rpx;

            .body-left {
              display: flex;
              min-width: 150rpx;
              max-width: 150rpx;

              .u-img {
                width: 55rpx;
                display: flex;
                background: var(--tab-item-bg);
                border-radius: 50%;
                box-shadow: 2rpx 0 18rpx rgba(0, 0, 0, 0.2);
                overflow: hidden;
                padding: 12rpx;

                .img-one {
                  width: 100%;
                  height: 100%;
                  background-position: center;
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-image: url("/static/images/temporary/homePanlerOne.png");
                }
              }

              .u-img2 {
                width: 55rpx;
                height: 55rpx;
                line-height: 60rpx;
                font-weight: 700;
                font-size: 40rpx;
                display: flex;
                background: var(--tab-item-bg);
                color: var(--body-color);
                border-radius: 50%;
                box-shadow: 1px 0 10px rgba(0, 0, 0, 0.2);
                margin-left: -18rpx;
                overflow: hidden;
                padding: 12rpx;

                .img-two {
                  width: 100%;
                  height: 100%;
                  background-position: center;
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-image: url("/static/images/temporary/homePanlerTwo.png");
                }
              }
            }

            .body-right {
              display: flex;
              align-items: center;
              padding: 0 28rpx;

              .right-name {
                color: #fff; //这个地方到时候要做成变量
                width: 30%;
                overflow: hidden;
                padding: 0 3rpx;
                animation: 3s linear 1s infinite alternate slidein;
                float: left;
                white-space: nowrap;
              }

              .right-gradient {
                text-align: center;
                padding: 0 30rpx;
                font-weight: 700;

                .vs {
                  background: var(--font-color);
                  background-clip: text;
                  -webkit-text-fill-color: transparent;
                }

                .bottomBor {
                  margin: 0 auto;
                  width: 28rpx;
                  height: 6rpx;
                  border-radius: var(--card-radius);
                  background: var(--font-color);
                }
              }
            }
          }
        }
      }

      .coming-bar {
        margin-top: 20rpx !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20rpx;

        .bar-item {
          display: flex;
          max-width: 35%;

          .icon-time {
            color: var(--body-color) !important;
          }
        }

        .bar-ls-name {
          display: flex;
          text-align: right;
          max-width: 60%;

          .icon-football {
            color: var(--body-color) !important;
          }
        }
      }
    }

    .home-notice {
      margin: 15px 0;
      background: var(--ui-color-light) !important;
      padding: 5px 12px 5px 3px;
      border-radius: 8px;
    }

    .u-m-b-16 {
      .skeleton-fillet {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 30px;
        margin-bottom: 10px;
        line-height: 1;
        overflow: hidden;

        .skeleton-fillet-icon {
          display: flex;
          align-items: center;
          font-size: 28rpx;
          font-weight: 700;

          .ing-icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: 50%;
            background-image: var(--ing-icon);
          }
        }

        .index-more {
          color: var(--index-more-color);
          display: inline-flex;
          margin-left: auto;
        }
      }

      .u-skeleton-fillet {
        .fillet-swiper {
          min-height: 300rpx;

          .fillet-swiper-box {
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translate(0%, 0px) translateZ(0px);

            .fillet-swiper-item {
              width: 90% !important;

              .game-box-card {
                background-color: var(--home-card-color);
                height: 300rpx;
                margin-right: 30rpx !important;
                border-radius: var(--card-radius) !important;

                .game-top {
                  display: flex;
                  padding-left: 15px;
                  height: 38px;
                  background: var(--card-top-color);
                  background-size: cover;
                  border-radius: var(--card-radius) var(--card-radius) 0 0 !important;

                  .game-top-left {
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    .game-top-time {
                      margin-right: 5rpx !important;
                      font-size: 25rpx;
                      color: var(--game_top-color) !important;
                    }

                    .game-top-time-down {
                      margin-left: 5rpx !important;

                      &::v-deep .uni-countdown__number {
                        color: var(--home-uni-countdown-color) !important;
                      }

                      &::v-deep .uni-countdown__splitor {
                        color: var(--home-uni-countdown-color) !important;
                      }
                    }
                  }

                  .game-top-right {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-left: auto;
                    height: 66rpx;
                    font-size: 20rpx;
                    padding: 0 18rpx;
                    border-radius: 0 18rpx 0 0;

                    .game-top-right-font {
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      opacity: 0.6;
                      color: var(--game_top-color);
                    }

                    .game-top-right-icon {
                      display: inline-block;
                      width: 32rpx;
                      height: 14rpx;
                      background: url("/static/images/more-dot.png") no-repeat;
                      background-size: contain;
                      margin-left: 10rpx;
                    }
                  }
                }

                .game-body {
                  text-align: center;
                  padding: 20rpx 32rpx 36rpx;
                  .game-body-id {
                    height: 20px;
                    width: 45%;
                    display: flex;
                    align-content: center;
                  }
                  .game-body-main {
                    display: flex;
                    width: 100%;
                    .game-body-main-col {
                      flex: 1;
                      min-width: 0;
                      padding: 0 32rpx;
                      width: 680rpx;
                      .game-body-main-col-view {
                        width: 90rpx;
                        height: 90rpx;
                        background: var(--tab-item-bg);
                        border-radius: 50%;
                        padding: 12rpx;
                        .game-body-main-col-view-img {
                          margin: 0 auto;
                          border-radius: 50%;
                          width: 90rpx;
                          height: 90rpx;
                        }
                      }

                      .game-body-main-col-name {
                        color: #fff;
                        overflow: hidden;
                        max-width: 100%;
                        animation: 3s linear 1s infinite alternate slidein;
                        float: left;
                        white-space: nowrap;
                      }
                    }

                    .game-body-main-center {
                      text-align: center;
                      font-weight: 700;
                      margin-top: 20rpx;
                      padding: 0 30rpx;

                      .game-body-main-center-score {
                        color: #fff !important;
                        line-height: 48px;
                        font-size: 48rpx;
                      }

                      .game-body-main-center-odds {
                        color: #fff !important;
                        font-size: 28rpx;
                      }
                    }
                  }

                  .game-body-bar {
                    margin-top: 20px !important;
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    .game-body-bar-progress {
                      flex: 1;
                      min-width: 0;
                      height: 16rpx;
                      border-radius: 100rpx;
                      background-color: var(--inactive-color);

                      .progress-active {
                        height: 100%;
                        border-radius: 100rpx;
                        background: var(--active-color);
                      }
                    }

                    .game-body-volume {
                      min-width: 220rpx;
                      margin-left: 20rpx;
                      text-align: right;
                      color: var(--market-link-color);
                    }
                  }
                }
              }
            }
          }
        }
      }

      .more-events {
        margin-top: 20rpx;
        background-color: var(--home-card-color);

        .all-events {
          height: 98rpx;
          text-align: center;
          line-height: 100rpx;
          color: #fff !important;
        }
      }
    }

    .u-m-b-30 {
      margin-bottom: 15px !important;
      margin-top: 20rpx !important;

      .quk-top {
        display: flex;
        height: 60rpx;

        .quk-icon {
          width: 40rpx;
          height: 40rpx;
          margin-right: 20rpx;
          background-image: var(--quk-icon);
          background-repeat: no-repeat;
          background-size: contain;
          background-position: 50%;
        }

        .quk-text {
          font-size: 14px;
          font-weight: 700;
        }
      }

      .bs-table {
        .uni-table {
          min-width: 540rpx;
          width: 100%;

          .uni-table-tr {
            display: table-row;
            transition: all 0.3s;
            box-sizing: border-box;
            background-color: var(--home-table-tr-color);

            .uni-table-th {
              color: var(--body-color) !important;
              border: 0 !important;
              font-size: 28rpx !important;
              background: var(--table-top-color);
              padding: 34rpx 20px !important;
              border-radius: var(home-table-border-radius);
            }

            .uni-table-th1 {
              color: var(--body-color) !important;
              border: 0 !important;
              font-size: 30rpx !important;
              background: var(--table-top-color);
              padding: 34rpx 20rpx !important;
              border-radius: var(home-table-border-radius-1);
            }
          }

          .uni-table-td {
            padding-top: 18px !important;
            color: var(--home-table-td-font-color) !important;
            border: 0 !important;
          }
        }
      }
    }
  }
  .movable-area {
    position: fixed;
    width: 100%;
    height: 80%;
    pointer-events: none;
    z-index: 1;
    .movable-view {
      width: $all_width;
      height: $all_height;
      pointer-events: auto; //恢复鼠标事件
      display: inline-block;
      position: relative;
      pointer-events: auto;
      image {
        width: $all_width;
        height: $all_height;
        animation: box-ani 10s infinite linear;
      }
      @keyframes box-ani {
        from {
          transform: rotate(0);
        }

        to {
          transform: rotate(360deg);
        }
      }
    }
  }

  .footer {
    background: var(--footer-bg);
    padding: 20px 16px;
    color: var(--body-color);

    .foot-cell {
      .end-logo {
        font-size: 50rpx;
        font-weight: 700;
        margin-left: 20rpx;
        font-family: Heavy;

        .end-logo-center {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          .end-logo-img {
            width: 54px;
            height: 44px;
            border-radius: 0px;
            position: relative;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url("/static/images/temporary/endLogo.png");
          }
        }
      }

      .foot-grid {
        padding-top: 20px;
        padding-bottom: 30px;

        .foot-grid-top {
          font-size: 28rpx;
          color: var(--text-light);
        }

        .foot-grid-tbottom {
          font-size: 28rpx;
          color: var(--text-light);
        }
      }
    }

    .lang-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      .lang-swicth {
        .easy-select {
          height: 50px !important;
          display: flex;
          align-items: center;
          border-radius: var(--card-radius);
          background-color: var(--home-lang-bar-color) !important;

          &::v-deep .easy-select-options {
            background-color: var(--home-lang-bar-color) !important;
          }

          &::v-deep .easy-select-options-item {
            background-color: var(--home-lang-bar-color) !important;
            height: 40px !important;
          }
        }
      }

      .faq-swicth {
        min-width: 38%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin-left: 10px;
        border-radius: var(--card-radius);
        background-color: var(--home-lang-bar-color) !important;

        .faq-swicth-icon {
          color: var(--home-lang-bar-color-icon) !important;
        }
      }

      .btn-ac {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        font-size: 12px;
        font-weight: 700;
        border-radius: var(--faq-radius);
        background-color: var(--faq-bg);
        margin-left: 20px;
        .icon-arrup {
          color: var(--home-lang-bar-color-icon) !important;
        }
      }
    }

    .footer-end {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;

      .btn-ac-group {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 46px;
        border-radius: var(--faq-radius);
        background-color: var(--faq-bg);
        margin-right: 30px;

        .mod-bar-light {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--faq-radius);
          background-color: var(--home-change-light-color);
          color: var(--mod-color);

          .light-icon {
            color: var(--home-light-icon-color) !important;
          }
        }

        .mod-bar-drak {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--faq-radius);
          background-color: var(--home-change-dark-color);
          color: var(--mod-active-color);

          .dark-icon {
            color: var(--home-light-icon-color) !important;
          }
        }
      }
    }

    .footer-line {
      margin: 20px 0 10px;
      height: 1px;
      border-bottom: 1px solid var(--foot-line-color);
    }

    .footer-info {
      color: var(--foot-info-color);
      text-align: center;
      margin: 20px 0 50px 0;
    }

    .footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .col {
        width: 25%;
        text-align: center;
        color: var(--home-lang-bar-color-icon) !important;
      }
    }
  }
}
</style>
