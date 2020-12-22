<template>
  <div class="home">
    <BookPriceTable :market="market.bids" />
    <BookPriceTable :market="market.asks" />
  </div>
</template>

<script>
import BookPriceTable from '../components/BookPriceTable'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    BookPriceTable
  },
  computed: {
    ...mapState({
      activeSymbol: state => state.activeSymbol,
      market: state => state.market
    })
  },
  created() {
    this.$store.dispatch('updateMarket', this.activeSymbol)
    this.$store.dispatch('updateMarketWithSocket', this.activeSymbol)
  }
}
</script>

<style lang="sass" scoped>
  .home
    height: 100%
    padding: 2rem
    box-sizing: border-box
    display: flex
    justify-content: space-around
    align-items: center
</style>
