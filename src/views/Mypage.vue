<template>
  <div class="pa-5">{{ userInfo.name }}안녕하세요!</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>

<style lang="scss" scoped></style>
