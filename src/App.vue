<template>
  <!-- Main Sidebar Container -->
  <aside v-if="currentUser" class="main-sidebar sidebar-dark-primary elevation-4">
    <router-link :to="{ name: 'Dashboard' }">
      <img src="@/assets/logo.svg" alt="Curious Container Logo">
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
          <li class="nav-item">
            <router-link :to="{ name: 'Dashboard' }">
              <p>Dashboard</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Experiments' }">
              <p>Experiments</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Batches' }">
              <p>Batches</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">
              <p>Connector</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">
              <p>Cloud</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <!-- /.sidebar -->
  </aside>

  <div v-if="currentUser" class="content-wrapper">
    <Header :title="currentRouteName" />
    <router-view />
  </div>

  <router-view v-if="!currentUser" />
</template>

<script>
import Header from '@/views/Header.vue'
import Dashboard from '@/views/Dashboard.vue'
import Experiments from '@/views/Experiments.vue'
import Batches from '@/views/Batches.vue'

export default {
  components: {
    Header, Dashboard, Experiments, Batches
  },
  mounted() {
    document.title = "Curious Containers"
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    currentUser() {
      return false;
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
