import api from '../api/binanceApi';
import {
  SET_MARKET,
  SET_DIFFS,
  CLEAR_DIFFS,
  SET_ACTIVE_SYMBOL,
  UPDATE_MARKET_WITH_REST,
  UPDATE_MARKET_WITH_SOCKET,
  UPDATE_ACTIVE_SYMBOL,
} from './actionTypes';

export default {
  async [UPDATE_MARKET_WITH_REST]({ state, commit }, activeSymbol) {
    const response = await api.fetchUpdateMarket(state.market, activeSymbol);
    commit(SET_MARKET, response);
  },

  [UPDATE_MARKET_WITH_SOCKET]({ commit }, activeSymbol) {
    api.startWebsocketDiffsCatching(activeSymbol, commit, SET_DIFFS);
  },

  [UPDATE_ACTIVE_SYMBOL]({ commit, dispatch }, newActiveSymbol) {
    commit(SET_ACTIVE_SYMBOL, newActiveSymbol);
    commit(CLEAR_DIFFS);
    dispatch(UPDATE_MARKET_WITH_REST, newActiveSymbol);
    dispatch(UPDATE_MARKET_WITH_SOCKET, newActiveSymbol);
  },
};
