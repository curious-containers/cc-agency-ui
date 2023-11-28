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

      <div class="row mt-4">
        <div class="col-12">
          <h5>Nodes</h5>
          <div class="info-box" v-for="node in nodes">
            <span class="info-box-icon"><i class="fa-brands fa-docker fa-2xl"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">
                <span class="info-box-title">{{ node.nodeName }}</span>
                <span class="space-left info-box-subtitle">
                  <span class="badge info-box-badge"
                    :class="{ 'bg-success': node.state == 'online', 'bg-danger': node.state != 'online' }">
                    {{ node.state == 'online' ? 'up' : 'down' }}
                  </span>
                  <span class="space-left small text-muted" v-if="node.history.length > 0">{{
                    formatDate(node.history[node.history.length - 1].time)
                  }}</span>
                </span>
              </span>
              <span class="info-box-text">
                <i class="space-right fas fa-th"></i>
                <span>{{ node.currentBatches.length }} Batches</span>
              </span>
              <span class="small text-muted">
                <i class="fa fa-microchip space-right"></i>{{ node.cpus || 0 }} CPU | {{ node.gpus || 0 }} GPU
                <i class="fa fa-memory space-left space-right"></i>{{ node.ram || 0 }} MB
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/services/api'
import shared from '@/services/shared'

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
      },
      nodes: []
    };
  },
  mounted() {
    this.loadStatistics()
    this.loadNodes()
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
    },
    loadNodes() {
      api.get('/nodes').then(res => {
        this.nodes = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    'formatDate': shared.formatDate
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

.info-box-icon {
  font-size: 2.1rem ! important;
  width: 120px !important;
}

.info-box-title {
  font-size: 1em;
  font-weight: 700;
}

.info-box-subtitle {
  font-size: .9em;
  padding-right: 1em;
}

.info-box-badge {
  position: relative;
  top: -2px;
}

.space-left {
  margin-left: 5px;
}

.space-right {
  margin-right: 5px;
}
</style>