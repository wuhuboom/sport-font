<script>
export default {
  created() {},
  onLaunch: function () {
    if (!this.vuex_token) {
      if (!["login", "register"].includes(this.$Route.name)) {
        this.$Router.push("/login");
      }
    } else {
      if (["login", "register"].includes(this.$Route.name)) {
        this.$Router.push("/");
      }
    }

    this.$api.getAppUrl().then((res) => {
      let appurl = {};
      if (res.data !== null || res.data !== "") {
        res.data.map((item) => {
          if (item.appType == 0) {
            appurl.android = item.appUrl;
            appurl.androidId = item.id;
          } else if (item.appType == 1) {
            appurl.ios = item.appUrl;
            appurl.iosId = item.id;
          }
        });
        this.$updateStore("vuex_appurl", appurl);
      }
    });
  },
  onShow: function () {},
};
</script>

<style lang="scss">
@font-face {
  font-family: "Century Gothic Bold";
  src: url("~@/static/font/0d78b12d6be09203d1fbeb76871a369a.ttf")
    format("truetype");
}
@font-face {
  font-family: "Century Gothic";
  src: url("~@/static/font/01e8330e6c5286d478a288d0e675d3bc.ttf")
    format("truetype");
}
@font-face {
  font-family: "Arial";
  src: url("~@/static/font/8d223b3ad8d4819e9dcf22757e4cc2c4.ttf")
    format("truetype");
}
/*每个页面公共css */
.content {
  background-color: $s-bg-color;
  color: $s-body-color;
  height: 100%;
  min-height: 100vh;

  &::v-deep .uni-clendar-item-before-checked {
    background-color: var("--calendar-active=bg") !important;
  }

  &::v-deep .uni-calendar__weeks-item {
    color: red;
  }

  &::v-deep .uni-table .uni-table-tr:nth-child(n + 2):hover {
    background: var(--table-top-color) !important;
  }
}

.custom-btn {
  color: #fff !important;
  background: linear-gradient($s-btn-submit-bg-1, $s-btn-submit-bg-2);
  box-shadow: $s-btn-submit-shadow !important;
  border-radius: $s-card-radius;
}

@media (min-width: 750px) {
  .content {
    width: 930rpx !important;
    margin: 0 auto !important;
  }
}

.uni-modal {
  z-index: 99999999 !important;
}
</style>
