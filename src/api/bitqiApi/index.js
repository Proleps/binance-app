import {
  API_REST_PATH,
  FETCH_ORDERS_LIMIT,
  API_WEBSOCKET_PATH,
} from './bitqiApiConfig';

class BinanceAPI {
  constructor() {
    this.marketId = null;
    this.ORDER_SIDE = ['bids', 'asks'];
    this.socketConnection = null;
    this.currentSymbolsCouple = null;
  }

  async fetchUpdateMarket(activeSymbolsCouple) {
    await this.shouldUpdateMarketId(activeSymbolsCouple);

    const stream = await fetch(`${API_REST_PATH}GetOrderBook?marketId=${this.marketId}&offset=${0}&limit=${FETCH_ORDERS_LIMIT}`);
    const response = await stream.json();
    const asks = response.asks.map((a) => [a.price.toString(), a.quantity.toString()]);
    const bids = response.bids.map((b) => [b.price.toString(), b.quantity.toString()]);
    return { asks, bids };
  }

  async startWebsocketDiffsCatching(activeSymbolsCouple, callback, ...argsForCallback) {
    await this.shouldUpdateMarketId(activeSymbolsCouple);

    if (this.socketConnection) this.socketConnection.close();

    this.socketConnection = new WebSocket(`${API_WEBSOCKET_PATH}`);
    this.socketConnection.onopen = () => {
      this.socketConnection.send(JSON.stringify({ marketId: this.marketId }));
    };

    this.socketConnection.onmessage = async (event) => {
      const response = JSON.parse(event.data);
      if ((response.type === 'OrderBook') && (response.data.marketId === this.marketId)) {
        const side = [this.ORDER_SIDE[response.data.side]];
        callback(...argsForCallback, {
          [side]: [[response.data.price.toString(), response.data.amount.toString()]],
        });
      }
    };
  }

  async shouldUpdateMarketId(activeSymbolsCouple) {
    if (!this.currentSymbolsCouple) {
      await this.getMarketId(activeSymbolsCouple);
    } else if (JSON.stringify(this.currentSymbolsCouple) !== JSON.stringify(activeSymbolsCouple)) {
      await this.getMarketId(activeSymbolsCouple);
    }
  }

  async getMarketId(activeSymbolsCouple) {
    this.currentSymbolsCouple = { ...activeSymbolsCouple };

    const stream = await fetch(`${API_REST_PATH}GetAllMarkets`);
    const marketsList = await stream.json();
    const symbols = `${activeSymbolsCouple.firstCurrency}/${activeSymbolsCouple.secondCurrency}`;
    this.marketId = marketsList.find((market) => market.marketName === symbols).marketId;
  }
}

export default new BinanceAPI();
