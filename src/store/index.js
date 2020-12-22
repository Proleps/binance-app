import Vue from 'vue'
import Vuex from 'vuex'

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
    activeSymbol: 'BTCUSDT',
    socketConnection: null
  },

  mutations: {
    setMarket(state, {bids, asks}) {
      state.market.bids = bids
      state.market.asks = asks
    },
    setDiffs(state, {bids, asks}) {
      state.diffs.bids = bids.concat(state.diffs.bids)
      state.diffs.asks = asks.concat(state.diffs.asks)
    },
    setActiveSymbol(state, newActiveSymbol) {
      state.activeSymbol = newActiveSymbol
    },
    setSocketConnection(state, activeSymbol = 'BTCUSDT') {
      if (state.socketConnection) {
        state.socketConnection.close()
      }
      state.socketConnection = new WebSocket(`wss://stream.binance.com:9443/ws/${activeSymbol.toLowerCase()}@depth@1000ms`)
    }
  },

  actions: {
    async updateMarket({commit}, activeSymbol = 'BTCUSDT') {
      const stream = await fetch(`https://api.binance.com/api/v3/depth?symbol=${activeSymbol}&limit=500`)
      const response = await stream.json()
      commit('setMarket', response)
      return response.lastUpdateId
    },

    async updateMarketWithSocket({state, commit}, activeSymbol) {
      commit('setSocketConnection', activeSymbol)
      const stream = await fetch(`https://api.binance.com/api/v3/depth?symbol=${activeSymbol}&limit=500`)
      const {lastUpdateId} = await stream.json()

      state.socketConnection.onmessage = event => {
          const response = JSON.parse(event.data)
          if (response.u > lastUpdateId) {
            response.b = response.b.filter( (bid) => +bid[1] !== 0)
            response.a = response.a.filter( (ask) => +ask[1] !== 0)
            if (response.b.length || response.a.length)
                commit('setDiffs', {bids: response.b, asks: response.a})
          }
      }
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
