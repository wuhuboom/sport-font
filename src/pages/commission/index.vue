<template>
  <view class="content commission">
    <nav-aside></nav-aside>
    <view class="top-nav"></view>
    <view class="team-main">
      <view class="team-title">
        <text class="title-text">{{ $t("commission.sub.title") }}</text>
        <uni-icons type="close" size="35" @click="$Router.back()"></uni-icons>
      </view>
      <view class="team-card">
        <view class="search">
          <uni-search-bar
            class="uni-mt-10 search-bar"
            :placeholder="$t('result.searchMsg')"
            clearButton="none"
            cancelButton="none"
            v-model="param.username"
            @confirm="search"
          />
        </view>
        <uni-data-select
          class=""
          v-model="userLevel"
          :localdata="range"
          :clear="false"
          @change="change"
        ></uni-data-select>
      </view>
      <!-- <view class="team-card">
        <view class="switch-btn">
          <view class="switch-item active" @click="handleClick(0)">{{ $t("commission.sub.title") }}</view>
          <view class="switch-item" @click="handleClick(1)">{{ $t("commission.unaim.title") }}</view>
          <view class="switch-item" @click="handleClick(2)">{{ $t("commission.offline.title") }}</view>
        </view>
        <view class="sub-card">
          <view class="item">
            <uni-icons type="vip-filled" size="20"></uni-icons>
            <text class="big">{{ result.player }}</text>
            <text>{{ $t("commission.sub.title") }}</text>
          </view>
          <view class="item">
            <uni-icons type="vip-filled" size="20"></uni-icons>
            <text class="big">{{ result.unaim }}</text>
            <text>{{ $t("commission.unaim.title") }}</text>
          </view>
          <view class="item">
            <uni-icons type="vip-filled" size="20"></uni-icons>
            <text class="big">{{ result.offline }}</text>
            <text>{{ $t("commission.offline.title") }}</text>
          </view>
        </view>
      </view> -->

      <!-- <Player v-if="currentIndex === 0"></Player>
      <Unaim v-else-if="currentIndex === 1"></Unaim>
      <Offline v-else-if="currentIndex === 2"></Offline> -->
    </view>
    <view class="table-head">
      <view class="name">{{ $t("commission.sub.username") }}</view>
      <view class="login"
        ><text>{{ $t("commission.sub.lastLogin") }}</text>
        <image class="img" src="/static/images/paix.png" @click="sort" />
      </view>
    </view>
    <view class="table-bodys">
      <view class="contents" v-for="(item, index) in userList" :key="index">
        <view class="name">{{ item.username }}</view>
        <view class="time">{{ format(item.theNewLoginTime) }}</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "commission",
  props: {},
  data() {
    return {
      userLevel: 1,
      range: [
        { value: 1, text: this.$t("commission.sub.lv1") },
        { value: 2, text: this.$t("commission.sub.lv2") },
        { value: 3, text: this.$t("commission.sub.lv3") },
      ],
      totalPage: 1,
      param: {
        level: "1",
        username: "",
        sort: "1",
        pageNo: 1,
        pageSize: "10",
      },
      userList: [],
    };
  },
  computed: {},
  methods: {
    handleSelect(option) {
      this.selecValue = option;
    },
    change(e) {
      this.param.level = e;
      this.initData();
    },
    sort() {
      if (this.param.sort == "1") {
        this.param.sort = "2";
      } else {
        this.param.sort = "1";
      }
      this.initData();
    },

    initData() {
      this.$api.subPlayer(this.param).then((res) => {
        if (this.param.pageNo == 1) {
          this.userList = res.data.results;
        } else {
          this.userList = this.userList.concat(res.data.results);
        }
        this.totalPage = res.data.totalPage;
      });
    },
    search() {
      this.param.level = "";
      this.initData();
    },

    format(times) {
      //times是整数，否则要parseInt转换
      var time = new Date(times);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        this.add(h) +
        ":" +
        this.add(mm) +
        ":" +
        this.add(s) +
        " " +
        this.add(d) +
        "/" +
        this.add(m) +
        "/" +
        this.add(y)
      );
    },
    add(m) {
      return m < 10 ? "0" + m : m;
    },

    handleClick(index) {
      const itemList = document.getElementsByClassName("switch-item");
      itemList[this.currentIndex].className = "switch-item";
      itemList[index].classList.add("active");
      this.currentIndex = index;
    },
  },
  watch: {},
  onLoad() {
    this.initData();
  },
  onReachBottom() {
    if (this.totalPage <= this.param.pageNo) {
      return false;
    }
    this.param.pageNo += 1;
    this.initData();
  },
};
</script>
<style scoped lang="scss">
.commission {
  .top-nav {
    height: 45px;
  }
  .team-main {
    padding: 0 10px;
    .team-title {
      padding: 14px;
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
    .team-card {
      margin-top: -15px;
      color: var(--body-color);
      border-radius: var(--card-radius);
      background: var(--card-style);
      box-shadow: var(--card-shadow);
      border: var(--fan-card-border);
      padding: 0 10px 10px 10px;
      .search-bar {
        width: 100%;
        align-items: center;
        padding: 15px 0 0 0;
        &::v-deep .uni-searchbar__box {
          border-radius: 20px !important;
          background-color: var(--form-main-uni-easyinput__content) !important;
          border: 1px solid var(--border-color) !important;
        }
        &::v-deep .uni-input-input {
          color: var(--body-color) !important;
        }
      }
      &::v-deep .uni-select {
        margin-top: 15px;
        font-size: 14px;
        //  background-color: var(--form-main-uni-easyinput__content);
        color: rgb(249, 108, 0);
        border: var(--easyinput__border) !important;
        box-shadow: var(--shadow-bg);
        box-sizing: border-box;
        border-radius: 8px;
        padding-left: 10px;
        position: relative;
        display: flex;
        -webkit-user-select: none;
        user-select: none;
        flex-direction: row;
        align-items: center;
        text-align: center;
      }
      &::v-deep .uni-popper__arrow ::after {
        text-align: center !important;
      }

      &::v-deep .uni-select__selector-item {
        display: flex;
        flex-direction: column;
        text-align: center !important;
        font-size: 14px !important;
      }
      &::v-deep .uni-select__input-text {
        color: rgb(249, 108, 0);
      }
      &::v-deep .uni-select__selector {
        background-color: var(--uni-select__selector-bg) !important;
        border: var(--uni-select__solid) !important;
        border-radius: var(--card-radius) !important;
      }
    }
  }
  .table-head {
    padding: 20px 10px 12px 0px;
    display: flex;
    font-size: 18px;
    justify-content: space-around;
    text-align: center;
    .name {
      width: 50%;
    }
    .login {
      width: 50%;
      display: flex;
      justify-content: center;
      .img {
        margin-left: 5px;
        width: 25px;
        height: 25px;
      }
    }
  }
  .table-bodys {
    padding: 0 10px;
    .contents {
      margin-top: 8px;
      display: flex;
      justify-content: space-around;
      text-align: center;
      color: var(--body-color);
      background: var(--card-style);
      border-radius: 10px;
      line-height: 50px;
      .name {
        width: 50%;
      }
      .time {
        width: 50%;
      }
    }
  }
}
</style>
