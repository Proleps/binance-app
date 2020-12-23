<template>
  <div class="about">
    <DropdownComponent
      :options="options"
      @setOption="updateActiveSymbol"
    />
    <div class="tables">
      <BookPriceTable :market="diffs.bids" title="bids" />
      <BookPriceTable :market="diffs.asks" title="asks" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DropdownComponent from '../common/DropdownComponent.vue';
import BookPriceTable from '../components/BookPriceTable.vue';

export default {
  components: {
    DropdownComponent, BookPriceTable,
  },
  data() {
    return {
      options: ['BTCUSDT', 'BNBBTC', 'ETHBTC'],
    };
  },
  methods: {
    updateActiveSymbol(newSymbol) {
      this.$store.dispatch('updateActiveSymbol', newSymbol);
    },
  },
  computed: {
    ...mapState({
      activeSymbol: (state) => state.activeSymbol,
      diffs: (state) => state.diffs,
    }),
  },
  created() {
    this.$store.dispatch('updateMarketWithSocket', this.activeSymbol);
  },
};
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
