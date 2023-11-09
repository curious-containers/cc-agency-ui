<template>
  <section class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-lg-3 col-6">
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{ stats.totalExperiments }}</h3>
              <p>Total Experiments</p>
            </div>
            <div class="icon">
              <i class="fas fa-flask"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{ stats.totalBatches }}</h3>
              <p>Total Batches</p>
            </div>
            <div class="icon">
              <i class="fas fa-th"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{ stats.scheduledBatches }}</h3>
              <p>Scheduled Batches</p>
            </div>
            <div class="icon">
              <i class="fas fa-clock"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-6">
          <div class="small-box bg-info">
            <div class="inner">
              <h3>{{ stats.runningBatches }}</h3>
              <p>Running Batches</p>
            </div>
            <div class="icon">
              <i class="fas fa-play"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-lg-6">
          <router-link :to="{ name: 'Create Experiment' }">
            <div class="card">
              <div class="card-body dash-card">
                Start new Experiment
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-6">
          <router-link :to="{ name: 'Experiments' }">
            <div class="card">
              <div class="card-body dash-card">
                Show Experiments
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-6">
          <router-link :to="{ name: 'Batches' }">
            <div class="card">
              <div class="card-body dash-card">
                Show Batches
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-6">
          <router-link :to="{ name: 'Nodes' }">
            <div class="card">
              <div class="card-body dash-card">
                Show Nodes
              </div>
            </div>
          </router-link>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import api from '@/services/api'

import Experiments from '@/views/Experiments.vue'
import Batches from '@/views/Batches.vue'

export default {
  components: {
    Experiments, Batches
  },
  name: 'Dashboard',
  data() {
    return {
      stats: {
        totalExperiments: 0,
        totalBatches: 0,
        scheduledBatches: 0,
        runningBatches: 0
      }
    };
  },
  mounted() {
    this.loadStatistics()
  },
  methods: {
    loadStatistics() {
      api.get('/experiments').then(res => {
        let experiments = res.data
        this.stats.totalExperiments = experiments.length
      }).catch(err => {
        console.log(err)
      })
      api.get('/batches').then(res => {
        let batches = res.data
        this.stats.totalBatches = batches.length
        for (const batch of batches) {
          if (batch.state == 'registered' || batch.state == 'scheduled') {
            this.stats.scheduledBatches++
          } else if (batch.state == 'processing') {
            this.stats.runningBatches++
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.dash-card {
  color: #2C3E50;
}

.dash-card:hover {
  font-weight: 700;
  background-color: #fafafa;
}
</style>