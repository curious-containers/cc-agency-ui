<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Input binding</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(value, key) in inputs">
                <td>{{ key }}</td>
                <td>{{ value.inputBinding }}</td>
                <td>{{ value.type }}</td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>

export default {
    props: ['inputs'],
    name: 'InputsTable'
}
</script>
  