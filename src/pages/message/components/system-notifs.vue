<template>
  <view class="system-notifs">
    <view
      class="notifs-main fand-card"
      v-for="(item, index) in data"
      :key="index"
    >
      <!-- @click="$Router.push('/messageDetails')" -->
      <view class="list-cate">
        <text class="dot"></text>
        <text class="text">{{ item.title }}</text>
      </view>
      <text class="news-list-head">{{ formatTimes(item.createdAt) }}</text>
      <view class="u-line"></view>
      <!-- <view class="img-view">
        <image class="backgroud-img" :src="backgroudImg" mode="scaleToFill" />
      </view> -->
      <view class="list-desc">{{ item.content }}</view>
      <!-- <button class="bottom-btn" type="default">Click for details</button> -->
    </view>
  </view>
</template>

<script>
import { formatTime } from "@/utils";
export default {
  name: "system-notifs",
  props: {},
  data() {
    return {
      data: [],
      backgroudImg: "/static/images/temporary/message.jpg",
    };
  },
  computed: {},
  methods: {
    initData() {
      this.$api.getNotice().then((res) => {
        this.data = res.data;
      });
    },
    formatTimes(times) {
      return formatTime(times);
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.initData();
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.system-notifs {
  padding: 10px;
  .notifs-main {
    position: relative;
    padding: 15px;
    cursor: pointer;
    border-radius: 12px;
    margin-bottom: 12px;
    .news-list-head {
      align-items: center;
      font-size: 15px;
    }
    .list-cate {
      .dot {
        margin-bottom: 10px;
        display: inline-flex;
        width: 8px;
        height: 8px;
        background: var(--tab-active);
        border-radius: 2px;
        margin-right: 5px;
      }
      .text {
        font-size: 15px;
        font-weight: 700;
        background: var(--font-color);
        -webkit-background-clip: text;
      }
    }
    .u-line {
      margin: 20px 0px;
      border-bottom-width: 1px;
      border-bottom-style: dotted;
      width: 100%;
      transform: scaleY(0.5);
      border-color: var(--text-gray-color);
    }
    .img-view {
      width: 100%;
      height: 208px;
      border-radius: var(--card-radius) !important;
      overflow: visible;
      opacity: 1;
      transition: opacity 0.5s ease-in-out 0s;
      background-color: transparent;
      .backgroud-img {
        width: 100%;
        height: 100%;
        border-radius: var(--card-radius);
      }
    }
    .list-desc {
      line-height: 1.8;
      margin-bottom: 15px !important;
      margin-top: 15px !important;
      font-size: 15px;
    }
    .bottom-btn {
      background: var(--btn-gray-color) !important;
      height: 32px;
      font-size: 14px;
      line-height: 32px;
      border-radius: 4px;
    }
  }
  .fand-card {
    color: var(--body-color);
    border-radius: var(--card-radius);
    background: var(--card-style);
    box-shadow: var(--card-shadow);
    border: var(--fan-card-border);
  }
}
</style>
