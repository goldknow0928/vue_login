<template>
  <div>
    <h1>axios</h1>
    <v-btn @click="test">get test</v-btn>
    <v-btn @click="postTest">post test</v-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    test() {
      axios
        .get("https://reqres.in/api/users?page=2")
        .then((res) => {
          // handle success
          console.log(res);
        })
        .catch((err) => {
          // handle error
          console.log(err);
        })
        .then(() => {
          // always executed
        });
    },
    postTest() {
      axios
        .post("https://reqres.in/api/register", {
          email: "eve.holt@reqres.in",
          password: "pistol",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="sass" scoped></style>
