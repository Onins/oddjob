import Vue from 'vue-native-core';
import Vuex from 'vuex';

import user from './modules/user';
import jobs from './modules/jobs';

Vue.use(Vuex);

const debug = 'debug';

const store = new Vuex.Store({
  modules: {
    user,
    jobs
  },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;