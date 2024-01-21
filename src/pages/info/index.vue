<template>
  <view class="content info">
    <nav-aside></nav-aside>
    <view class="topBar"></view>
    <view class="info-main">
      <view class="info-title">
        <text class="title-text">{{ $t("info.title") }}</text>
        <uni-icons type="close" size="40" @click="$Router.back()"></uni-icons>
      </view>
      <Login></Login>
      <Withdrawal></Withdrawal>
      <Real></Real>
      <emil></emil>
      <Log></Log>
    </view>
  </view>
</template>
<script>
import Login from "./components/login.vue";
import Withdrawal from "./components/withdrawal.vue";
import Real from "./components/real.vue";
import Log from "./components/log.vue";
import Emil from "./components/emil.vue";
export default {
  name: "info",
  components: { Login, Withdrawal, Real, Log, Emil },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
  onLoad() {},
};
</script>
<style scoped lang="scss">
.info {
  .topBar {
    height: 60px;
  }
  .info-main {
    padding: 14px;
    .info-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      .title-text {
        font-size: 15px;
        font-weight: 700;
      }
      .uni-icons {
        color: var(--close-color) !important;
      }
    }
  }

  &::v-deep .info-content {
    margin-bottom: 10px;
    border-radius: var(--card-radius);
    overflow: hidden;
    background: var(--calendar-content-bg);
    box-shadow: 0 0 13px rgba(0, 0, 0, 0.081);
    color: var(--navbar-color);
    .info-card {
      .card-title {
        padding: 0 15px;
        display: flex;
        align-items: center;
        height: 50px;
        background: var(--calendar-content-bg);
        box-shadow: var(--shadow-bg);
        color: var(--navbar-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .uni-collapse-item__title {
        border-bottom: none;
      }

      .uni-collapse-item__wrap {
        background-color: var(--pu-cell-bg) !important;
        .uni-collapse-item__wrap-content {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
