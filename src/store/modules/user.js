import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const state = {
  userLoggedInData: null,
  userDetails: null,

  userIsLoggedIn: false,
  userToken: null
};

const getters = {
  getUserLoggedInData: (state) => { return state.userLoggedInData },
  getUserIsLoggedIn: (state) => { return state.userIsLoggedIn },
  getUserDetails: (state) => { return state.userDetails },
  getUserToken: (state) => { return state.userToken }
}

const mutations = {
  setUserLoggedInData(state, items) { state.userLoggedInData = items },
  setUserIsLoggedIn(state, items) { state.userIsLoggedIn = items },
  setUserDetails(state, items) { state.userDetails = items },
  setUserToken(state, items) { state.userToken = items },
};

const actions = {
  async userLogin({ commit }, data) {
    let dataset = JSON.stringify({
      "email": "kai@test.com",
      "password": "pass"
    });
        
    let config = {
      method: 'post',
      url: 'http://192.168.241.51:3000/user/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : dataset
    };

    let token;

    setStoredToken = async (value) => {
      try {
        await AsyncStorage.setItem('@token', value)
      } catch(e) {
        // save error
      }
    }

    getStoredToken = async () => {
      try {
        return await AsyncStorage.getItem('@token')
      } catch(e) {
        // read error
      }
    }

    await axios(config)
      .then((response) => {
        if (response.status == "200") {
          let list = response.data;
          
          setStoredToken(list.token);
          
          commit('setUserIsLoggedIn', true);
          
          commit('setUserLoggedInData', {list})    
        }
        else {
          commit('setUserIsLoggedIn', false)
        }
      
      }).catch(error => console.log("Error: ", error))
    
    commit('setUserToken', await getStoredToken());
    return
  },
  
  async userDetails({ commit }, data){
    let config = {
      method: 'get',
      url: 'http://192.168.241.51:3000/user/' + data.id,
    };
    console.log(config.url);
    axios(config)
      .then((response) => {            
        let list = response.data;
        console.log(JSON.stringify(response.data));
        return commit('setUserDetails', { list })
    }).catch(error => console.log("Error: ", error))
  },

  async userStoredLogin({ commit }){
    
    getStoredToken = async () => {
      try {
        return await AsyncStorage.getItem('@token')
      } catch(e) {
        // read error
      }
    }

    if (await getStoredToken() != null) {
      commit('setUserIsLoggedIn', true);
      commit('setUserToken', await getStoredToken())
    }
    else {
      commit('setUserIsLoggedIn', false);
      commit('setUserToken', await getStoredToken())
    }
    return 
  },

  async userLogout({ commit }){
    setStoredToken = async (value) => {
      try {
        await AsyncStorage.setItem("@token", value);
      } catch (e) {
        // save error
      }
    };

    getStoredToken = async () => {
      try {
        return await AsyncStorage.getItem('@token')
      } catch(e) {
        // read error
      }
    }
  
    setStoredToken("");
    commit('setUserIsLoggedIn', false);
    commit('setUserToken', await getStoredToken());
    return;
  }

  // userSignup: ({ commit }, data) => {
  //   let config = {
  //     method: 'get',
  //     url: 'http://192.168.0.16:3000/jobs/' + data.id,
  //     // headers: { 
  //     //   'Authorization': 'k0pvp7knyf', 
  //     //   'Cookie': '__cfduid=da679879c353b4f0834646b68116ac5ce1601792209'
  //     // }
  //   };
  //   console.log(config.url);
  //   axios(config)
  //     .then((response) => {            
  //       let list = response.data;
  //       return commit('setSelectedJob', { list })      
  //   }).catch(error => console.log("Error: ", error))
  // }
};


export default {
    state,
    mutations,
    actions,
    getters
};

	