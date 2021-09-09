<template>
  <view>
    <text>Applied Jobs</text>
    <text>{{ getUserToken }}</text>
    <!-- <text>{{ getUserID }}</text> -->
  </view>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getUserToken", "getUserID"]),
  },
};
</script>