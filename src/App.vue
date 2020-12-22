<template>
  <div id="app">
    <div class="header-container">
      <AppHeader />
    </div>

    <div class="routes-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  background-color: #0D1117;
  color: #C9D1D9;
}
@media (max-width: 1024px) {
  html {
    font-size: 14px;
  }
}
@media (max-width: 481px) {
  html {
    font-size: 12px;
  }
}

.header-container {
  height: 5rem;
}
.routes-container {
  height: calc( 100vh - 5rem );
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
