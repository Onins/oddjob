<template>
  <view class="screen">
    <view
      class="loader"
      v-if="isLoading"
      :style="{ flex: 1, justifyContent: 'center', height: '100%' }"
    >
      <activity-indicator size="large" color="#0000ff" />
    </view>
    <text class="header">Job Details</text>
    <scroll-view v-if="!isLoading">
      <view class="image-wrapper">
        <image
          class="image"
          :style="{ width: 100, height: 80 }"
          :source="{
            uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
          }"
        />
      </view>
      <view class="container">
        <text class="label">Title:</text>
        <text class="data">{{ selectedJob.title }}</text>
        <text class="label">Description:</text>
        <text class="data">{{ selectedJob.description }}</text>

        <text class="label">Requirements:</text>
        <text class="data">{{ selectedJob.requirements }}</text>

        <text class="label">Stipend:</text>
        <text class="data">{{ selectedJob.stipend }}</text>

        <text class="label">Created By:</text>
        <text class="data-nomargin">{{ selectedJob.author.name }}</text>
        <text class="data">{{ selectedJob.author.email }}</text>
      </view>
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

<style>
.screen {
  height: 100%;
}

.loader {
  margin-top: 30%;
  position: absolute;
  left: 45%;
}

.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.header {
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
  color: #333;
}
.container {
  margin: 20px;
  padding: 20px;
}

.label {
  font-size: 12px;
  font-style: italic;
  font-weight: bold;
}

.data {
  margin-bottom: 16px;
  font-size: 18px;
}

.data-nomargin {
  font-size: 18px;
}
</style>