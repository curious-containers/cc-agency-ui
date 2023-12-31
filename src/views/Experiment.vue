<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-lg-12" v-if="experiment">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                Experiment status
              </h3>
            </div>
            <div class="card-body">
              <dl class="row">
                <dt class="col-sm-4">ID</dt>
                <dd class="col-sm-8">{{ experiment._id }}</dd>
                <dt class="col-sm-4">State</dt>
                <dd class="col-sm-8">
                  <span class="badge badge-pill" :class="experimentState">{{ experimentState }}</span>
                </dd>
                <dt class="col-sm-4">Protected keys voided</dt>
                <dd class="col-sm-8">{{ experiment.protectedKeysVoided }}</dd>
                <dt class="col-sm-4">RED version</dt>
                <dd class="col-sm-8">{{ experiment.redVersion }}</dd>
                <dt class="col-sm-4">Registration Time</dt>
                <dd class="col-sm-8">{{ formatDate(experiment.registrationTime) }}</dd>
                <dt class="col-sm-4">Username</dt>
                <dd class="col-sm-8">{{ experiment.username }}</dd>
              </dl>
            </div>
          </div>

          <div class="card" v-if="batches.length > 0">
            <div class="card-header">
              <h3 class="card-title">
                Batches
              </h3>
            </div>
            <div class="card-body">
              <dl class="row" v-for="batch in batches">
                <dt class="col-sm-4">
                  <router-link :to="{ name: 'Batch', params: { id: batch._id } }">
                    {{ batch.experimentId }}
                  </router-link>
                </dt>
                <dd class="col-sm-8">
                  <span class="badge badge-pill" :class="batch.state">{{ batch.state }}</span>
                </dd>
              </dl>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                CLI
              </h3>
            </div>
            <div class="card-body">
              <dl class="row">
                <dt class="col-sm-4">baseCommand</dt>
                <dd class="col-sm-8">{{ experiment.cli.baseCommand }}</dd>
                <dt class="col-sm-4">class</dt>
                <dd class="col-sm-8">{{ experiment.cli.class }}</dd>
                <dt class="col-sm-4">cwlVersion</dt>
                <dd class="col-sm-8">{{ experiment.cli.cwlVersion }}</dd>
                <dt class="col-sm-4">inputs</dt>
                <dd class="col-sm-8">
                  <CLIInputsTable :inputs="experiment.cli.inputs" />
                </dd>
                <dt class="col-sm-4">outputs</dt>
                <dd class="col-sm-8">
                  <CLIOutputsTable :outputs="experiment.cli.outputs"
                    v-if="Object.keys(experiment.cli.outputs).length > 0" />
                  <div v-if="Object.keys(experiment.cli.outputs).length == 0">-</div>
                </dd>
                <dt class="col-sm-4" v-if="experiment.cli.stdout">stdout</dt>
                <dd class="col-sm-8" v-if="experiment.cli.stdout">{{ experiment.cli.stdout }}</dd>
                <dt class="col-sm-4" v-if="experiment.cli.stderr">stderr</dt>
                <dd class="col-sm-8" v-if="experiment.cli.stderr">{{ experiment.cli.stderr }}</dd>
                <dt class="col-sm-4" v-if="experiment.cli.doc">doc</dt>
                <dd class="col-sm-8" v-if="experiment.cli.doc">{{ experiment.cli.doc }}</dd>
              </dl>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                Experiment Container
              </h3>
            </div>
            <div class="card-body">
              <dl class="row">
                <dt class="col-sm-4">Engine</dt>
                <dd class="col-sm-8">{{ experiment.container.engine }}</dd>
                <dt class="col-sm-4">Image url</dt>
                <dd class="col-sm-8">{{ experiment.container.settings.image.url }}</dd>
                <dt class="col-sm-4">RAM</dt>
                <dd class="col-sm-8">{{ experiment.container.settings.ram }}</dd>
              </dl>
            </div>
          </div>

          <div class="card" v-if="experiment.execution">
            <div class="card-header">
              <h3 class="card-title">
                Execution
              </h3>
            </div>
            <div class="card-body">
              <dl class="row">
                <dt class="col-sm-4">Engine</dt>
                <dd class="col-sm-8">{{ experiment.execution.engine }}</dd>
                <dt class="col-sm-4">disable connector validation</dt>
                <dd class="col-sm-8">{{ experiment.execution.settings.disableConnectorValidation }}</dd>
                <dt class="col-sm-4">retry if failed</dt>
                <dd class="col-sm-8">{{ experiment.execution.settings.retryIfFailed }}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="col-lg-12" v-if="!experiment">
          <p>Could not load Experiment with ID: {{ $route.params.id }}</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import api from '@/services/api'
import shared from '@/services/shared'

import CLIInputsTable from '@/components/red/CLIInputsTable.vue'
import CLIOutputsTable from '@/components/red/CLIOutputsTable.vue'

export default {
  name: 'Experiment',
  components: {
    CLIInputsTable, CLIOutputsTable
  },
  data() {
    return {
      experiment: undefined,
      batches: []
    };
  },
  mounted() {
    this.loadExperimentData()
    this.loadExperimentBatches()
  },
  computed: {
    experimentState() {
      return shared.experimentState(this.batches)
    },
  },
  methods: {
    loadExperimentData() {
      api.get('/experiments/' + this.$route.params.id).then(res => {
        this.experiment = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    loadExperimentBatches() {
      api.get('/batches?experimentId=' + this.$route.params.id).then(res => {
        this.batches = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    'formatDate': shared.formatDate
  }
}
</script>