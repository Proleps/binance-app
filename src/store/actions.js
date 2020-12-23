import api from '../api/binanceApi';

export default {
  async updateMarket({ commit }, activeSymbol = 'BTCUSDT') {
    const response = await api.fetchUpdateMarket(activeSymbol);
    commit('setMarket', response);
  },

  async updateMarketWithSocket({ commit }, activeSymbol = 'BTCUSDT') {
    api.startWebsocketDiffsCatching(activeSymbol, commit, 'setDiffs');
  },

  updateActiveSymbol({ commit, dispatch }, newActiveSymbol) {
    commit('setActiveSymbol', newActiveSymbol);
    dispatch('updateMarket', this.state.activeSymbol);
    dispatch('updateMarketWithSocket', this.state.activeSymbol);
  },
};
