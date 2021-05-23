import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    //새로고침시 토큰으로 멤버정보 받기
    this.$store.dispatch("getMemberInfo");
  },
  render: (h) => h(App),
}).$mount("#app");
