<template>
  <view>
    <view
      v-if="isLoading"
      :style="{ flex: 1, justifyContent: 'center', height: '100%' }"
    >
      <activity-indicator size="large" color="#0000ff" />
    </view>
    <view v-if="!isLoading">
      <text>Details Jobs</text>
      <text>{{ getSelectedJob }}</text>
    </view>
  </view>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(["getSelectedJob"]),
  },
  watch: {
    getSelectedJob() {
      this.isLoading = false;
    },
  },
  props: {
    navigation: {
      type: Object,
    },
  },
};
</script>