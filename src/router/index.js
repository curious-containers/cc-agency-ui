import { createRouter, createWebHistory } from 'vue-router'
import PassThrough from '@/views/PassThrough.vue'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import Experiments from '@/views/Experiments.vue'
import Experiment from '@/views/Experiment.vue'
import ExperimentCreate from '@/views/ExperimentCreate.vue'
import Batches from '@/views/Batches.vue'
import Batch from '@/views/Batch.vue'
import Stdout from '@/views/Stdout.vue'
import Stderr from '@/views/Stderr.vue'
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
    component: PassThrough,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Experiments',
        component: Experiments,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: ':id',
        name: 'Experiment',
        component: Experiment,
      },
      {
        path: 'create',
        name: 'Create Experiment',
        component: ExperimentCreate,
      }
    ]
  },
  {
    path: '/batches',
    component: PassThrough,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Batches',
        component: Batches,
      },
      {
        path: ':id',
        name: 'Batch',
        component: Batch,
      },
      {
        path: ':id/stdout',
        name: 'Batch Stdout',
        component: Stdout,
      },
      {
        path: ':id/stderr',
        name: 'Batch Stderr',
        component: Stderr,
      }
    ]
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

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
});

export default router
