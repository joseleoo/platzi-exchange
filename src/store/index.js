import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false,
        assets: [],
        asset: {},
        history: [],
        markets: []
    },
    getters: {
        min(state) {
            // console.log(state.history)
            return Math.min(
                ...state.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
            )
        },
        max(state) {
            // console.log(state.history)
            return Math.max(
                ...state.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
            )
        },
        avg(state) {
            // console.log(state.history)
            return Math.abs(
                ...state.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
            )
        }
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
                commit('SET_ASSET', asset)
                commit('SET_HISTORY', history)
                commit('SET_MARKETS', markets)
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
        SET_ASSET(state, asset) {
            state.asset = asset
        },
        SET_HISTORY(state, history) {
            state.history = history
        },
        SET_MARKETS(state, markets) {
            state.markets = markets
        },
    }
})