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

  async fetchUpdateMarket(activeSymbol) {
    const stream = await fetch(`${API_REST_PATH}depth?symbol=${activeSymbol}&limit=${FETCH_ORDERS_LIMIT}`);
    const response = await stream.json();
    this.lastUpdateId = response.lastUpdateId;
    return response;
  }

  startWebsocketDiffsCatching(activeSymbol, callback, ...argsForCallback) {
    if (this.socketConnection) this.socketConnection.close();
    this.fetchUpdateMarket(activeSymbol);
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
