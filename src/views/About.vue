<template>
  <div class="about">
    <DropdownComponent
      :options="options"
      @setOption="updateActiveSymbol"
    />
    <div class="tables">
      <BookPriceTable :market="diffs.bids" />
      <BookPriceTable :market="diffs.asks" />
    </div>
  </div>
</template>

<script>
import DropdownComponent from '../common/DropdownComponent'
import BookPriceTable from '../components/BookPriceTable'

export default {
  components: {
    DropdownComponent, BookPriceTable
    },
  data() {
    return {
      options: ['BTCUSDT', 'BNBBTC', 'ETHBTC']
    }
  },
  methods: {
    updateActiveSymbol(newSymbol) {
      this.$store.dispatch('updateActiveSymbol', newSymbol)
    }
  },
  computed: {
    diffs() {
      return this.$store.state.diffs
    },
    activeSymbol() {
      return this.$store.getters.getActiveSymbol
    }
  },
  created() {
    this.$store.dispatch('updateMarket', this.activeSymbol)
    this.$store.dispatch('updateMarketWithSocket', this.activeSymbol)
  }
}
</script>

<style lang="sass" scoped>
  .about
    height: 100%
    padding: 2rem
    box-sizing: border-box
    display: flex
    align-items: center
    flex-direction: column
    .tables
      height: calc( 100% - 3rem )
      padding-top: 2rem
      box-sizing: border-box
      width: 100%
      display: flex
      justify-content: space-around
      align-items: center
</style>