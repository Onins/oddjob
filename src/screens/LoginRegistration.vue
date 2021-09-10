<template>
  <view class="screen">
    <text class="header">User Page</text>

    <view v-if="getUserIsLoggedIn == false" class="container">
      <view v-if="isLoginForm" class="user-login">
        <text class="label">Email:</text>
        <text-input class="input" v-model="email" />
        <text class="label">Password:</text>
        <text-input class="input" v-model="pass" />
        <view class="button-wrapper">
          <view class="button">
            <button
              :on-press="authenticateUser"
              title="Login"
              accessibility-label="User Login"
            />
          </view>
          <view class="button">
            <button
              @press="userSwitchForm('toRegister')"
              title="Sign Up"
              accessibility-label="Switch to Register"
            />
          </view>
        </view>
      </view>
      <view v-if="isLoginForm == false" class="user-register">
        <text class="label">Email:</text>
        <text-input class="input" v-model="rEmail" />
        <text class="label">Password:</text>
        <text-input class="input" v-model="rPass" />
        <text class="label">Confirm Password:</text>
        <text-input class="input" v-model="rCPass" />
        <text class="label">Name:</text>
        <text-input class="input" v-model="rName" />
        <view class="button-wrapper">
          <view class="button">
            <button
              @press="registerUser()"
              title="Submit"
              accessibility-label="User Register"
          /></view>
          <view>
            <button
              @press="userSwitchForm('toLogin')"
              title="Sign In!"
              accessibility-label="Switch to login"
            />
          </view>
        </view>
      </view>
    </view>

    <view v-if="getUserIsLoggedIn == true" class="user-profile">
      <text class="welcome">Welcome {{ userName }} </text>
      <text class="text-data">Name: {{ userName }} </text>
      <text class="text-data">Email: {{ userEmail }} </text>

      <button
        :on-press="logoutUser"
        title="Logout"
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
.container {
  margin: 20px;
  padding: 20px;
}

.user-profile {
  margin: 20px;
  padding: 20px;
}

.label {
  color: #fff;
}

.input {
  background-color: white;
  width: 100%;
  margin-bottom: 20px;
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.button {
  margin-right: 10px;
  padding: 0 20px;
  width: 100px;
}

.welcome {
  font-size: 30px;
  color: #fff;
  margin-bottom: 20px;
}

.text-data {
  font-size: 16px;
  color: #fff;
  margin-bottom: 10px;
}
</style>