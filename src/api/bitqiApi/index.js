import {
  API_REST_PATH,
  FETCH_ORDERS_LIMIT,
  API_WEBSOCKET_PATH,
} from './bitqiApiConfig';

class BitqiAPI {
  constructor() {
    this.currentSymbolsCouple = null;
    this.market = null;
    this.marketId = 1;
    this.orderBookId = null;
    this.ORDER_SIDE = ['bids', 'asks'];
    this.OPEN_SOCKET = 1;
    this.socketConnection = null;
  }

  async getMarket() {
    const stream = await fetch(`${API_REST_PATH}GetAllMarkets`);
    const marketsList = await stream.json();
    this.market = await marketsList
      .map((item) => ({ marketId: item.marketId, marketName: item.marketName }));
  }

  updateMarketId(activeSymbolsCouple) {
    this.currentSymbolsCouple = activeSymbolsCouple;
    const symbolsCouple = `${activeSymbolsCouple.firstCurrency}/${activeSymbolsCouple.secondCurrency}`;

    this.marketId = this.market
      .find((market) => market.marketName === symbolsCouple)
      .marketId;
  }

  async fetchUpdateMarket({ asks, bids }) {
    try {
      if (!this.orderBookId || (this.orderBookId !== this.marketId)) {
        const stream = await fetch(`${API_REST_PATH}GetOrderBook?marketId=${this.marketId}&offset=${0}&limit=${FETCH_ORDERS_LIMIT}`);
        const response = await stream.json();
        const newAsks = response.asks.map((a) => [a.price.toString(), a.quantity.toString()]);
        const newBids = response.bids.map((b) => [b.price.toString(), b.quantity.toString()]);
        this.orderBookId = this.marketId;
        return { asks: newAsks, bids: newBids };
      }
      return { asks: [...asks], bids: [...bids] };
    } catch (error) {
      return { asks: [...asks], bids: [...bids] };
    }
  }

  async startWebsocketDiffsCatching(callback, ...argsForCallback) {
    if (!this.socketConnection) this.socketConnection = new WebSocket(`${API_WEBSOCKET_PATH}`);
    this.socketConnection.onopen = () => {
      this.socketConnection.send(JSON.stringify({ marketId: this.marketId }));
    };

    this.socketConnection.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if ((response.type === 'OrderBook') && (response.data.marketId === this.marketId)) {
        const side = [this.ORDER_SIDE[response.data.side]];
        callback(...argsForCallback, {
          [side]: [[response.data.price.toString(), response.data.amount.toString()]],
        });
      }
    };
  }

  async updateSymbols(activeSymbolsCouple) {
    if (!this.market) await this.getMarket();
    if (JSON.stringify(this.currentSymbolsCouple) !== JSON.stringify(activeSymbolsCouple)) {
      if (this.socketConnection.readyState === this.OPEN_SOCKET) {
        this.socketConnection.send(JSON.stringify({ marketId: -this.marketId }));
      }
      this.updateMarketId(activeSymbolsCouple);
      if (this.socketConnection.readyState === this.OPEN_SOCKET) {
        this.socketConnection.send(JSON.stringify({ marketId: this.marketId }));
      }
    }
  }
}

export default new BitqiAPI();
