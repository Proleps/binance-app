export default {
  setMarket(state, { bids, asks }) {
    state.market.bids = bids;
    state.market.asks = asks;
  },

  setDiffs(state, { bids, asks }) {
    state.diffs.bids = bids;
    state.diffs.asks = asks;
    state.market.bids = state.market.bids.map((curBid) => {
      let newBid = curBid;
      bids.forEach((bid) => {
        if (bid[0] === curBid[0]) newBid = bid;
      });
      return newBid;
    });
    state.market.asks = state.market.asks.map((curAsk) => {
      let newAsk = curAsk;
      bids.forEach((ask) => {
        if (ask[0] === curAsk[0]) newAsk = ask;
      });
      return newAsk;
    });
  },

  setActiveSymbol(state, newActiveSymbol) {
    state.activeSymbol = newActiveSymbol;
  },
};
