export default {
  getActiveSymbolForStore(state) {
    return state.activeSymbol;
  },

  getActiveSymbolForPrint(state) {
    const { firstCurrency, secondCurrency } = state.activeSymbol;
    return firstCurrency.concat(' - ', secondCurrency);
  },
};
