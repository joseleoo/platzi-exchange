import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false,
        assets: []
    },
    getter: {

    },
    actions: {
        getAssets({ commit }) {
            commit('LOADING_TRUE')
            api
                .getAssetsApi()
                .then(assets => commit('SET_ASSETS', assets))
                .finally(commit('LOADING_FALSE'))
        }
    },
    mutations: {
        SET_ASSETS(state, assets) {
            state.assets = assets
        },
        LOADING_FALSE(state) {
            state.isLoading = false
        },
        LOADING_TRUE(state) {
            state.isLoading = true
        }
    }
})