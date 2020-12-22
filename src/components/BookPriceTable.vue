<template>
  <div class="table">
    <div class="table_title-row row">
      <div class="col">Amount</div>
      <div class="col">Price</div>
      <div class="col col_hidden-on-mobile">Total</div>
    </div>
    <div class="table__body body">
      <div class="table_loading" v-if="!market.length">
        Пожалуйста подождите, данные заружаются...
      </div>
      <div
        v-for="(item, key) of market"
        :key="item[0] + key"
        class="body_row row"
      >
        <div class="col">{{item[1]}}</div>
        <div class="col">{{item[0]}}</div>
        <div class="col col_hidden-on-mobile">{{item[1] * item[0]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeTable',
  props: {
    market: {
      type: Array,
      required: true
    }
  }
}
</script>


<style lang="sass" scoped>
  .table
    position: relative
    height: 100%
    width: 50%
    margin: 0 2rem
    .row
      height: 2rem
      display: flex
      justify-content: space-around
      align-items: center
      border-bottom: 1px solid rgba(255, 255, 255, 0.2)
    .col
      width: 33%
      padding-left: 1rem
      text-align: start
    .body
      height: calc( 100% - 2rem )
      width: 100%
      overflow: hidden
      &_row:nth-child(even)
        background-color: rgba( 0, 0, 0, 0.4)
      &:hover
        overflow-y: scroll
    &_loading
      height: 2rem
      display: flex
      justify-content: center
      align-items: center
  @media (max-width: 768px)
    .col
      &_hidden-on-mobile
        display: none
  @media (min-width: 1024px)
    .body:hover
        width: calc( 100% + 17px )
</style>