<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from "vue-native-router";

import JobsApplied from "./src/screens/JobsApplied";
import JobsListed from "./src/screens/JobsListed";
import JobsDetails from "./src/screens/JobsDetails";
import LoginRegistration from "./src/screens/LoginRegistration.vue";
import "./src/store";

import { mapGetters } from "vuex";

const IOSTabs = createBottomTabNavigator({
  Home: JobsListed,
  Applied: JobsApplied,
  User: LoginRegistration,
});

const AndroidTabs = createMaterialTopTabNavigator({
  Home: JobsListed,
  Applied: JobsApplied,
  User: LoginRegistration,
});

const StackNavigator = createStackNavigator({
  AndroidTabs,
  IOSTabs,
  Details: JobsDetails,
});

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: {
    AppNavigator,
  },
  computed: {
    ...mapGetters(["getUserData"]),
  },
  methods: {
    fetchAllJobs() {
      this.$store.dispatch("fetchAllJobs");
    },

    async checkLoggedIn() {
      await this.$store.dispatch("userStoredLogin");

      if (this.getUserData) {
        if (this.getUserData.token) {
          await this.$store.dispatch("userDetails", {
            id: this.getUserData.id,
          });

          this.fetchUserAppliedJobs();
        }
      }
    },

    async fetchUserAppliedJobs() {
      if (this.getUserData) {
        await this.$store.dispatch("userAppliedJob", {
          token: this.getUserData.token,
          id: this.getUserData.id,
        });
      }
    },
  },
  mounted() {
    this.fetchAllJobs();
    this.checkLoggedIn();
  },
};
</script>


<style>
.header {
  font-size: 30px;
}
</style>