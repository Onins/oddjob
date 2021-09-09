<template>
  <view>
    <view
      v-if="isLoading"
      :style="{ flex: 1, justifyContent: 'center', height: '100%' }"
    >
      <activity-indicator size="large" color="#0000ff" />
    </view>
    <scroll-view v-if="!isLoading">
      <text>Details Jobs</text>
      <text>Title: {{ selectedJob.title }}</text>
      <text>Description: {{ selectedJob.description }}</text>
      <text>Image: {{ selectedJob.image }}</text>
      <image
        :style="{ width: 50, height: 50 }"
        :source="{ uri: 'http://192.168.0.20:3000/' + selectedJob.image }"
      />
      <text>Requirements: {{ selectedJob.requirements }}</text>
      <text>Stippend: {{ selectedJob.stippend }}</text>

      <text>Created By: {{ selectedJob.author.name }}</text>
      <text>Created By: {{ selectedJob.author.email }}</text>

      <text>Assigned To: {{ selectedJob.assigned.name }}</text>
      <text>Assigned To: {{ selectedJob.assigned.email }}</text>
    </scroll-view>
  </view>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isLoading: true,
      selectedJob: null,
    };
  },
  computed: {
    ...mapGetters(["getSelectedJob"]),
  },
  watch: {
    getSelectedJob() {
      this.isLoading = false;
      this.selectedJob = this.getSelectedJob.list;
    },
  },
  props: {
    navigation: {
      type: Object,
    },
  },
};
</script>