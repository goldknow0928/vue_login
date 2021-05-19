import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

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
  },
  actions: {
    //로그인 시도
    login({ state, commit }, loginObj) {
      //전체 유저에서 해당 이메일로 유저를 찾는다
      let selectedUser = null;
      state.allUsers.forEach((user) => {
        if (user.email === loginObj.email) selectedUser = user;
      });

      //그 유저의 비밀번호와 입력된 비밀번호를 비교한다
      // selectedUser === null || selectedUser.password !== loginObj.password
      // 	? commit("loginError")
      // 	: commit("loginSuccess")

      if (selectedUser === null || selectedUser.password !== loginObj.password)
        commit("loginError");
      else {
        //selectedUser(로그인 한 객체)를 loginSuccess가 commit되는 곳에 payload로 넘긴다.
        commit("loginSuccess", selectedUser);
        router.push({ name: "mypage" });
      }
    },
  },
  modules: {},
});
