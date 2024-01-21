<template>
  <view class="u-tabbar">
    <view
      class="tabbar-item"
      v-for="(tabbar, index) in tabbarList"
      :key="index"
      @click="toggleBar(index)"
    >
      <view v-if="tabbar.active" class="active">
        {{ tabbar.name }}
      </view>
      <view class="tab-icon" v-else>
        <uni-icons
          custom-prefix="iconfont"
          :type="tabbar.iconName"
          size="30"
        ></uni-icons>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "u-tabbar",
  components: {},
  props: {},
  data() {
    return {
      storePath: "",
    };
  },
  methods: {
    toggleBar(index) {
      let path = "";
      const newTabList = this.tabbarList.map((element, eleIndex) => {
        element.active = false;
        if (eleIndex === index) {
          element.active = true;
          this.storePath = element.path;
          path = element.path;
        }
        return element;
      });

      this.$updateStore("tabbarList", newTabList);
      try {
        this.$Router.push(path);
      } catch {
        this.$Router.push("/");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.u-tabbar {
  background: var(--tabbar-bg) !important;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  box-shadow: 0 0 19px 0 rgba(5, 9, 122, 0.21);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 50px;
  display: flex;
  .tabbar-item {
    width: 25%;
    .active {
      height: 40px;
      position: relative;
      color: var(--foot-tab-icon-active-color);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tab-icon {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .uni-icons {
        color: var(--foot-tab-icon-color) !important;
      }
    }
  }
  .active::after {
    content: "";
    width: 8px;
    height: 8px;
    background: var(--tab-dot-color);
    border-radius: 2px;
    position: absolute;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
}

@media (min-width: 750px) {
  .u-tabbar {
    width: 930rpx !important;
    margin: 0 auto !important;
    left: auto;
    right: auto;
  }
}
</style>
