import axios from 'axios';

const state = {
  allJobs: null,
  selectedJobs: null
};

const getters = {
  getAllJobs: (state) => { return state.allJobs },
  getSelectedJob: (state) => { return state.selectedJobs }
}

const mutations = {
  setAllJobs(state, items) { state.allJobs = items },
  setSelectedJob(state, items) { state.selectedJobs = items}
};

const actions = {
  fetchAllJobs: ({ commit }) => {
    let config = {
      method: 'get',
      url: 'http://192.168.241.51:3000/jobs',
      // headers: { 
      //   'Authorization': 'k0pvp7knyf', 
      //   'Cookie': '__cfduid=da679879c353b4f0834646b68116ac5ce1601792209'
      // }
    };

    axios(config)
      .then((response) => {            
        let list = response.data.jobs;
      return commit('setAllJobs', {list})    
    }).catch(error => console.log("Error: ", error))
  },

  fetchSelectedJob: ({ commit }, data) => {
    let config = {
      method: 'get',
      url: 'http://192.168.241.51:3000/jobs/' + data.id,
      // headers: { 
      //   'Authorization': 'k0pvp7knyf', 
      //   'Cookie': '__cfduid=da679879c353b4f0834646b68116ac5ce1601792209'
      // }
    };
    console.log(config.url);
    axios(config)
      .then((response) => {            
        let list = response.data;
        return commit('setSelectedJob', { list })      
    }).catch(error => console.log("Error: ", error))
  }
};


export default {
    state,
    mutations,
    actions,
    getters
};
