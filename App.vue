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

import store from "./src/store";

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
  methods: {
    fetchAllJobs() {
      this.$store.dispatch("fetchAllJobs");
    },
    checkLoggedIn() {
      this.$store.dispatch("userStoredLogin");
    },
  },
  mounted() {
    this.fetchAllJobs();
    this.checkLoggedIn();
  },
};
</script>