<template>
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">{{ title }}</h1>
        </div>
        <div class="col-sm-6">
          <ol class="float-sm-right">
            <p>
              <i class="fa-solid fa-user" />
              {{ $store.state.user }}
            </p>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['title'],
  name: 'Header'
}
</script>
