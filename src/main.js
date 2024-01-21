import Vue from "vue";
import App from "./App";
import store from "./store";
import i18n from "./locale/index";
import VueClipboard from "vue-clipboard2";
import mixins from "./mixin";
import { router, RouterMount } from "@/router"; //路径换成自己的
import "@/static/css/dark.theme.scss";
import "@/static/css/light.theme.scss";
import "@/static/css/iconfont.css";
import api from "@/common/api";
import LeeVue from "leevueplugin";

Vue.use(router);
Vue.use(VueClipboard);
Vue.use(LeeVue);
Vue.mixin(mixins);

Vue.prototype.$api = api;

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  i18n,
  store,
  ...App,
});

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, "#app");
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
