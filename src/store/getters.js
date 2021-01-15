export default {
  getActiveSymbolForStore(state) {
    return state.activeSymbol;
  },

  getActiveSymbolForPrint(state) {
    const { firstCurrency, secondCurrency } = state.activeSymbol;
    return firstCurrency.concat(' - ', secondCurrency);
  },

  getReversedDiffs(state) {
    const reversedBids = new Map([...state.diffs.bids.entries()].reverse());
    const reversedAsks = new Map([...state.diffs.asks.entries()].reverse());
    return { bids: reversedBids, asks: reversedAsks };
  },
};
