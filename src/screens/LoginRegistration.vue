<template>
  <view>
    <text>Login Page</text>

    <view v-if="getUserIsLoggedIn == false">
      <view v-if="isLoginForm" class="user-login">
        <text>Email:</text>
        <text-input
          :style="{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }"
          v-model="email"
        />
        <text>Password:</text>
        <text-input
          :style="{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }"
          v-model="pass"
        />

        <button
          :on-press="authenticateUser"
          title="Login"
          color="#841584"
          accessibility-label="User Login"
        />
        <button
          @press="userSwitchForm('toRegister')"
          title="Sign Up"
          color="#841584"
          accessibility-label="Switch to Register"
        />
      </view>
      <view v-if="isLoginForm == false" class="user-register">
        <text>Email:</text>
        <text-input
          :style="{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }"
          v-model="rEmail"
        />
        <text>Password:</text>
        <text-input
          :style="{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }"
          v-model="rPass"
        />
        <text>Confirm Password:</text>
        <text-input
          :style="{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }"
          v-model="rCPass"
        />
        <text>Name:</text>
        <text-input
          :style="{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }"
          v-model="rName"
        />

        <button
          @press="registerUser()"
          title="Submit"
          color="#841584"
          accessibility-label="User Register"
        />
        <button
          @press="userSwitchForm('toLogin')"
          title="Already have an account!"
          color="#841584"
          accessibility-label="Switch to login"
        />
      </view>
    </view>

    <view v-if="getUserIsLoggedIn == true">
      <text>Welcome {{ userName }} </text>
      <text>Name: {{ userName }} </text>
      <text>Email: {{ userEmail }} </text>

      <button
        :on-press="logoutUser"
        title="Logout"
        color="#841584"
        accessibility-label="User Logout"
      />
    </view>
  </view>
</template>


<script>
import { mapGetters } from "vuex";
import { Alert } from "react-native";

export default {
  data() {
    return {
      email: "",
      pass: "",
      userName: "",
      userEmail: "",
      isLoginForm: true,
      rEmail: "",
      rPass: "",
      rCPass: "",
      rName: "",
    };
  },
  computed: {
    ...mapGetters([
      "getUserDetails",
      "getUserIsLoggedIn",
      "getUserData",
      "getUserRequestAlert",
    ]),
  },
  watch: {
    getUserDetails() {
      if (this.getUserDetails) {
        this.userName = this.getUserDetails.data.name;
        this.userEmail = this.getUserDetails.data.email;
        this.isLoggedIn = true;
      } else {
        this.userName = null;
        this.userEmail = null;
        this.isLoggedIn = false;
      }
    },

    getUserRequestAlert() {
      if (this.getUserRequestAlert != "") {
        Alert.alert("Response!", this.getUserRequestAlert);
        this.$store.dispatch("clearAlertMessage");
      }
    },

    getUserData() {
      if (this.getUserIsLoggedIn) {
        this.fetchUserInfo();
      }
    },
  },
  methods: {
    async authenticateUser() {
      if (this.user != "" && this.pass != "") {
        this.$store.dispatch("userLogin", {
          email: this.email,
          pass: this.pass,
        });
      } else {
        Alert.alert("Oops!", "Please input all fields.");
      }
    },

    async fetchUserInfo() {
      if (this.getUserData) {
        console.log("test", this.getUserData);
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

    logoutUser() {
      this.$store.dispatch("userLogout");
    },

    userSwitchForm(data) {
      if (data == "toLogin") {
        this.isLoginForm = true;
      } else {
        this.isLoginForm = false;
      }
    },

    async registerUser() {
      if (this.rUser != "" && this.rPass != "" && this.rCPass != "") {
        if (this.rPass == this.rCPass) {
          await this.$store.dispatch("userSignup", {
            email: this.rEmail,
            pass: this.rPass,
            name: this.rName,
          });
        } else {
          Alert.alert("Oops!", "Password didn't match.");
        }
      } else {
        Alert.alert("Oops!", "Please input all fields.");
      }
    },
  },
};
</script>
