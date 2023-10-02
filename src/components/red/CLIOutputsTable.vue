<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Output binding</th>
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
    name: 'CLIOutputsTable'
}
</script>

<style scoped>
td:first-child {
    width: 25%;
}

td:nth-child(2) {
    width: 55%;
}

td:last-child {
    width: 20%;
}
</style>