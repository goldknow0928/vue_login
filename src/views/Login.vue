<template>
  <v-container fill-height style="max-width: 450px" class="pa-5">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-alert :value="isLoginError" type="error"
          >아이디와 비밀번호 확인해주세요.</v-alert
        >
        <v-alert :value="isLogin" type="success"
          >로그인이 완료되었습니다.</v-alert
        >

        <v-card>
          <v-toolbar flat style="background-color: #f5f5f5">
            <v-toolbar-title>로그인</v-toolbar-title>
          </v-toolbar>
          <div class="pa-3">
            <v-text-field v-model="email" label="이메일"></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="패스워드"
            ></v-text-field>

            <v-btn
              color="primary"
              block
              large
              depressed
              @click="login({ email, password })"
              >로그인</v-btn
            >

            <!-- <v-btn @click="getTest">get Test</v-btn>
            <v-btn @click="postTest">post Test</v-btn> -->
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapState(["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(["login"]),

    // getTest() {
    //   axios
    //     .get("https://reqres.in/api/users?page=2")
    //     .then((res) => {
    //       //axios 에서는 꼭 화살표함수를 쓰자. 콜백함수에서 function을 쓰게 되면 this가 뷰 인스턴스를 가르키지 않고 function내부를 가르킨다. axios에서 받아온 data들을 뷰 내부에 할당을 해주려면 뷰를 가르켜야하기 때문이다.

    //       // handle success
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       // handle error
    //       console.log(err);
    //     })
    //     .then(() => {
    //       // always executed
    //       console.log("test");
    //     });
    // },

    // postTest() {
    //   axios
    //     .post("https://reqres.in/api/register", {
    //       email: "eve.holt@reqres.in",
    //       password: "pistol",
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>

<style lang="sass" scoped></style>
