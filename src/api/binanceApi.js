import {
  API_REST_PATH,
  FETCH_ORDERS_LIMIT,
  API_WEBSOCKET_PATH,
  WEBSOCKET_MESSAGE_INTERVAL,
} from './binanceApiConfig';

class BinanceAPI {
  constructor() {
    this.socketConnection = null;
    this.lastUpdateId = null;
  }

  async fetchUpdateMarket(activeSymbolsCouple) {
    const { firstCurrency, secondCurrency } = activeSymbolsCouple;
    const activeSymbol = firstCurrency.concat(secondCurrency);
    const stream = await fetch(`${API_REST_PATH}depth?symbol=${activeSymbol}&limit=${FETCH_ORDERS_LIMIT}`);
    const response = await stream.json();
    this.lastUpdateId = response.lastUpdateId;
    return response;
  }

  startWebsocketDiffsCatching(activeSymbolsCouple, callback, ...argsForCallback) {
    this.fetchUpdateMarket(activeSymbolsCouple);
    const { firstCurrency, secondCurrency } = activeSymbolsCouple;
    const activeSymbol = firstCurrency.concat(secondCurrency);
    if (this.socketConnection) this.socketConnection.close();
    this.socketConnection = new WebSocket(`${API_WEBSOCKET_PATH}${activeSymbol.toLowerCase()}@depth@${WEBSOCKET_MESSAGE_INTERVAL}ms`);

    this.socketConnection.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.u > this.lastUpdateId) {
        if (response.b.length || response.a.length) {
          callback(...argsForCallback, { bids: response.b, asks: response.a });
        }
      }
    };
  }
}

export default new BinanceAPI();
