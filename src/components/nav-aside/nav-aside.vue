<template>
  <view class="nav-side">
    <uni-nav-bar class="nav-custom" background-color="var(--mar-bg)">
      <template #left>
        <view class="nav-left">
          <view class="img" @click="$refs.showLeft.open()"></view>
          <text class="text">{{ projectName }}</text>
        </view>
      </template>
      <template #right>
        <view class="nav-right">
          <view class="btn" @click="naviga('/deposit')">
            <text class="btn-text">{{ vuex_user.balance / amountRate }}</text>
            <uni-icons type="wallet-filled" size="22" color="#fff"></uni-icons>
          </view>

          <view class="right-icon" @click="naviga('/message')"></view>
        </view>
      </template>
    </uni-nav-bar>

    <uni-drawer ref="showLeft" class="u-drawer" :width="350" mode="left">
      <scroll-view style="height: 100%" scroll-y="true">
        <view class="menu-container">
          <uni-icons
            class="close-icon"
            type="closeempty"
            size="24"
            @click="$refs.showLeft.close()"
          ></uni-icons>
          <view class="user-cell">
            <view class="avatar">
              <img src="/static/images/default.png" />
            </view>
            <view class="user-info">
              <text class="user-name">{{ vuex_user.username }}</text>
              <view class="user-level">
                <!-- @click="naviga('/vip')" -->
                <view class="vip">
                  <image
                    class="vip-icon"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzBFRTA5QTgzRTNBMTFFRDk2MzFFQjE2MUVDQTkzM0YiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzBFRTA5QTczRTNBMTFFRDk2MzFFQjE2MUVDQTkzM0YiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NURBRjE3QTkzQTM2MTFFRDgwREM4MkUwQzNCOTc3MzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NURBRjE3QUEzQTM2MTFFRDgwREM4MkUwQzNCOTc3MzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6TrUQmAAACTklEQVR42txWO0sEMRDO3O5h4QsfIIqNKL5AsPI6FQtBW3+CYGEpiIiFnZWlFjZ2YiFaqfUWghZaiCD4B0SwVBGRu/HL3u5tks0+TuEKA18ek2RmMl9exMyikakgGpzc8vY+zLIgByt1KgD7oFq9UpP7MreyifY68MGFyppwyifRmLJSBvVCUA/K6grJz51M90isIN8BOoB+IfgI5XS1M6RGpahWd9SQzsPeM8pP4ABosRvjWeR7hrQInAEDvtMUm9UHXADf6HtEOSwNHgK9UCgnyxXcApOahyQGkZ+iXYzktb4u4By1NiVaMi0A99C7GEjHgC1psEcJmUwjUHaDcjWQtSOXCjsNJ1Tl48BxELoijOyivAS6jdB2u8jugJJmlEQTsA/ModUKjKaT6yvESlhSMgFMxcPrj7l30eGhUUrQtGTZODauwrScsNlCo9cypF7uQ0T1nDjrhXIDg3yFSrnOiSK6oDivg09ov8oVvqNy+6fVaWHmJGc99WrzEleUyhnrhqxjOcGgMphsyurZPGSpk24w4hEDmHKEMI27WB8/AS+qwffghkmhi1M6OYtzLxxXUDqyjwexfq2lGmaLQTw2upA3LFrwxoi3nGewPYECq8GQR8fw8gETJlP5InWnmRHB+RPiRX/xKc6jyQVlnr+wHQu3p/a7hmKvepFrG2TIyi/lu5Eg1+a6sViT2DA8bwZmWBVRHbdS9XGwfaJYP4+G53Zjmbs14i/Y4eavzc7jb14Lsh8116JkNhbqTM4SP1Bf8aP83z/CDTf4I8AAHu2u23FkVXsAAAAASUVORK5CYII="
                  >
                  </image>
                  <text class="vip-text">VIP{{ vuex_user.vipLevel }}</text>
                </view>
                <uni-icons
                  class="reload"
                  type="refreshempty"
                  size="12"
                  @click="handleReload"
                ></uni-icons>
              </view>
            </view>
          </view>
          <view class="user-card">
            <view class="user-info">
              <view class="banlance-num">
                <text>{{ vuex_user.balance / amountRate }}</text>
                <uni-icons
                  class="reload"
                  type="refreshempty"
                  size="12"
                  @click="handleReload"
                ></uni-icons>
              </view>
              <text class="balance-text">
                {{ $t("bar.balance") }}
              </text>
            </view>
            <view class="user-footer">
              <button
                class="footer-btn footer-btn-right"
                @click="naviga('/deposit')"
              >
                {{ $t("bar.btnleft") }}
              </button>
              <button
                class="footer-btn footer-btn-right"
                @click="naviga('/withdraw')"
              >
                {{ $t("bar.btnright") }}
              </button>
            </view>
          </view>
          <view class="menu-list">
            <uni-collapse>
              <uni-collapse-item
                title-border="none"
                class="as-nav-item"
                :show-arrow="false"
              >
                <template #title>
                  <view class="item-content" @click="naviga('/')">
                    <view class="img-ico img0"></view>
                    <text>{{ $t("bar.home") }}</text>
                  </view>
                </template>
              </uni-collapse-item>

              <uni-collapse-item
                title-border="none"
                class="as-nav-item"
                :border="false"
              >
                <template #title>
                  <view class="item-content">
                    <view class="img-ico img1"></view>
                    <text>{{ $t("bar.tournaments") }}</text>
                  </view>
                </template>

                <view class="sub-content">
                  <view @click="naviga('/marketList')" class="sub-item">{{
                    $t("bar.market")
                  }}</view>
                  <view @click="naviga('/result')" class="sub-item">{{
                    $t("bar.result")
                  }}</view>
                </view>
              </uni-collapse-item>

              <uni-collapse-item
                class="as-nav-item"
                title-border="none"
                :show-arrow="false"
              >
                <template #title>
                  <view @click="naviga('/order')" class="item-content">
                    <view class="img-ico img2"></view>
                    <text>{{ $t("bar.order") }}</text>
                  </view>
                </template>
              </uni-collapse-item>

              <uni-collapse-item
                :show-arrow="false"
                class="as-nav-item"
                title-border="none"
              >
                <template #title>
                  <view class="item-content" @click="naviga('/partners')">
                    <view class="img-ico img3"></view>
                    <text>{{ $t("bar.partners") }}</text>
                  </view>
                </template>
              </uni-collapse-item>

              <!-- <uni-collapse-item
                :show-arrow="false"
                class="as-nav-item"
                title-border="none"
              >
                <template #title>
                  <view class="item-content" @click="naviga('/hall')">
                    <view class="img-ico img4"></view>
                    <text>{{ $t("bar.hall") }}</text>
                  </view>
                </template>
              </uni-collapse-item> -->

              <uni-collapse-item
                class="as-nav-item"
                title-border="none"
                :border="false"
              >
                <template #title>
                  <view class="item-content">
                    <view class="img-ico img5"></view>
                    <text>{{ $t("bar.account") }}</text>
                  </view>
                </template>

                <view class="sub-content">
                  <view class="sub-item" @click="naviga('/history')">{{
                    $t("bar.history")
                  }}</view>
                  <view class="sub-item" @click="naviga('/order')">{{
                    $t("bar.trading")
                  }}</view>
                  <view class="sub-item" @click="naviga('/info')">{{
                    $t("bar.info")
                  }}</view>
                  <view class="sub-item" @click="naviga('/cardManage')">{{
                    $t("bar.card")
                  }}</view>
                </view>
              </uni-collapse-item>

              <!-- <uni-collapse-item :show-arrow="false" class="as-nav-item" title-border="none">
                <template #title>
                  <view class="item-content" @click="naviga('/help')">
                    <view class="img-ico img6"></view>
                    <text>{{ $t("bar.help") }}</text>
                  </view>
                </template>
              </uni-collapse-item> -->

              <uni-collapse-item
                :show-arrow="false"
                class="as-nav-item"
                title-border="none"
              >
                <template #title>
                  <view class="item-content" @click="naviga('/invite')">
                    <view class="img-ico img7"></view>
                    <text>{{ $t("bar.invite") }}</text>
                  </view>
                </template>
              </uni-collapse-item>

              <uni-collapse-item
                :show-arrow="false"
                class="as-nav-item"
                title-border="none"
              >
                <template #title>
                  <view class="item-content" @click="naviga('/aboutUniversal')">
                    <view class="img-ico img8"></view>
                    <text>{{ $t("bar.about") }} {{ projectName }}</text>
                  </view>
                </template>
              </uni-collapse-item>
            </uni-collapse>
          </view>
          <uni-row :gutter="12">
            <uni-col :span="12">
              <easy-select
                ref="easySelect"
                size="mini"
                :label="vuex_lang_lab"
                :images="vuex_lang_img"
                :options="selectOptions"
                @selectOne="handleSelect"
              ></easy-select>
            </uni-col>
          </uni-row>
          <text class="down-text" @click="downloadApp"
            >{{ $t("bar.down") }} {{ projectName }}</text
          >
          <button class="logout-btn" @click="logout">
            {{ $t("bar.logout") }}
          </button>
        </view>
      </scroll-view>
    </uni-drawer>
  </view>
</template>

<script>
export default {
  name: "nav-side",
  components: {},
  props: {},
  data() {
    return {
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
    };
  },
  computed: {},
  methods: {
    handleSelect(option) {
      this.selecValue = option;
    },
    handleReload() {
      this.$api.getInfo().then((res) => {
        this.$updateStore("vuex_user", res.data);
      });
    },
    naviga(path) {
      this.$refs.showLeft.close();
      this.$Router.push(path);
    },
    goService() {
      window.location.href = this.vuex_serviceAddr;
    },
    downloadApp() {
      const u = navigator.userAgent;
      if (u.indexOf("iPhone") != -1 || u.indexOf("iPad") != -1) {
        console.log(this.vuex_appurl.iosId);
        this.$api.appCount(this.vuex_appurl.iosId).then((res) => {});
        window.location.href = this.vuex_appurl.ios;
      } else {
        window.location.href = this.vuex_appurl.android;
        this.$api.appCount(this.vuex_appurl.androidId).then((res) => {});
      }
    },
    handleSelect(option) {
      this.selecValue = option;
      this.$updateStore("vuex_lang", option.label.toLowerCase());
      this.$updateStore("vuex_lang_img", option.img);
      this.$updateStore("vuex_lang_lab", option.label);
      this.$i18n.locale = option.label.toLowerCase();
    },
    logout() {
      this.$refs.showLeft.close();
      this.$api.logout().then((res) => {
        this.$updateStore("vuex_user", {});
        this.$updateStore("vuex_token", "");
        this.$updateStore("vuex_serviceAddr", "");
        this.$updateStore("vuex_isPayPwd", 1);
        this.$Router.push("/login");
      });
    },
  },
  watch: {},
  onLoad() {},
};
</script>
<style scoped lang="scss">
.nav-side {
  z-index: 9999999;
  position: fixed;
  top: 0;
  width: 100%;

  .nav-custom {
    position: relative;
    z-index: 99999;
    height: 60px;

    &::v-deep .uni-navbar--border {
      border-bottom: var(--mar-bg);
      height: 100% !important;
    }

    &::v-deep .uni-navbar__header {
      padding: 0 16px;
      height: 100% !important;
    }

    &::v-deep .uni-navbar__header-btns-left {
      width: 200px !important;
    }

    &::v-deep .uni-navbar__header-btns-right {
      width: 200px !important;
    }

    .nav-left {
      display: flex;

      .img {
        margin-right: 10px;
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
        background-image: var(--menun-head-img);
        background-repeat: no-repeat;
      }

      .text {
        font-size: 18px;
        font-weight: 700;
        color: var(--navbar-color) !important;
      }
    }

    .nav-right {
      display: flex;
      align-items: center;

      .btn {
        height: 60rpx;
        min-width: 100rpx;
        padding: 0 8px !important;
        color: var(--bar-color);
        border-radius: var(--card-radius);
        margin-right: 10px;
        overflow: hidden;
        padding: 2px;
        box-shadow: 0 2px 4px 0 rgba(14, 14, 14, 0.05);
        background: var(--bar-gradient);
        line-height: 60rpx;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
      }

      .right-icon {
        display: inline-flex;
        width: 22px;
        height: 22px;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: contain;
        background-image: url("/static/images/tz.png");
        // background-image: var(--message-icon);
      }
    }
  }

  .u-drawer {
    top: 60px;

    .menu-container {
      padding: calc(35px + env(safe-area-inset-top)) 16px 20px 16px;
      background-color: var(--menu-aside-color);
      background-image: var(--aside-bg);
      background-position: top;
      background-repeat: no-repeat;
      background-size: contain;
      min-height: 100%;

      .close-icon {
        color: var(--body-color) !important;
        position: absolute;
        right: 16px;
        top: 16px;
        cursor: pointer;
      }

      .user-cell {
        display: flex;
        align-items: center;

        .avatar {
          margin-right: 10px;

          img {
            height: 55px;
            width: 55px;
          }
        }

        .user-info {
          height: 55px;
          display: flex;
          flex-direction: column;

          .user-name {
            font-size: 24px;
            font-weight: 700;
            line-height: 1;
            margin-bottom: 8px;
          }

          .user-level {
            display: flex;
            align-items: center;

            .vip {
              display: flex;
              align-items: center;

              .vip-icon {
                width: 14px;
                height: 14px;
                margin-right: 8px;
              }

              .vip-text {
                background: linear-gradient(94deg, #fedc45, #fb7099);
                background-clip: border-box;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 12px;
                font-weight: 700;
              }
            }

            .reload {
              margin-left: 12px !important;
              color: var(--navbar-color) !important;
            }
          }
        }
      }

      .user-card {
        padding: 15px;
        border-radius: var(--card-radius);
        background-image: var(--user-card-bg);
        color: #fff;
        background-repeat: no-repeat;
        background-size: cover;
        box-shadow: 0 6px 24px 0 rgba(11, 8, 108, 0.13);

        .user-info {
          margin-bottom: 38px !important;

          .banlance-num {
            display: flex;
            align-items: center;
            font-size: 24px;
            font-family: Microsoft YaHei UI;
            font-weight: 700;
            margin-bottom: 5px;

            .reload {
              margin-left: 6px !important;
              color: #fff !important;
            }
          }

          .balance-text {
            font-size: 14px;
          }
        }

        .user-footer {
          display: flex;

          .footer-btn {
            min-width: 45%;
            max-width: 45%;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            border-radius: var(--card-radius);
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }

          .footer-btn-left {
            background: var(--btn-left);
            color: var(--btn-left-color);
          }

          .footer-btn-right {
            background: var(--btn-right);
            color: var(--btn-right-color);
          }
        }
      }

      .menu-list {
        padding: 20px 0;

        .uni-collapse {
          background-color: transparent;

          .as-nav-item {
            margin-bottom: 30px;
          }

          &::v-deep .uni-collapse-item__wrap {
            background-color: transparent;
          }

          /* &::v-deep .uni-collapse-item__wrap{ */
          /*   height: auto !important; */
          /* } */
        }

        .item-content {
          display: flex;

          .img-ico {
            margin-right: 12px;
            width: 18px;
            height: 18px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .img0 {
            background-image: var(--side-menu0-img);
          }

          .img1 {
            background-image: var(--side-menu1-img);
          }

          .img2 {
            background-image: var(--side-menu2-img);
          }

          .img3 {
            background-image: var(--side-menu3-img);
          }

          .img4 {
            background-image: var(--side-menu4-img);
          }

          .img5 {
            background-image: var(--side-menu5-img);
          }

          .img6 {
            background-image: var(--side-menu6-img);
          }

          .img7 {
            background-image: var(--side-menu7-img);
          }

          .img8 {
            background-image: var(--side-menu8-img);
          }
        }

        .sub-content {
          height: auto;
          margin-top: 10px;
          padding: 0 30px;

          .sub-item {
            line-height: 14px;
            color: var(--navbar-color);
            opacity: 0.7;
            padding: 10px 0;
          }
        }
      }

      .easy-select {
        background: var(--btn-gray-color) !important;
      }

      .down-text {
        margin-top: 30px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        color: var(--blue-color);
      }

      .logout-btn {
        height: 35px;
        line-height: 35px;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        border-radius: var(--card-radius);
        background: var(--btn-gray-color) !important;
        color: var(--body-color);
      }
    }
  }

  @media (min-width: 750px) {
    .u-drawer {
      width: 468px !important;
      margin: 0 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }
}

@media (min-width: 750px) {
  .nav-side {
    width: 930rpx !important;
    margin: 0 auto !important;
    left: auto;
    right: auto;
  }
}
</style>
