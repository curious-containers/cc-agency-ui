<template>
  <nav aria-label="breadcrumb" v-if="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" v-for="(item, index) in breadcrumb">
        <router-link :to="{ name: item.name }" exact>
          {{ item.name }}
        </router-link>
      </li>
      <li class="breadcrumb-item active">{{ lastBreadcrumb.name }}
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: ['items'],
  name: 'Breadcrumb',
  computed: {
    breadcrumb() {
      if (this.$route.meta.breadcrumb) {
        return this.$route.meta.breadcrumb.slice(0, this.$route.meta.breadcrumb.length - 1)
      } else {
        return undefined
      }
    },
    lastBreadcrumb() {
      if (this.$route.meta.breadcrumb) {
        return this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length - 1]
      } else {
        return undefined
      }
    }
  }
}
</script>


<style scoped>
a.router-link-active {
  color: #007bff !important;
}

nav {
  padding: 0px;
  padding-left: 0px !important;
}
</style>