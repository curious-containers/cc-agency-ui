<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12" v-for="node in nodes">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                {{ node.nodeName }}
              </h3>
            </div>
            <div class="card-body">
              <dl class="row">
                <dt class="col-sm-3">State</dt>
                <dd class="col-sm-9">
                  <span class="badge badge-pill" :class="node.state">{{ node.state }}</span>
                </dd>
                <dt class="col-sm-3">CPUs</dt>
                <dd class="col-sm-9">{{ node.cpus || 0 }}</dd>
                <dt class="col-sm-3">GPUs</dt>
                <dd class="col-sm-9">{{ node.gpus || 0 }}</dd>
                <dt class="col-sm-3">RAM</dt>
                <dd class="col-sm-9">{{ node.ram || 0 }} MB</dd>
                <dt class="col-sm-3">Available RAM</dt>
                <dd class="col-sm-9">{{ availableRam(node) }} MB</dd>
                <dt class="col-sm-3">History</dt>
                <dd class="col-sm-9">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>State</th>
                        <th>Time</th>
                        <th>Debug Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="value in node.history">
                        <td>{{ value.state }}</td>
                        <td>{{ formatDate(value.time) }}</td>
                        <td>{{ value.debugInfo || '-' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </dd>
                <dt class="col-sm-3">Current Batches</dt>
                <dd class="col-sm-9" v-if="node.currentBatches.length > 0">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Batch</th>
                        <th>RAM usage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="value in node.currentBatches">
                        <td>
                          <router-link :to="{ name: 'Batch', params: { id: value.batchId } }">
                            {{ value.batchId }}
                          </router-link>
                        </td>
                        <td>{{ value.ram }}</td>
                      </tr>
                    </tbody>
                  </table>
                </dd>
                <dd class="col-sm-9" v-if="node.currentBatches.length == 0">-</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/services/api'
import moment from 'moment';

export default {
  name: 'Nodes',
  data() {
    return {
      nodes: []
    };
  },
  mounted() {
    this.loadNodes()
  },
  methods: {
    loadNodes() {
      api.get('/nodes').then(res => {
        this.nodes = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    availableRam(node) {
      if (node.currentBatches == 0) {
        return node.ram
      }

      let usedRam = 0
      for (const batch of node.currentBatches) {
        usedRam += batch.ram
      }
      return node.ram - usedRam
    },
    formatDate(millis) {
      let date = new Date(millis * 1000)
      return moment(date).format('YYYY-MM-DD hh:mm:ss')
    }
  }
}
</script>