import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

//이미 로그인 된 유저니까 막아야 한다
const rejectAuthUser = (to, from, next) => {
  if (store.state.isLogin === true) {
    alert("이미 로그인 되었습니다.");
    next("/");
  } else {
    next();
  }
};

//아직 로그인 안된 유저니까 막아야 한다
const onlyAuthUser = (to, from, next) => {
  if (store.state.isLogin === false) {
    alert("로그인 해주세요.");
    next("/login");
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: rejectAuthUser, //주소로 들어오기 전에 함수 실행
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    beforeEnter: onlyAuthUser, //주소로 들어오기 전에 함수 실행
    component: () =>
      import(/* webpackChunkName: "mypage" */ "@/views/Mypage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
