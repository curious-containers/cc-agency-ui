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
            <tr v-for="(value, key) in outputs">
                <td>{{ key }}</td>
                <td>{{ value.outputBinding }}</td>
                <td>{{ value.type }}</td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>

export default {
    props: ['outputs'],
    name: 'OutputsTable'
}
</script>
  