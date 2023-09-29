<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
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
          <!-- <li class="nav-item">
            <router-link to="/">
              <p>Connector</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">
              <p>Cloud</p>
            </router-link>
          </li> -->
        </ul>
      </nav>
    </div>
    <!-- /.sidebar -->
    <div class="sidebar-footer-content">
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
          <li class="nav-item">
            <a class="text-white" href="" @click.prevent="handleLogout">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import AuthService from '@/services/auth'

export default {
  name: 'Sidebar',
  methods: {
    handleLogout() {
      AuthService.logout()
    }
  }
}
</script>

<style>
.main-sidebar {
  position: fixed !important;
}

.sidebar-footer-content {
  position: absolute;
  height: fit-content;
  bottom: 0px;
}
</style>