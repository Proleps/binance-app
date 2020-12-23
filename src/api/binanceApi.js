class BinanceAPI{
  constructor() {
    this.socketConnection = null
    this.lastUpdateId = null
  }

  async fetchUpdateMarket(activeSymbol) {
    const stream = await fetch(`https://api.binance.com/api/v3/depth?symbol=${activeSymbol}&limit=500`)
    const response = await stream.json()
    this.lastUpdateId = response.lastUpdateId
    return response
  }

  async startWebsocketDiffsCatching(activeSymbol, callback, ...argsForCallback) {
    if (this.socketConnection) this.socketConnection.close()
    this.socketConnection = new WebSocket(`wss://stream.binance.com:9443/ws/${activeSymbol.toLowerCase()}@depth@1000ms`)
    this.fetchUpdateMarket(activeSymbol)

    this.socketConnection.onmessage = event => {
      const response = JSON.parse(event.data)
      if (response.u > this.lastUpdateId) {
        response.b = response.b.filter( (bid) => +bid[1] !== 0)
        response.a = response.a.filter( (ask) => +ask[1] !== 0)
        if (response.b.length || response.a.length) callback(...argsForCallback, {bids: response.b, asks: response.a})
      }
    }
  }
}

export const api = new BinanceAPI()