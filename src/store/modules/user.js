import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const state = {
  // userUpdate: false,
  userDetails: null,
  userIsLoggedIn: false,
  userData: null,
  userAppliedJobs: null,
  userRequestAlert: null
};

const getters = {
  // getUserUpdate: (state) => { return state.userUpdate },
  getUserIsLoggedIn: (state) => { return state.userIsLoggedIn },
  getUserDetails: (state) => { return state.userDetails },
  getUserData: (state) => { return state.userData },
  getUserAppliedJobs: (state) => { return state.userAppliedJobs },
  getUserRequestAlert: (state) => { return state.userRequestAlert }
}

const mutations = {
  // setUserUpdate(state, items) { state.userUpdate = items },
  setUserIsLoggedIn(state, items) { state.userIsLoggedIn = items },
  setUserDetails(state, items) { state.userDetails = items },
  setUserData(state, items) { state.userData = items },
  setUserAppliedJobs(state, items) { state.userAppliedJobs = items },
  setUserRequestAlert(state, items) { state.userRequestAlert = items}
};

const actions = {
  async userLogin({ commit }, data) {
    let dataset = JSON.stringify({
      "email": data.email,
      "password": data.pass
    });
        
    let config = {
      method: 'post',
      url: 'http://192.168.0.20:3000/user/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : dataset
    };

    setStoredData = async (value) => {
      
      try {
        await AsyncStorage.setItem('@userData', JSON.stringify(value))
      } catch(e) {
        // save error
      }
    }

    getStoredData = async () => {
      let value;
      try {
        value = await AsyncStorage.getItem('@userData')
      } catch(e) {
        // read error
      }
      
      return JSON.parse(value);
    }

    await axios(config)
      .then((response) => {
        if (response.status == "200") {
          let list = response.data;
          let storageData = {
            token: list.token,
            id: list.userId
          }
        
          console.log("wew",storageData)
          setStoredData(storageData);
          
          commit('setUserIsLoggedIn', true);           
        }
        else {
          commit('setUserIsLoggedIn', false)
        }
      
      }).catch(error => 
        commit('setUserRequestAlert', error + ". \n\n Please check your user information."))
    
    
    commit('setUserData', await getStoredData());
    return
  },
  
  async userDetails({ commit }, data) {
    let config = {
      method: 'get',
      url: 'http://192.168.0.20:3000/user/' + data.id,
    };
    axios(config)
      .then((response) => {            
        let data = response.data;
        return commit('setUserDetails', { data })
    }).catch(error => console.log("Error: ", error))
  },

  async userStoredLogin({ commit }){
    getStoredData = async () => {
      let value;
      try {
        value = await AsyncStorage.getItem('@userData')
      } catch(e) {
        // read error
      }
      
      return JSON.parse(value);
    }
    let storedValues = await getStoredData()
    if (await storedValues.token != null && await storedValues != undefined && await storedValues != "") {
      commit('setUserIsLoggedIn', true);
      commit('setUserData', await getStoredData())
    }
    else {
      commit('setUserIsLoggedIn', false);
      commit('setUserData', await getStoredData())
    }
    return 
  },

  userAppliedJob: ({ commit }, data) => {
    let config = {
      method: 'get',
      url: 'http://192.168.0.20:3000/user/' + data.id + "/jobsassigned",
      headers: { 
        'Authorization': 'Bearer ' + data.token 
      }
    };
    console.log(config.url);
    axios(config)
      .then((response) => {            
        let list = response.data.jobs;
        console.log('hoho', list)
        return commit('setUserAppliedJobs', { list })      
    }).catch(error => console.log("Error: ", error))
  },

  async userLogout({ commit }) {  
    setStoredData = async (value) => {
      try {
        await AsyncStorage.setItem('@userData', JSON.stringify(value))
      } catch(e) {
        // save error
      }
    }

    getStoredData = async () => {
      let value;
      try {
        value = await AsyncStorage.getItem('@userData')
      } catch(e) {
        // read error
      }
      
      return JSON.parse(value);
    }
    

    let storageData = {
      token: null,
      id: null
    }
  
    setStoredData(storageData);
    commit('setUserIsLoggedIn', false);
    commit('setUserData', await getStoredData());
    commit('setUserDetails', null);
    commit('setUserAppliedJobs', null);
    return;
  },

  async userSignup({ commit }, data) {
    var dataset = JSON.stringify({
      "email": data.email,
      "password": data.pass,
      "name": data.name
    });
        
    let config = {
      method: 'post',
      url: 'http://192.168.0.20:3000/user/signup',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : dataset
    };
    console.log('URL',config.url);
    axios(config)
      .then((response) => {
        console.log("Hehe", response);
        console.log(response.status);
        if (response.status == 201) {
          return commit('setUserRequestAlert', "User created successfully. Please try to login.")
        }     
      }).catch(error =>        
        commit('setUserRequestAlert', error + ". \n\n Error 409: Email already exist. \n Error 500: Email format not valid.")
      )
  },

  clearAlertMessage({commit}) {
    commit('setUserRequestAlert', "");
  }



  // async userUpdate({ commit, getters }) {
    
  //   let toggle = getters.getUserUpdate;
  //   console.log('update before', toggle);
  //   if (toggle) {
  //     toggle = false;
  //   }
  //   else {
  //     toggle = true;
  //   }

  //   console.log('update after', toggle);
  //   commit('setUserUpdate', toggle);
  // }
};


export default {
    state,
    mutations,
    actions,
    getters
};

	