<script>
export default {
  created() {
    console.log("Component Created");
  },
  onLaunch: function () {
    if (!this.vuex_token) {
      if (!(['login', 'register'].includes(this.$Route.name))) {
        this.$Router.push('/login')
      }
    } else {
      if (['login', 'register'].includes(this.$Route.name)) {
        this.$Router.push('/')
      }
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  mounted() {
    this.changeTheme(this.vuex_theme);
    this.$updateStore("vuex_loading", true);
  },
};
</script>

<template>
  <view>
    <loading v-if="vuex_loading"></loading>
    <router-view> </router-view>
  </view>
</template>

<style lang="scss">
</style>
