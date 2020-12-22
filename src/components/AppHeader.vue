<template>
  <header class="header">
    <div class="header__logo logo" >
      <div class="logo__icon" > B </div>
      <div class="logo__title">Binance-App</div>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
        margin: 1rem
        font-size: 2rem
</style>
