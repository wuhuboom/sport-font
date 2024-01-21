<template>
  <view class="content order">
    <nav-aside></nav-aside>
    <view class="topbar"></view>
    <view class="header">
      <button
        class="btn"
        :class="activeBtn === 0 ? 'active' : ''"
        @click="toggleBtn(0)"
      >
        {{ $t("order.wave.title") }}
      </button>
      <button
        class="btn"
        :class="activeBtn === 1 ? 'active' : ''"
        @click="toggleBtn(1)"
      >
        {{ $t("order.sport.title") }}
      </button>
      <button
        class="btn"
        :class="activeBtn === 2 ? 'active' : ''"
        @click="toggleBtn(2)"
      >
        {{ $t("order.game.title") }}
      </button>
    </view>
    <wave ref="subItem" v-if="activeBtn === 0"></wave>
    <sport v-if="activeBtn === 1"></sport>
    <game v-if="activeBtn === 2"></game>
    <view class="bottom-bar"></view>
    <u-tabbar></u-tabbar>
  </view>
</template>
<script>
import wave from "./components/wave.vue";
import sport from "./components/sport.vue";
import game from "./components/game.vue";
export default {
  name: "order",
  components: { wave, sport, game },
  props: {},
  data() {
    return {
      activeBtn: 2,
    };
  },
  computed: {},
  methods: {
    toggleBtn(index) {
      this.activeBtn = index;
    },
  },
  onReachBottom() {
    if (this.activeBtn === 0) {
      this.$refs.subItem.scrollBottom();
    }
  },
  watch: {},
  onLoad() {},
};
</script>
<style scoped lang="scss">
.order {
  .topbar {
    height: 60px;
  }
  .header {
    padding: 12px;
    background: var(--mar-bg);
    .btn {
      height: 36px;
      margin-right: 10px;
      white-space: nowrap;
      padding: 0 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      border-radius: var(--card-radius);
      color: var(--body-color);
      padding: 0 10px;
      min-width: 25%;
      background-color: var(--tab-item-bg);
      &:after {
        border: none !important;
      }
    }
    .active {
      height: 42px;
      font-weight: 700;
      color: #fff;
      background: var(--ac-rec-row-active-bg);
    }
  }

  .bottom-bar {
    height: 30px;
  }
}
</style>
