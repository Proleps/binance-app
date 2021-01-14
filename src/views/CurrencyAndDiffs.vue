<template>
  <div class="about">
    <div class="about__dropdown">
      <DropdownComponent
        :options="options"
        :activeOption="activeSymbolForPrint"
        @setOption="updateActiveSymbol"
      />
    </div>
    <div class="about__tables">
      <BookPriceTable :market="diffs.bids" title="bids" />
      <BookPriceTable :market="diffs.asks" title="asks" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DropdownComponent from '../common/DropdownComponent.vue';
import BookPriceTable from '../components/BookPriceTable.vue';
import CURRENCIES_LIST from '../currenciesTypes';
import { UPDATE_MARKET_WITH_SOCKET, UPDATE_ACTIVE_SYMBOL } from '../store/actionTypes';

export default {
  components: {
    DropdownComponent, BookPriceTable,
  },
  data() {
    return {
      options: CURRENCIES_LIST,
    };
  },
  methods: {
    updateActiveSymbol(newActiveSymbol) {
      if (JSON.stringify(newActiveSymbol) !== JSON.stringify(this.activeSymbolForStore)) {
        this.diffs.bids = new Map();
        this.diffs.asks = new Map();
        this.$store.dispatch(UPDATE_ACTIVE_SYMBOL, newActiveSymbol);
      }
    },
  },
  computed: {
    ...mapState({
      diffs: (state) => state.diffs,
    }),
    ...mapGetters({
      activeSymbolForPrint: 'getActiveSymbolForPrint',
      activeSymbolForStore: 'getActiveSymbolForStore',
    }),
  },
  created() {
    this.$store.dispatch(UPDATE_MARKET_WITH_SOCKET, this.activeSymbolForStore);
  },
};
</script>

<style lang="sass" scoped>
  .about
    height: 100%
    box-sizing: border-box
    display: flex
    align-items: center
    flex-direction: column
    &__dropdown
      height: 3rem
      margin: 0.5rem 0
    &__tables
      height: calc( 100% - 4rem )
      width: 100%
      margin: 0.5rem 0 1rem 0
      box-sizing: border-box
      display: flex
      justify-content: space-around
      align-items: center
</style>
