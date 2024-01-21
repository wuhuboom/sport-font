<template>
  <view class="content team">
    <nav-aside></nav-aside>
    <view class="header"> </view>
    <view class="team-main">
      <view class="team-title">
        <text class="title-text">{{ $t("team.title") }}</text>
        <uni-icons type="close" size="40" @click="$Router.back()"></uni-icons>
      </view>
      <!-- <view class="select-box">
        <uni-data-select
          v-model="selectTime"
          :clear="false"
          :localdata="timeOptions"
          @change="changeTime"
        ></uni-data-select>
      </view> -->
    </view>
    <no-data v-if="!nodatas"></no-data>
    <view v-else class="tables">
      <view class="table-head">
        <view class="acc">{{ $t("team.account") }}</view>
        <view class="bet">{{ $t("team.bet") }}</view>
        <view class="balance">{{ $t("team.balnace") }}</view>
      </view>
      <view class="table-body" v-for="(item, index) in result" :key="index">
        <view class="acc">{{ item.playerName }}</view>
        <view class="bet">{{ item.aimCount }}</view>
        <view class="balance">{{ item.balance }}</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "team",
  components: {},
  props: {},
  data() {
    return {
      selectTime: 5,
      timeOptions: [
        {
          text: this.$t("order.time.today"),
          value: 1,
        },
        {
          text: this.$t("order.time.yesterday"),
          value: 2,
        },
        {
          text: this.$t("order.time.week"),
          value: 3,
        },
        {
          text: this.$t("order.time.ten"),
          value: 4,
        },
        {
          text: this.$t("order.time.month"),
          value: 5,
        },
      ],
      totalPage: 1,
      result: [],
      nodatas: false,
      param: {
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  computed: {},
  methods: {
    changeTime(value) {
      this.getServerData({ time: value });
    },
    getUnaimData() {
      this.$api.groupUnaim(this.param).then((res) => {
        this.totalPage = res.data.totalPage;
        if (this.param.pageNo == 1) {
          this.result = res.data.results;
        } else {
          this.result = this.result.concat(res.data.results);
        }

        this.nodatas = this.result.length != 0 ? true : false;
      });
    },
  },
  watch: {},
  onLoad() {
    this.getUnaimData();
  },
  onReachBottom() {
    if (this.totalPage <= this.param.pageNo) {
      return false;
    }
    this.param.pageNo += 1;
    this.getUnaimData();
  },
};
</script>
<style scoped lang="scss">
.team {
  .header {
    height: 50px;
  }
  .team-main {
    padding: 14px;
    .team-title {
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
    .select-box {
      &::v-deep .uni-select {
        background-color: var(--form-main-uni-easyinput__content);
        border: var(--easyinput__border) !important;
        box-shadow: var(--shadow-bg);

        .uni-select__input-text {
          color: var(--easyinput__color) !important;
        }

        .uni-select__selector {
          background-color: var(--uni-select__selector-bg);
          border: var(--uni-select__solid);
          border-radius: var(--card-radius);

          .uni-popper__arrow {
            display: none;
          }

          &::v-deep .uni-select__selector-empty {
            .uni-select__selector-item:hover {
              background: var(--uni-select__selector-item-active);
            }
          }
        }
      }
    }
  }
  .tables {
    width: 90%;
    margin: auto;
    .table-head {
      border-radius: 8px;
      padding: 10px 0;
      background: rgb(230, 97, 43);
      display: flex;
      text-align: center;
      .acc {
        width: 40%;
      }
      .bet {
        width: 30%;
      }
      .balance {
        width: 30%;
      }
    }
    .table-body {
      margin: 10px 0;
      border-radius: 8px;
      padding: 10px 0;
      background: var(--mar-bg);
      display: flex;
      text-align: center;
      .acc {
        width: 40%;
      }
      .bet {
        width: 30%;
      }
      .balance {
        width: 30%;
      }
    }
  }
}
</style>
