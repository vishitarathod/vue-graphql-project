import Vuex from "vuex";
import Vue from 'vue'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

//create store
const store = new Vuex.Store({
    state:{
        
            isLoading:false,
            loginApiStatus: "",
            logOut:false,
            registerProfile:{
                name:'',
                email:'',
                password:'',
                roleId:''
        }
    },
    getters,
    mutations,
    actions
});
export default store;
