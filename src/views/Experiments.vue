<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-lg-12">
          <table id="experimentsTable" class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Registration Time</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="experiment in experiments">
                <td>
                  <router-link :to="{ name: 'Experiment', params: { id: experiment._id } }">
                    {{ experiment._id }}
                  </router-link>
                </td>
                <td>{{ formatDate(experiment.registrationTime) }}</td>
                <td>{{ experiment.username }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/services/api'
import moment from 'moment';

export default {
  name: 'Experiments',
  data() {
    return {
      experiments: undefined,
      dataTable: undefined
    };
  },
  mounted() {
    this.loadExperimentsData()
  },
  updated() {
    this.createDataTable()
  },
  methods: {
    loadExperimentsData() {
      api.get('/experiments').then(res => {
        this.experiments = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    createDataTable() {
      this.dataTable = $('#experimentsTable').DataTable({
        "paging": true,
        "pageLength": 25,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "order": [[1, 'desc']],
        "info": true,
        "autoWidth": false,
        "responsive": true,
      });
    },
    formatDate(millis) {
      let date = new Date(millis * 1000)
      return moment(date).format('YYYY-MM-DD hh:mm:ss')
    }
  }
}
</script>
