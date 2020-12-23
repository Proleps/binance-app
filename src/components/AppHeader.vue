<template>
  <header class="header">
    <div class="header__logo logo" >
      <div class="logo__icon" > B </div>
      <div class="logo__title">Binance-App</div>
    </div>
    <div class="header__nav">
      <router-link to="/">Order book</router-link>
      <router-link to="/curdif">Currency And Diffs</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
  },
};
</script>

<style scoped lang="sass">
  .header
    height: 100%
    width: 100%
    display: flex
    justify-content: space-around
    align-items: center
    box-sizing: border-box
    background-color: rgb(22, 27, 34)
    border-bottom: 1px solid #42b983
    .logo
      display: flex
      justify-content: space-between
      align-items: center
      &__icon
        height: 3rem
        width: 3rem
        margin: 1rem
        display: flex
        justify-content: center
        align-items: center
        background-color: #42b983
        transform: skewX(-15deg)
      &__title
        margin: 0 1rem
        font-size: 1.5rem
    &__nav
      height: 100%
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      a
        margin: 0 0.5rem
        font-weight: bold
        color: #4c5e60
        &.router-link-exact-active
          color: #42b983
  @media (max-width: 481px)
    .header
      &__nav
        flex-direction: column
        justify-content: center
        align-items: center
</style>
