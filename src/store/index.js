import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false,
        assets: [],
        asset: [],
        history: [],
        markets: []
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
        },
        getCoins({ commit }, id) {
            commit('LOADING_TRUE')
            Promise.all([
                api.getAsset(id),
                api.getAssetHistory(id),
                api.getMarkets(id),
            ]).then(([asset, history, markets]) => {
                commit('SET_DETAILS', asset, history, markets)
                // state.asset = asset
                // state.history = history
                // state.markets = markets
            }).finally(() => commit('LOADING_FALSE'))
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
        },
        SET_DETAILS(state, asset, history, markets) {
            state.asset = asset
            state.history = history
            state.markets = markets
        }
    }
})