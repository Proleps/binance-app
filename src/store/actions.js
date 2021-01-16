import api from '../api/bitqiApi';
import {
  INIT,
  SET_MARKET,
  SET_DIFFS,
  CLEAR_DIFFS,
  SET_ACTIVE_SYMBOL,
  UPDATE_MARKET_WITH_REST,
  UPDATE_MARKET_WITH_SOCKET,
  UPDATE_ACTIVE_SYMBOL,
} from './actionTypes';

export default {
  [UPDATE_MARKET_WITH_SOCKET]({ commit }) {
    api.startWebsocketDiffsCatching(commit, SET_DIFFS);
  },

  async [UPDATE_MARKET_WITH_REST]({ state, commit, dispatch }) {
    const response = await api.fetchUpdateMarket(state.market);
    commit(SET_MARKET, response);
    dispatch(UPDATE_MARKET_WITH_SOCKET);
  },

  async [UPDATE_ACTIVE_SYMBOL]({ commit }, newActiveSymbol) {
    await api.updateSymbols(newActiveSymbol);
    commit(SET_ACTIVE_SYMBOL, newActiveSymbol);
    commit(CLEAR_DIFFS);
  },

  async [INIT]({ commit }, newActiveSymbol) {
    await api.updateSymbols(newActiveSymbol);
    commit(SET_ACTIVE_SYMBOL, newActiveSymbol);
  },
};
