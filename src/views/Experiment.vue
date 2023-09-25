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
                <dt class="col-sm-4">baseCommand</dt>
                <dd class="col-sm-8">{{ experiment.cli.baseCommand }}</dd>
                <dt class="col-sm-4">baseCommand</dt>
                <dd class="col-sm-8">{{ experiment.cli.baseCommand }}</dd>
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
import axios from 'axios'
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
      axios.get(process.env.VUE_APP_AGENCY_URL + '/experiments/' + this.$route.params.id, {
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      }).then(res => {
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
