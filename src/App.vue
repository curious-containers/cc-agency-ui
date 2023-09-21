<template>
  <Sidebar v-if="$store.getters.isLoggedIn" />

  <div v-if="$store.getters.isLoggedIn" class="content-wrapper">
    <Header :title="currentRouteName" />
    <router-view />
  </div>

  <router-view v-if="!$store.getters.isLoggedIn" />
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Dashboard from '@/views/Dashboard.vue'
import Experiments from '@/views/Experiments.vue'
import Batches from '@/views/Batches.vue'

export default {
  components: {
    Header, Sidebar, Dashboard, Experiments, Batches
  },
  mounted() {
    document.title = "Curious Containers"
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    isLoggedIn() {
      return this.$store.state.user;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #61abd1 !important;
}
</style>
