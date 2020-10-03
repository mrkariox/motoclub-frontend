<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import routeNames from "./router/routeNames";

export default {
  name: "APP",
  components: {
    // NavigationMain
  },
  data() {
    return {
      notWelcomeRoute: false
    };
  },
  mounted() {
    this.axios.get('/wp/v2/posts').then(res=>{
      console.log(res.data);
    });
  },

  computed: {
    ...mapGetters({
      // loginRequestResponse: "auth/getLoginRequestResponse",
      // isLoggedIn: "auth/getIsLoggedIn",
      // getUnreadNotifications: "notifications/getUnreadNotifications"
    })
  },
  methods: {
    ...mapActions({
      // setCurrentUserData: "auth/getUserDetails",
      // sendNumberUnreadNotifications:
      //     "notifications/sendNumberUnreadNotifications",
      // setLoanDocs: "loanDocs/setLoanDocs"
    })
  },
  watch: {
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
