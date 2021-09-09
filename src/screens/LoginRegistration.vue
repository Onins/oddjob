<template>
  <view>
    <text>Login Page</text>

    <template>
      <text>Username:</text>
      <text-input
        :style="{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }"
        v-model="user"
      />
      <text>Password:</text>
      <text-input
        :style="{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }"
        v-model="pass"
      />

      <button
        :on-press="authenticateUser"
        title="Login"
        color="#841584"
        accessibility-label="User Login"
      />
    </template>

    <template>
      <text>Welcome {{ userName }} </text>
      <text>Name: {{ userName }} </text>
      <text>Email: {{ userEmail }} </text>

      <button
        :on-press="logoutUser"
        title="Logout"
        color="#841584"
        accessibility-label="User Logout"
      />
    </template>
  </view>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      user: "",
      pass: "",
      userName: "",
      userEmail: "",
    };
  },
  computed: {
    ...mapGetters(["getUserIsLoggedIn", "getUserDetails"]),
  },
  watch: {
    getUserIsLoggedIn() {},
  },
  methods: {
    authenticateUser() {
      // if (this.user != "" && this.pass != "") {
      // this.$store.dispatch("userLogin", {
      //   user: this.user,
      //   pass: this.pass,
      // });
      this.$store.dispatch("userLogin");
      // }
    },

    logoutUser() {
      this.$store.dispatch("userLogout");
      console.log("logout");
    },
  },
};
</script>
