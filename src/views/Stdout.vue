<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12" v-if="stdout">
          <pre>{{ stdout }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'Stdout',
  data() {
    return {
      stdout: undefined
    };
  },
  mounted() {
    this.loadBatchData()
  },
  methods: {
    loadBatchData() {
      api.get('/batches/' + this.$route.params.id + "/stdout").then(res => {
        this.stdout = res.data
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>