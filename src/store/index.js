import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null, //로그인 된 유저 정보 저장
    allUsers: [
      {
        id: 1,
        name: "ara",
        email: "test@gmail.com",
        password: "1111",
      },
      {
        id: 2,
        name: "ara2",
        email: "test2@gmail.com",
        password: "2222",
      },
    ],
    isLogin: false,
    isLoginError: false,
  },
  mutations: {
    //로그인이 성공했을 때
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.isLoginError = false;
      state.userInfo = payload;
    },

    //로그인이 실패했을 때
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },

    //로그아웃
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    },
  },
  actions: {
    //로그인 시도
    login({ dispatch }, loginObj) {
      //1. 실제 로그인 -> 토큰 반환
      axios
        .post("https://reqres.in/api/login", loginObj) //파라메터(body)
        .then((res) => {
          //성공 시 token: 블라블라(실제로는 user_id값을 받는다)
          //토큰을 헤더에 포함시켜서 유저 정보를 요청

          let token = res.data.token;
          //토큰을 로컬스토리지에 저장
          localStorage.setItem("access_token", token);
          dispatch("getMemberInfo");
        })
        .catch(() => {
          alert("이메일과 비밀번호를 확인하세요.");
        });
    },

    logout({ commit }) {
      commit("logout");
      router.push({
        name: "home",
      }); //로그아웃시 홈으로 이동
    },

    getMemberInfo({ commit }) {
      //로컬스토리지에 있는 토큰을 불러온다
      let token = localStorage.getItem("access_token");
      let config = {
        headers: {
          "access-token": token,
        },
      };

      //2. 토큰 -> 멤버 정보를 반환
      //! 새로고침 -> 토큰만 가지고 멤버정보를 요청
      axios
        .get("https://reqres.in/api/user/2", config) //config를 헤더에 보낸다
        .then((response) => {
          let userInfo = {
            color: response.data.data.color,
            id: response.data.data.id,
            name: response.data.data.name,
            pantone_value: response.data.data.pantone_value,
            year: response.data.data.year,
          };
          commit("loginSuccess", userInfo);
          //commit('loginSuccess', response.data.data)
          // => userInfo의 모든 정보를 보낼때 위와 같이 써도 되지만, 명세를 해주면 다른 개발자들과 협업을 할 때 더 보기 좋기 때문에 전자와 같이 하는게 좋다.
        })
        .catch(() => {
          alert("이메일과 비밀번호를 확인하세요.");
        });
    },
  },
  modules: {},
});
