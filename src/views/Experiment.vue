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

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                Experiment CLI
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
                <dd class="col-sm-8">{{ experiment.cli.inputs }}</dd>
                <dt class="col-sm-4">outputs</dt>
                <dd class="col-sm-8">{{ experiment.cli.outputs }}</dd>
                <dt class="col-sm-4" v-if="experiment.cli.stdout">stdout</dt>
                <dd class="col-sm-8" v-if="experiment.cli.stdout">{{ experiment.cli.stdout }}</dd>
                <dt class="col-sm-4" v-if="experiment.cli.stderr">stderr</dt>
                <dd class="col-sm-8" v-if="experiment.cli.stderr">{{ experiment.cli.stderr }}</dd>
                <dt class="col-sm-4" v-if="experiment.cli.doc">doc</dt>
                <dd class="col-sm-8" v-if="experiment.cli.doc">{{ experiment.cli.doc }}</dd>
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
import moment from 'moment';

export default {
  name: 'Experiment',
  data() {
    return {
      experiment: undefined
    };
  },
  mounted() {
    this.loadExperimentData()
  },
  methods: {
    loadExperimentData() {
      api.get('/experiments/' + this.$route.params.id).then(res => {
        this.experiment = res.data
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
