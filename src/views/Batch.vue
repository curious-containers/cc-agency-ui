<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-lg-12" v-if="batch">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                Batch status
              </h3>
            </div>
            <div class="card-body">
              <dl class="row">
                <dt class="col-sm-4">ID</dt>
                <dd class="col-sm-8">{{ batch._id }}</dd>
                <dt class="col-sm-4">Experiment ID</dt>
                <dd class="col-sm-8">{{ batch.experimentId }}</dd>
                <dt class="col-sm-4">Status</dt>
                <dd class="col-sm-8">
                  <span class="badge badge-pill" :class="batch.state">{{ batch.state }}</span>
                </dd>
                <dt class="col-sm-4">Registration Time</dt>
                <dd class="col-sm-8">{{ formatDate(batch.registrationTime) }}</dd>
                <dt class="col-sm-4">Username</dt>
                <dd class="col-sm-8">{{ batch.username }}</dd>
                <dt class="col-sm-4">Node</dt>
                <dd class="col-sm-8">{{ batch.node }}</dd>
                <dt class="col-sm-4">Batches List Index</dt>
                <dd class="col-sm-8">{{ batch.batchesListIndex }}</dd>
                <dt class="col-sm-4">Attempts</dt>
                <dd class="col-sm-8">{{ batch.attempts }}</dd>
                <dt class="col-sm-4">Mount</dt>
                <dd class="col-sm-8">{{ batch.mount }}</dd>
                <dt class="col-sm-4">Notifications sent</dt>
                <dd class="col-sm-8">{{ batch.notificationsSent }}</dd>
                <dt class="col-sm-4">Protected keys voided</dt>
                <dd class="col-sm-8">{{ batch.protectedKeysVoided }}</dd>
                <dt class="col-sm-4">Used specified Stderr</dt>
                <dd class="col-sm-8">{{ batch.usedSpecifiedStderr }}</dd>
                <dt class="col-sm-4">Used specified Stdout</dt>
                <dd class="col-sm-8">{{ batch.usedSpecifiedStdout }}</dd>
                <dt class="col-sm-4">CLI Stderr</dt>
                <dd class="col-sm-8">{{ batch.cliStderr }}</dd>
                <dt class="col-sm-4">CLI Stdout</dt>
                <dd class="col-sm-8">{{ batch.cliStdout }}</dd>
              </dl>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                History
              </h3>
            </div>
            <div class="card-body">
              <dl class="row">

              </dl>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                Batch Inputs
              </h3>
            </div>
            <div class="card-body">
              <dl class="row">

              </dl>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                Batch Outputs
              </h3>
            </div>
            <div class="card-body">
              <dl class="row">

              </dl>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                Batch GPUs (?)
              </h3>
            </div>
            <div class="card-body">
              <dl class="row">

              </dl>
            </div>
          </div>

          <div class="col-lg-12" v-if="!batch">
            <p>Could not load Batch with ID: {{ $route.params.id }}</p>
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
  name: 'Batch',
  data() {
    return {
      batch: undefined
    };
  },
  mounted() {
    this.loadBatchData()
  },
  methods: {
    loadBatchData() {
      api.get('/batches/' + this.$route.params.id).then(res => {
        this.batch = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    formatDate(millis) {
      let date = new Date(millis * 1000)
      return moment(date).format('YYYY-MM-DD hh:mm:ss')
    }
  }
}
</script>