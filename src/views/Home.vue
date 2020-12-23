<template>
  <div class="home">
    currently currencies couple {{activeSymbol}}
    <div class="home_content">
      <BookPriceTable :market="market.bids" title="bids" />
      <BookPriceTable :market="market.asks" title="asks" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BookPriceTable from '../components/BookPriceTable.vue';

export default {
  name: 'Home',
  components: {
    BookPriceTable,
  },
  computed: {
    ...mapState({
      activeSymbol: (state) => state.activeSymbol,
      market: (state) => state.market,
    }),
  },
  created() {
    this.$store.dispatch('updateMarket', this.activeSymbol);
    this.$store.dispatch('updateMarketWithSocket', this.activeSymbol);
  },
};
</script>

<style lang="sass" scoped>
  .home
    height: calc( 100% - 5rem )
    padding: 2rem
    &_content
      height: 100%
      box-sizing: border-box
      display: flex
      justify-content: space-around
      align-items: center
</style>
