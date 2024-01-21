<template>
  <view class="loading">
    <view class="loading-img"></view>
    <view class="loading-text"></view>
  </view>
</template>
<script>

export default {
  name: 'loading',
  components: {},
  props: {},
  data() {
    return {};
  },
  created: () => {},
  computed: {},
  methods: {
  },
  watch: {},
  onLoad() {},
};
</script>
<style scoped lang="scss">
.loading {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.8);
  .loading-img {
    height: 50px;
    width: 50px;
    background: url('/static/images/app_qiu.png');
    background-size: cover;
    animation: load 0.6s infinite linear;
  }
  .loading-text {
    margin-top: 12px;
    height: 16px;
    width: 88px;
    background: url('/static/images/dark/web_name_twp.png');
    background-size: cover;
  }
}
@keyframes load {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (min-width: 750px) {
  .loading {
    width: 930rpx !important;
    margin: 0 auto !important;
  }
}

</style>
