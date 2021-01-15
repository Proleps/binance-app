import CURRENCIES_LIST from '../currenciesTypes';

export default {
  market: {
    bids: new Map(),
    asks: new Map(),
  },
  diffs: {
    bids: new Map(),
    asks: new Map(),
  },
  activeSymbol: CURRENCIES_LIST[0],
};
