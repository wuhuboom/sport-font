// request.js
// 通常可以吧 baseUrl 单独放在一个 js 文件了
import store from "@/store";
import i18n from "@/locale/index";
//const baseUrl = process.env.VUE_APP_BASE_URL;
const baseUrl = config.baseUrl;
const request = (options = {}) => {
  // 在这里可以对请求头进行一些设置
  // 例如：
  // 请求参数
  let url = baseUrl + options.url || "",
    method = options.method || "GET",
    header = options.header || {},
    data = options.data || {},
    noAuth = options.noAuth || false,
    noLoading = options.noLoading || false;

  //请求方式:GET或POST(POST需配置
  // header: {'content-type' : "application/x-www-form-urlencoded"},)
  if (method) {
    method = method.toUpperCase(); //小写改为大写
    if (method == "POST") {
      header["content-type"] = "application/x-www-form-urlencoded";
    } else {
      header["content-type"] = "application/json";
    }
  }

  if (!noAuth) {
    header.token = store.state.vuex_token || "";
  }

  if (!noLoading) {
    uni.showLoading();
  }

  // options.header = {
  //      "Content-Type": "application/x-www-form-urlencoded"
  // }
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      header,
      data,
      dataType: "json",
      success: (res) => {
        if (res.data.code && res.data.code != 200) {
          switch (res.data.code) {
            case 401:
              uni.showToast({
                title: i18n.tc("noAuth"),
                icon: "none",
                mask: true,
                success: () => {
                  store.commit("toast.updateStore", {
                    name: "vuex_token",
                    value: "",
                  });
                  uni.redirectTo({
                    url: "/login",
                  });
                },
              });
              break;
            case 402:
              uni.showToast({
                title: i18n.tc("toast.noLogin"),
                icon: "none",
                mask: true,
                success: () => {
                  store.commit("updateStore", {
                    name: "vuex_token",
                    value: "",
                  });
                  uni.redirectTo({
                    url: "/login",
                  });
                },
              });
              break;
            case 403:
              uni.showToast({
                title: i18n.tc("toast.disableAcc"),
                icon: "none",
                mask: true,
                success: () => {
                  store.commit("updateStore", {
                    name: "vuex_token",
                    value: "",
                  });
                  uni.redirectTo({
                    url: "/login",
                  });
                },
              });
              break;
            case 409:
              uni.showToast({
                title: i18n.tc("toast.fast"),
                icon: "none",
                mask: true,
              });
              break;
            case 410:
              uni.showToast({
                title: i18n.tc("toast.area"),
                icon: "none",
                mask: true,
                success: () => {
                  store.commit("toast.updateStore", {
                    name: "vuex_token",
                    value: "",
                  });
                  uni.redirectTo({
                    url: "/login",
                  });
                },
              });
              break;
            case 500:
              uni.showToast({
                title: i18n.tc("toast.error"),
                icon: "none",
                mask: true,
              });
              break;
            case 103:
              if (res.data.data) {
                uni.showToast({
                  title: i18n.tc(
                    "toast.verification." + res.data.data[0].msgKey
                  ),
                  icon: "none",
                  mask: true,
                });
              } else {
                uni.showToast({
                  title: i18n.tc("toast.verification"),
                  icon: "none",
                  mask: true,
                });
              }
              break;
            case 105:
              if (res.data.data) {
                uni.showToast({
                  title: i18n.tc(
                    "toast.verification." + res.data.data[0].msgKey
                  ),
                  icon: "none",
                  mask: true,
                });
              } else {
                uni.showToast({
                  title: i18n.tc("toast.verification"),
                  icon: "none",
                  mask: true,
                });
              }
              break;
            case 107:
              uni.showToast({
                title: i18n.tc("toast.maintenance"),
                icon: "none",
                mask: true,
              });
              break;
          }
          reject(res.data);
        } else {
          resolve(res.data);
        }
      },
      fail: (e) => {
        uni.showToast({
          title: "" + e.errMsg,
          icon: "none",
        });
        reject(e);
      },
      complete: () => {
        if (!noLoading) {
          uni.hideLoading();
        }
        resolve();
      },
    });
  });
};

const get = (url, data, options = {}) => {
  options.method = "GET";
  options.data = data;
  options.url = url;
  return request(options);
};

const post = (url, data, options = {}) => {
  options.method = "POST";
  options.data = data;
  options.url = url;
  return request(options);
};

export default {
  request,
  get,
  post,
};
