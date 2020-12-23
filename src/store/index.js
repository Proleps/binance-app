import Vue from 'vue'
import Vuex from 'vuex'
import {api} from '@/api/binanceApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    market: {
      bids: [],
      asks: []
    },
    diffs: {
      bids: [],
      asks: []
    },
    activeSymbol: 'BTCUSDT'
  },

  mutations: {
    setMarket(state, {bids, asks}) {
      state.market.bids = bids
      state.market.asks = asks
    },
    setDiffs(state, {bids, asks}) {
      state.diffs.bids = bids
      state.diffs.asks = asks
      state.market.bids = state.market.bids.map( (curBid) => {
        for (let bid of bids) {
          if (bid[0] === curBid[0]) {
            return bid
          } else return curBid
        }
      })
      state.market.asks = state.market.asks.map( (curAsk) => {
        for (let ask of asks) {
          if (ask[0] === curAsk[0]) {
            return ask
          } else return curAsk
        }
      })
    },
    setActiveSymbol(state, newActiveSymbol) {
      state.activeSymbol = newActiveSymbol
    }
  },

  actions: {
    async updateMarket({commit}, activeSymbol = 'BTCUSDT') {
      const response = await api.fetchUpdateMarket(activeSymbol)
      commit('setMarket', response)
    },

    async updateMarketWithSocket({commit}, activeSymbol = 'BTCUSDT') {
      api.startWebsocketDiffsCatching(activeSymbol, commit, 'setDiffs')
    },

    updateActiveSymbol({commit, dispatch}, newActiveSymbol) {
      commit('setActiveSymbol', newActiveSymbol)
      dispatch('updateMarket', this.state.activeSymbol)
      dispatch('updateMarketWithSocket', this.state.activeSymbol)
    }
  },

  getters: {
    getMarket: s => s.market,
    getDiffs: s => s.diffs,
    getActiveSymbol: s => s.activeSymbol
  }
})
