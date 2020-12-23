export default {
  getActiveSymbolForStore(state) {
    const { firstCurrency, secondCurrency } = state.activeSymbol;
    return firstCurrency.concat(secondCurrency);
  },

  getActiveSymbolForPrint(state) {
    const { firstCurrency, secondCurrency } = state.activeSymbol;
    return firstCurrency.concat(' - ', secondCurrency);
  },
};
