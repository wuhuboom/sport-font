import { mapState } from "vuex";
import store from "@/store";
import i18n from "@/locale";

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let storeKey = [];

try {
  storeKey = store.state ? Object.keys(store.state) : [];
} catch (e) {}

module.exports = {
  watch: {},
  computed: {
    // 将vuex的state中的所有变量，解构到全局混入的mixin中
    ...mapState(storeKey),
  },
  created() {
    this.$updateStore = (name, value) => {
      this.$store.commit("updateStore", {
        name,
        value,
      });
    };
    this.changeTheme(store.state.vuex_theme);
  },
  async onShow() {
    store.commit("updateStore", {
      name: "vuex_loading",
      value: false,
    });

    const routeList = ["home", "marketList", "partners", "order", "strongbox"];
    const routeIndex = routeList.indexOf(this.$Route.name);

    if (routeIndex !== -1) {
      const datads = await this.$api.safeConf();
      const userData = await this.$api.getInfo();
      store.commit("updateStore", {
        name: "vuex_user",
        value: userData.data,
      });
      const inshow = datads.data.showH5 == "1" ? true : false;
      console.log(datads.data.showH5);
      const newTabList = this.tabbarList.map((element, eleIndex) => {
        element.active = false;
        if (eleIndex === routeIndex) {
          if (element.name == "home") {
            element.name = this.$t("tabber.home");
          }
          if (element.name == "marketList") {
            element.name = this.$t("tabber.marketList");
          }
          if (element.name == "Partners") {
            element.name = this.$t("tabber.partners");
          }
          if (element.name == "Safe") {
            element.name = this.$t("tabber.safe");
          }
          if (element.name == "Order") {
            element.name = this.$t("tabber.order");
          }
          element.active = true;
        }
        return element;
      });

      const tba = newTabList.filter(function (item) {
        if (!inshow) {
          return item.path != "/strongbox";
        } else {
          return item;
        }
      });

      store.commit("updateStore", {
        name: "tabbarList",
        value: tba,
      });
    }
    this.changeTheme(this.vuex_theme);
    this.changeLang(this.vuex_lang);
    if (this.vuex_token) {
      if (this.vuex_isPayPwd === 2) {
        if ("payPwdSet" !== this.$Route.name) {
          this.$Router.push("/payPwdSet");
        }
      }
    }
  },
  onReady() {},
  onHide() {
    this.$store.commit("updateStore", {
      name: "vuex_loading",
      value: true,
    });
  },
  methods: {
    changeTheme(newTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
      store.commit("updateStore", {
        name: "vuex_theme",
        value: newTheme,
      });
    },
    changeLang(newLang) {
      i18n.locale = newLang;
      store.commit("updateStore", {
        name: "vuex_lang",
        value: newLang,
      });
    },
  },
};
