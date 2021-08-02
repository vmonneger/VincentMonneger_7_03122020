<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import jwt_decode from "jwt-decode"
export default {
  name: 'App',
  components: {
    Navbar
  },
  // PERMET QUE USER ID ET ADMIN DANS LE STORE PERSIST QUAND LE USER REFRESH PAGE
  created() {
    if (this.$store.state.token) {
      const decodeToken = jwt_decode(this.$store.state.token)
      this.$store.state.userId = decodeToken.user_id;
      this.$store.state.admin = decodeToken.admin;
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
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

.logo {
  font-size: 5px;
}
</style>
