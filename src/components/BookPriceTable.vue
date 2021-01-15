<template>
  <div class="table">
    <div class="table__title row">
      {{title}}
    </div>
    <div class="table__headers row">
      <div class="col">Amount</div>
      <div class="col">Price</div>
      <div class="col hidden-on-mobile">Total</div>
    </div>
    <div class="table__body body">
      <div class="wrap">
        <div class="table_loading" v-if="!market.size">
          Пожалуйста подождите пока данные загрузятся...
        </div>
        <div
          v-for="[price, amount] of market"
          :key="price"
          class="body__row row"
        >
          <div class="col">{{amount.substring(0, 8)}}</div>
          <div class="col">{{price.substring(0, 8)}}</div>
          <div class="col hidden-on-mobile">{{`${amount * price}`.substring(0, 12)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeTable',
  props: {
    market: {
      type: Map,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
  .table
    position: relative
    height: 100%
    width: 45%
    &__title
      font-size: 1.5rem
      border-bottom: 1px solid #42b983 !important
    .row
      height: 2rem
      display: flex
      justify-content: space-around
      align-items: center
      box-sizing: border-box
      border-bottom: 1px solid rgba(255, 255, 255, 0.2)
    .col
      width: 33%
      padding-left: 1rem
      text-align: start
    .body
      position: relative
      height: calc( 100% - 4rem )
      width: 100%
      overflow: hidden
      &__row:nth-child(even)
        background-color: rgba( 0, 0, 0, 0.4)
      &:hover
        overflow-y: auto
      .wrap
        position: absolute
        width: 45vw
        left: 0
        top: 0
    &_loading
      height: 2rem
      display: flex
      justify-content: center
      align-items: center
  @media (max-width: 768px)
    .hidden-on-mobile
      display: none
</style>
