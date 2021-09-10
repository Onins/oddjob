<template>
  <view class="screen">
    <text class="header">Applied Jobs</text>
    <scroll-view v-for="jobs in getUserAppliedJobs" :key="jobs">
      <view class="card" v-for="(item, index) in jobs" :key="index">
        <touchable-opacity @press="viewJobDetails(item._id)">
          <view class="card-container">
            <view class="card-col--left">
              <text class="card-title">{{ item.title }}</text>
              <text class="card-desc">{{ item.description }}</text>
              <text
                >Created By:
                <text class="card-auth">{{ item.author.name }}</text></text
              >
              <text
                >Assigned To:
                <text class="card-auth">{{ item.assigned.name }}</text></text
              >
            </view>
            <image
              class="card-col--right"
              :style="{ width: 20, height: 80 }"
              :source="{
                uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
              }"
            />
          </view>
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

<style>
.screen {
  background-color: #474343;
  height: 100%;
}

.header {
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
  color: #fff;
}

.card {
  background-color: #fff;
  margin: 10px 20px;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.card-container {
  display: flex;
  flex-direction: row;
}

.card-col--left {
  flex: 3;
  margin-right: 10px;
}
.card-col--right {
  flex: 1;
}

.card-title {
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: bold;
}

.card-desc {
  font-size: 14px;
  margin-bottom: 20px;
}

.card-auth {
  font-size: 14px;
  font-style: italic;
  color: #868618;
}
</style>