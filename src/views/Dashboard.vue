<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">

        <div class="col-lg-6">
          <router-link :to="{ name: 'Experiments' }">
            <div class="card">
              <div class="card-body">
                Experiments
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-6">
          <router-link :to="{ name: 'Batches' }">
            <div class="card">
              <div class="card-body">
                Batches
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              Connector
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              Images
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              Cloud
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import Experiments from '@/views/Experiments.vue'
import Batches from '@/views/Batches.vue'

export default {
  components: {
    Experiments, Batches
  },
  name: 'Dashboard'
}
</script>
