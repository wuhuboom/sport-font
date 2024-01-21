<template>
  <view class="log">
    <uni-collapse class="info-content">
      <uni-collapse-item class="info-card">
        <template #title>
          <view class="card-title">
            <text class="title-left">Login log</text>
          </view>
        </template>
        <view class="card-content">
          <view class="log-card">
            <text class="system">ios</text>
            <view class="useragent">
              Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)
              AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3
              Mobile/15E148 Safari/604.1
            </view>
            <text class="time">10:51 27/02/2023</text>
          </view>
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>
<script>
export default {
  name: 'log',
  components: {},
  props: {},
  data() {
    return {
      realname: '',
    };
  },
  computed: {},
  methods: {
    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          console.log('表单数据信息：', res);
        })
        .catch((err) => {
          console.log('表单错误信息：', err);
        });
    },
  },
  watch: {},
  onLoad() {},
};
</script>
<style scoped lang="scss">
.info-content {
  .card-title {
    .title-right {
      color: #f53;
    }
  }
  .card-content {
    padding: 15px;
    .log-card {
      color: var(--navbar-color);
      display: flex;
      flex-direction: column;
      background-color: var(--form-main-uni-easyinput__content);
      border-radius: 8px;
      padding: 10px 15px;
      .system {
        font-size: 16px;
        font-weight: 700;
      }
      .useragent {
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
        text-overflow: ellipsis;
        margin-top: 4px;
      }
      .time {
        margin-top: 4px;
      }
    }
  }
  .card-btn {
    height: 40px;
    line-height: 40px;
    background-color: var(--btn-gray-color);
    font-weight: 700;
    color: #999;
  }
}
</style>
