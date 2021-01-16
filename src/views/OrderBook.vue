<template>
  <div class="order-book">
    <div class="order-book__title">
      currently currencies couple:
      <span>{{activeSymbolForPrint}}</span>
    </div>
    <div class="order-book__tables">
      <BookPriceTable :market="market.bids" title="bids" />
      <BookPriceTable :market="market.asks" title="asks" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import BookPriceTable from '../components/BookPriceTable.vue';
import { UPDATE_MARKET_WITH_REST, INIT } from '../store/actionTypes';

export default {
  name: 'OrderBook',
  components: {
    BookPriceTable,
  },
  computed: {
    ...mapState({
      market: (state) => state.market,
    }),
    ...mapGetters({
      activeSymbolForPrint: 'getActiveSymbolForPrint',
      activeSymbolForStore: 'getActiveSymbolForStore',
    }),
  },
  created() {
    this.$store.dispatch(INIT, this.activeSymbolForStore);
    this.$store.dispatch(UPDATE_MARKET_WITH_REST);
  },
};
</script>

<style lang="sass" scoped>
  .order-book
    height: 100%
    box-sizing: border-box
    display: flex
    align-items: center
    flex-direction: column
    &__title
      height: 3rem
      width: 90%
      margin: 0.5rem 0
      display: flex
      flex-direction: row
      justify-content: center
      align-items: flex-end
      font-size: 1.5rem
      span
        margin-left: 1rem
    &__tables
      height: calc( 100% - 4rem )
      width: 100%
      margin: 0.5rem 0 1rem 0
      display: flex
      justify-content: space-around
      align-items: center
  @media (max-width: 481px)
    .order-book
      &__title
        flex-direction: column
        justify-content: flex-start
        align-items: center
</style>
