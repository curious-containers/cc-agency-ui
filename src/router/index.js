import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import Experiments from '@/views/Experiments.vue'
import Experiment from '@/views/Experiment.vue'
import ExperimentCreate from '@/views/ExperimentCreate.vue'
import Batches from '@/views/Batches.vue'
import Batch from '@/views/Batch.vue'
import Nodes from '@/views/Nodes.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/experiments',
    name: 'Experiments',
    component: Experiments,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/experiments/:id',
    name: 'Experiment',
    component: Experiment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/experiment/create',
    name: 'Create Experiment',
    component: ExperimentCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/batches',
    name: 'Batches',
    component: Batches,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/batches/:id',
    name: 'Batch',
    component: Batch,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nodes',
    name: 'Nodes',
    component: Nodes,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router
