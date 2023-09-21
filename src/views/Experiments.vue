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
                <td>{{ experiment._id }}</td>
                <td>{{ experiment.registrationTime }}</td>
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
import axios from 'axios'

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
    console.log("updated")
    this.createDataTable()
  },
  methods: {
    loadExperimentsData() {
      axios.get(process.env.VUE_APP_AGENCY_URL + '/experiments', {
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      }).then(res => {
        this.experiments = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    createDataTable() {
      this.dataTable = $('#experimentsTable').DataTable({
        "paging": true,
        "pageLength": 20,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "order": [[1, 'desc']],
        "info": true,
        "autoWidth": false,
        "responsive": true,
      });
    },

  }
}
</script>
