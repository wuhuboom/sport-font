<template>
  <view class="content games">
    <nav-aside></nav-aside>
    <view class="topbar"></view>
    <view class="main">
      <swiper
        class="swiper"
        circular
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :duration="300"
      >
        <swiper-item>
          <view class="swiper-item uni-bg-red">
            <image src="@/static/images/temporary/game.jpg"></image>
          </view>
        </swiper-item>
      </swiper>

      <scroll-view
        class="scroll-content"
        :scroll-x="true"
        :show-scrollbar="false"
      >
        <view ref="hall" class="scroll-btn active" @click="switchBtn(0)">{{
          $t('game.hall')
        }}</view>
        <view ref="live" class="scroll-btn" @click="switchBtn(1)">{{
          $t('game.live')
        }}</view>
        <view ref="chess" class="scroll-btn" @click="switchBtn(2)">{{
          $t('game.chess')
        }}</view>
        <view ref="sport" class="scroll-btn" @click="switchBtn(3)">{{
          $t('game.sport')
        }}</view>
        <view ref="slots" class="scroll-btn" @click="switchBtn(4)">{{
          $t('game.slots')
        }}</view>
      </scroll-view>
    </view>
    <u-tabbar></u-tabbar>
  </view>
</template>
<script>
export default {
  name: 'games',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    switchBtn(index) {
      this.clearActive();
      document.getElementsByClassName('scroll-btn')[index].className +=
        ' active';
    },
    clearActive() {
      for (let item of document.getElementsByClassName('scroll-btn')) {
        item.className = 'scroll-btn';
      }
    },
  },
  watch: {},
  onLoad() {},
};
</script>
<style scoped lang="scss">
.games {
  .topbar{
    height: 60px;
  }
  .main {
    padding: 10px 14px;

    .swiper {
      &::v-deep .uni-swiper-wrapper {
        border-radius: var(--card-radius);
        .swiper-item {
          width: 100%;
          height: 100%;
          uni-image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .scroll-content {
      margin-top: 10px;
      white-space: nowrap;
      width: 100%;
      &::v-deep .uni-scroll-view::-webkit-scrollbar {
        display: none;
      }
    }
    .scroll-btn {
      display: inline-block;
      border-radius: var(--tab-radius);
      background: var(--tab-item-bg);
      margin-right: 10px;
      color: var(--tab-item-color) !important;
      height: 35px;
      line-height: 35px;
      font-size: 16px;
      transition-duration: 0.5s;
      padding: 3px 26px;
      flex: 1 1 auto;
      width: auto;
    }
    .scroll-btn.active {
      background: var(--tab-active);
      color: #fff !important;
      height: 36px !important;
      line-height: 36px !important;
    }
  }
}
</style>
