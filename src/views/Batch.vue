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
                <dt class="col-sm-3">ID</dt>
                <dd class="col-sm-9">{{ batch._id }}</dd>
                <dt class="col-sm-3">Experiment ID</dt>
                <dd class="col-sm-9">
                  <router-link :to="{ name: 'Experiment', params: { id: batch.experimentId } }">
                    {{ batch.experimentId }}
                  </router-link>
                </dd>
                <dt class="col-sm-3">Status</dt>
                <dd class="col-sm-9">
                  <span class="badge badge-pill" :class="batch.state">{{ batch.state }}</span>
                </dd>
                <dt class="col-sm-3">Registration Time</dt>
                <dd class="col-sm-9">{{ formatDate(batch.registrationTime) }}</dd>
                <dt class="col-sm-3">Username</dt>
                <dd class="col-sm-9">{{ batch.username }}</dd>
                <dt class="col-sm-3">Node</dt>
                <dd class="col-sm-9">{{ batch.node }}</dd>
                <dt class="col-sm-3">Batches List Index</dt>
                <dd class="col-sm-9">{{ batch.batchesListIndex }}</dd>
                <dt class="col-sm-3">Attempts</dt>
                <dd class="col-sm-9">{{ batch.attempts }}</dd>
                <dt class="col-sm-3">Mount</dt>
                <dd class="col-sm-9">{{ batch.mount }}</dd>
                <dt class="col-sm-3">Notifications sent</dt>
                <dd class="col-sm-9">{{ batch.notificationsSent }}</dd>
                <dt class="col-sm-3">Protected keys voided</dt>
                <dd class="col-sm-9">{{ batch.protectedKeysVoided }}</dd>
                <dt class="col-sm-3" v-if="batch.usedGPUs">GPUs</dt>
                <dd class="col-sm-9" v-if="batch.usedGPUs">{{ batch.usedGPUs }}</dd>
                <dt class="col-sm-3">Used specified Stderr</dt>
                <dd class="col-sm-9">{{ batch.usedSpecifiedStderr }}</dd>
                <dt class="col-sm-3">Used specified Stdout</dt>
                <dd class="col-sm-9">{{ batch.usedSpecifiedStdout }}</dd>
                <dt class="col-sm-3">CLI Stderr</dt>
                <dd class="col-sm-9">{{ batch.cliStderr }}</dd>
                <dt class="col-sm-3">CLI Stdout</dt>
                <dd class="col-sm-9">{{ batch.cliStdout }}</dd>
              </dl>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="ml-2">
                  <div class="red-link" :class="{ 'disabled': isCancelled }" @click="cancelExperiment()">
                    <i class="fa fa-ban space-right"></i>Cancel Experiment
                  </div>
                </div>
                <div class="ml-4">
                  <router-link :to="{ name: 'Batch Stdout', params: { id: batch._id } }"
                    :class="{ 'disabled': hasStdout }">
                    <i class="fa fa-file-lines space-right"></i>Stdout</router-link>
                </div>
                <div class="ml-4">
                  <router-link :to="{ name: 'Batch Stderr', params: { id: batch._id } }"
                    :class="{ 'disabled': hasStderr }">
                    <i class="fa fa-file-circle-exclamation space-right"></i>Stderr</router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                History
              </h3>
            </div>
            <div class="card-body">
              <div v-for="history in batch.history">
                <dl class="row">
                  <dt class="col-sm-3">State</dt>
                  <dd class="col-sm-9">
                    <span class="badge badge-pill" :class="history.state">{{ history.state }}</span>
                  </dd>
                  <dt class="col-sm-3">Time</dt>
                  <dd class="col-sm-9">{{ formatDate(history.time) }}</dd>
                  <dt class="col-sm-3">Node</dt>
                  <dd class="col-sm-9">{{ history.node ? history.node : '-' }}</dd>
                  <dt class="col-sm-3">Debug Info</dt>
                  <dd class="col-sm-9">{{ history.debugInfo ? history.debugInfo : '-' }}</dd>
                  <dt class="col-sm-12" v-if="history.ccagent">CCAgent</dt>
                  <dt class="col-sm-3 set-in" v-if="history.ccagent">Command</dt>
                  <dd class="col-sm-9 set-in" v-if="history.ccagent">{{ history.ccagent.command }}</dd>
                  <dt class="col-sm-3 set-in" v-if="history.ccagent">Debug Info</dt>
                  <dd class="col-sm-9 set-in" v-if="history.ccagent && history.ccagent.debugInfo != null">
                    <p class="no-margin" v-for="line in history.ccagent.debugInfo">{{ line }}</p>
                  </dd>
                  <dd class="col-sm-9 set-in" v-if="history.ccagent && history.ccagent.debugInfo == null">-</dd>
                  <dt class="col-sm-3 set-in" v-if="history.ccagent">Inputs</dt>
                  <dd class="col-sm-9 set-in"
                    v-if="history.ccagent && history.ccagent.inputs !== null && Object.keys(history.ccagent.inputs).length > 0">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Class</th>
                          <th>Path</th>
                          <th>Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(value, key) in history.ccagent.inputs">
                          <td>{{ key }}</td>
                          <td>{{ value.class }}</td>
                          <td>{{ value.path }}</td>
                          <td>{{ value.size }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </dd>
                  <dd class="col-sm-9 set-in"
                    v-if="history.ccagent && (history.ccagent.inputs == null || Object.keys(history.ccagent.inputs).length == 0)">
                    -</dd>
                  <dt class="col-sm-3 set-in" v-if="history.ccagent">Outputs</dt>
                  <dd class="col-sm-9 set-in" v-if="history.ccagent && history.ccagent.outputs !== null">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Class</th>
                          <th>Path</th>
                          <th>Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(value, key) in history.ccagent.outputs">
                          <td>{{ key }}</td>
                          <td>{{ value.class }}</td>
                          <td>{{ value.path }}</td>
                          <td>{{ value.size }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </dd>
                  <dd class="col-sm-9 set-in" v-if="history.ccagent && history.ccagent.outputs == null">-</dd>
                  <dt class="col-sm-3 set-in" v-if="history.ccagent">Process executed</dt>
                  <dd class="col-sm-9 set-in" v-if="history.ccagent">{{ history.ccagent.process.executed ?
                    history.ccagent.process.executed : '-' }}</dd>
                  <dt class="col-sm-3 set-in" v-if="history.ccagent">Process returnCode</dt>
                  <dd class="col-sm-9 set-in" v-if="history.ccagent">{{ history.ccagent.process.returnCode ?
                    history.ccagent.process.returnCode : '-' }}</dd>
                  <dt class="col-sm-3 set-in" v-if="history.ccagent">Process stderr</dt>
                  <dd class="col-sm-9 set-in" v-if="history.ccagent">{{ history.ccagent.process.stderr ?
                    history.ccagent.process.stderr : '-' }}</dd>
                  <dt class="col-sm-3 set-in" v-if="history.ccagent">Process stdout</dt>
                  <dd class="col-sm-9 set-in" v-if="history.ccagent">{{ history.ccagent.process.stdout ?
                    history.ccagent.process.stdout : '-' }}</dd>
                  <dt class="col-sm-3 set-in" v-if="history.ccagent">State</dt>
                  <dd class="col-sm-9 set-in" v-if="history.ccagent">
                    <span class="badge badge-pill" :class="history.state">{{ history.ccagent.state }}</span>
                  </dd>
                </dl>
                <hr>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                Batch Inputs
              </h3>
            </div>
            <div class="card-body">
              <div v-for="(input, key) in  batch.inputs ">
                <div v-if="Array.isArray(input)">
                  <div v-for="arrayInput in input">
                    <dl class="row">
                      <dt class="col-sm-3">Basename</dt>
                      <dd class="col-sm-9">{{ arrayInput.basename }}</dd>
                      <dt class="col-sm-3">Class</dt>
                      <dd class="col-sm-9">{{ arrayInput.class }}</dd>
                      <dt class="col-sm-3">Path</dt>
                      <dd class="col-sm-9">{{ arrayInput.path }}</dd>
                      <dt class="col-sm-3">Connector command</dt>
                      <dd class="col-sm-9">{{ arrayInput.connector.command }}</dd>
                      <dt class="col-sm-3">Connector access</dt>
                      <dd class="col-sm-9">{{ arrayInput.connector.access }}</dd>
                    </dl>
                  </div>
                </div>
                <div v-if="typeof input === 'object' && !Array.isArray(input)">
                  <dl class="row">
                    <dt class="col-sm-3">Basename</dt>
                    <dd class="col-sm-9">{{ input.basename }}</dd>
                    <dt class="col-sm-3">Class</dt>
                    <dd class="col-sm-9">{{ input.class }}</dd>
                    <dt class="col-sm-3">Dirname</dt>
                    <dd class="col-sm-9">{{ input.dirname }}</dd>
                    <dt class="col-sm-3">Path</dt>
                    <dd class="col-sm-9">{{ input.path }}</dd>
                    <dt class="col-sm-3">Name ext</dt>
                    <dd class="col-sm-9">{{ input.nameext ? input.nameext : "-" }}</dd>
                    <dt class="col-sm-3">Name root</dt>
                    <dd class="col-sm-9">{{ input.nameroot }}</dd>
                    <dt class="col-sm-3">Connector command</dt>
                    <dd class="col-sm-9">{{ input.connector.command }}</dd>
                    <dt class="col-sm-3">Connector access</dt>
                    <dd class="col-sm-9">{{ input.connector.access }}</dd>
                  </dl>
                </div>
                <div v-if="typeof input !== 'object'">
                  <dl class="row">
                    <dt class="col-sm-3">Basename</dt>
                    <dd class="col-sm-9">{{ key }}</dd>
                    <dt class="col-sm-3">Value</dt>
                    <dd class="col-sm-9">{{ input }}</dd>
                  </dl>
                </div>
                <hr>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                Batch Outputs
              </h3>
            </div>
            <div class="card-body">
              <div v-for="( output, key ) in  batch.outputs" v-if="Object.keys(batch.outputs).length > 0">
                <dl class="row">
                  <dt class="col-sm-3">Basename</dt>
                  <dd class="col-sm-9">{{ key }}</dd>
                  <dt class="col-sm-3">Class</dt>
                  <dd class="col-sm-9">{{ output.class }}</dd>
                  <dt class="col-sm-3">Connector command</dt>
                  <dd class="col-sm-9">{{ output.connector.command }}</dd>
                  <dt class="col-sm-3">Connector access</dt>
                  <dd class="col-sm-9">{{ output.connector.access }}</dd>
                </dl>
                <hr>
              </div>
              <div v-if="Object.keys(batch.outputs).length == 0">No Outputs defined.</div>
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
  computed: {
    isCancelled() {
      if (this.batch) {
        return this.batch.state == 'cancelled' || this.batch.state == 'succeeded' || this.batch.state == 'failed'
      }
      return false
    },
    hasStdout() {
      return !(this.batch.usedSpecifiedStdout || this.batch.state == 'failed')
    },
    hasStderr() {
      return !(this.batch.usedSpecifiedStderr || this.batch.state == 'failed')
    }
  },
  methods: {
    loadBatchData() {
      api.get('/batches/' + this.$route.params.id).then(res => {
        this.batch = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    cancelExperiment() {
      api.delete('/batches/' + this.$route.params.id).then(res => {
        this.batch = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    formatDate(millis) {
      let date = new Date(millis * 1000)
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>