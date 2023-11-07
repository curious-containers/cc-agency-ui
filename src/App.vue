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

.badge {
  color: #fff;
}

.badge.registered {
  background-color: #6c757d;
}

.badge.scheduled {
  background-color: #3b3f42;
}

.badge.processing {
  background-color: #007bff;
}

.badge.succeeded {
  background-color: #28a745;
}

.badge.failed {
  background-color: #dc3545;
}

.badge.cancelled {
  background-color: #ffc107;
}

dt.set-in {
  padding-left: 20px;
  padding-top: 10px;
  font-weight: 100;
}

dd.set-in {
  padding-top: 10px;
}

.no-margin {
  margin: 0 !important;
}

.cl-red {
  color: #dc3545;
}

.cl-green {
  color: #28a745;
}

.margin-l-1r {
  margin-left: 1rem;
}
</style>
