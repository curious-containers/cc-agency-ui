<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-lg-12">
          <table id="batchesTable" class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>State</th>
                <th>Registration Time</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="batch in batches">
                <td>
                  <router-link :to="{ name: 'Batch', params: { id: batch._id } }">
                    {{ batch._id }}
                  </router-link>
                </td>
                <td>
                  <span class="badge badge-pill" :class="batch.state">{{ batch.state }}</span>
                </td>
                <td>{{ formatDate(batch.registrationTime) }}</td>
                <td>{{ batch.username }}</td>
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
  name: 'Batches',
  data() {
    return {
      batches: undefined,
      dataTable: undefined
    };
  },
  mounted() {
    this.loadBatchesData()
  },
  updated() {
    this.createDataTable()
  },
  methods: {
    loadBatchesData() {
      api.get('/batches').then(res => {
        this.batches = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    createDataTable() {
      this.dataTable = $('#batchesTable').DataTable({
        "paging": true,
        "pageLength": 25,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "order": [[2, 'desc']],
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