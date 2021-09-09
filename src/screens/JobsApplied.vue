<template>
  <view>
    <text>Applied Jobs</text>
    <view v-if="getUserAppliedJobs == []">
      <text>No Jobs Applied</text>
    </view>
    <scroll-view v-for="jobs in getUserAppliedJobs" :key="jobs">
      <view v-for="(item, index) in jobs" :key="index">
        <touchable-opacity @press="viewJobDetails(item._id)">
          <text>{{ item.title }}</text>
          <text>{{ item.description }}</text>
        </touchable-opacity>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    navigation: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["getUserAppliedJobs"]),
  },
  methods: {
    ...mapActions(["fetchSelectedJob"]),

    viewJobDetails(jobId) {
      this.$store.dispatch("fetchSelectedJob", { id: jobId });
      this.navigation.navigate("Details", { isLoading: false });
    },
  },
};
</script>