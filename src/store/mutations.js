import {
  SET_MARKET,
  SET_DIFFS,
  CLEAR_DIFFS,
  SET_ACTIVE_SYMBOL,
} from './actionTypes';

const ASCENDING_SORT = 'ASCENDING_SORT';
const DESCENDING_SORT = 'DESCENDING_SORT';

class UpdateMap {
  constructor() {
    this.sortList = {
      [ASCENDING_SORT]: (a, b) => a[0] - b[0],
      [DESCENDING_SORT]: (a, b) => b[0] - a[0],
    };
    this.PRICE = '0';
    this.AMOUNT = '1';
  }

  marketMap(bidsOrAsks, sortBy, oldMap) {
    const newBidsOrAsks = new Map(oldMap);
    bidsOrAsks.forEach((order) => {
      if (+order[this.AMOUNT] === 0) newBidsOrAsks.delete(order[this.PRICE]);
      else newBidsOrAsks.set(...order);
    });
    return new Map([...newBidsOrAsks.entries()].sort(this.sortList[sortBy]).splice(0, 500));
  }

  diffsMap = (bidsOrAsks) => {
    const newBidsOrAsks = new Map();
    bidsOrAsks.forEach((item) => {
      newBidsOrAsks.set(...item);
    });
    return newBidsOrAsks;
  }
}

const update = new UpdateMap();

export default {
  [SET_MARKET](state, { bids, asks }) {
    state.market.bids = update.marketMap(bids, DESCENDING_SORT);
    state.market.asks = update.marketMap(asks, ASCENDING_SORT);
  },

  [SET_DIFFS](state, { bids, asks }) {
    if (bids) {
      state.market.bids = update.marketMap(bids, DESCENDING_SORT, state.market.bids);
      state.diffs.bids = update.diffsMap(bids, state.diffs.bids);
    }
    if (asks) {
      state.market.asks = update.marketMap(asks, ASCENDING_SORT, state.market.asks);
      state.diffs.asks = update.diffsMap(asks, state.diffs.asks);
    }
  },

  [SET_ACTIVE_SYMBOL](state, newActiveSymbol) {
    state.activeSymbol = newActiveSymbol;
  },

  [CLEAR_DIFFS](state) {
    state.diffs.bids = new Map();
    state.diffs.asks = new Map();
  },
};
