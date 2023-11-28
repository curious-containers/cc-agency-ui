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
              <i class="nav-icon fas fa-home"></i>
              Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Experiments' }">
              <i class="nav-icon fas fa-flask"></i>
              Experiments
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Batches' }">
              <i class="nav-icon fas fa-th"></i>
              Batches
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Nodes' }">
              <i class="nav-icon fas fa-share-nodes"></i>
              Nodes
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <!-- /.sidebar -->
    <div class="sidebar-footer-content">
      <nav class="mt-2 nav-footer">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
          <li class="nav-item">
            <a class="text-white" href="" @click.prevent="handleLogout">
              <i class="nav-icon fas fa-user"></i>
              Logout
            </a>
          </li>
        </ul>
        <li class="nav-item">
          <p class="text-white">UI Version: {{ uiVersion }}</p>
          <p class="text-white">CC-Agency Version: {{ agencyVersion }}</p>
        </li>
      </nav>
    </div>
  </aside>
</template>

<script>
import AuthService from '@/services/auth'
import api from '@/services/api'
import packageInfo from '../../package.json';

export default {
  name: 'Sidebar',
  data() {
    return {
      uiVersion: packageInfo.version,
      agencyVersion: undefined
    }
  },
  mounted() {
    this.loadAgencyVersion()
  },
  methods: {
    handleLogout() {
      AuthService.logout()
    },
    loadAgencyVersion() {
      api.get('/version').then(res => {
        this.agencyVersion = res.data.agencyVersion
      }).catch(err => {
        console.log(err)
      })
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

nav {
  padding-left: 20px !important;
}

nav p {
  font-weight: bold;
}

.nav-item {
  margin-bottom: 1.5rem !important;
}

.nav-footer {
  padding-bottom: 0px;
}

nav a.router-link-active {
  color: #61abd1 !important;
}
</style>