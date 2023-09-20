<template>
  <Sidebar v-if="isLoggedIn" />

  <div v-if="isLoggedIn" class="content-wrapper">
    <Header :title="currentRouteName" :username="currentUser" />
    <router-view />
  </div>

  <router-view v-if="!isLoggedIn" />
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Dashboard from '@/views/Dashboard.vue'
import Experiments from '@/views/Experiments.vue'
import Batches from '@/views/Batches.vue'

import { mapGetters } from "vuex";

export default {
  components: {
    Header, Sidebar, Dashboard, Experiments, Batches
  },
  mounted() {
    document.title = "Curious Containers"
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    currentRouteName() {
      return this.$route.name;
    },
    currentUser() {
      return localStorage.getItem('username');
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
