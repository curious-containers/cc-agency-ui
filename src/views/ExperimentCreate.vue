<template>
    <section class="content">
        <div class="container-fluid">
            <div class="row">

                <div class="col-lg-12" v-if="schemaRed">

                    <div class="card">
                        <div class="card-body">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">RED Version</label>
                                <div class="col-sm-8">
                                    <select class="form-control" v-model="form.redVersion" required>
                                        <option :value="version" v-for="version in schemaRed.definitions.redVersion.enum">
                                            {{ version }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">CWL Version</label>
                                <div class="col-sm-8">
                                    <select class="form-control" v-model="form.cli.cwlVersion" required>
                                        <option :value="version"
                                            v-for="version in schemaRed.definitions.cli.properties.cwlVersion.enum">
                                            {{ version }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">CLI Class</label>
                                <div class="col-sm-8">
                                    <select class="form-control" v-model="form.cli.class" required>
                                        <option :value="version"
                                            v-for="version in schemaRed.definitions.cli.properties.class.enum">
                                            {{ version }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Base Command</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="form.cli.baseCommand"
                                        placeholder="python">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Stdout</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="form.cli.stdout"
                                        placeholder="stdout.txt">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Stderr</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="form.cli.stderr"
                                        placeholder="stderr.txt">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                Container Settings
                            </h3>
                        </div>
                        <div class="card-body" v-if="schemaContainerEngines">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Engine</label>
                                <div class="col-sm-8">
                                    <select class="form-control" v-model="form.container.engine" required>
                                        <option :value="engine" v-for="engine in Object.keys(schemaContainerEngines)">
                                            {{ engine }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Image</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="form.container.image.url"
                                        placeholder="dprobst/curious_containers:python">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Image Authentification</label>
                                <div class="col-sm-8">
                                    <input type="checkbox" class="form-check-input"
                                        v-model="form.container.image.auth.enable">
                                </div>
                            </div>
                            <div class="form-group row" v-if="form.container.image.auth.enable">
                                <label class="col-sm-2 col-form-label">Image Username</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="form.container.image.auth.username">
                                </div>
                            </div>
                            <div class="form-group row" v-if="form.container.image.auth.enable">
                                <label class="col-sm-2 col-form-label">Image Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control"
                                        v-model="form.container.image.auth.password">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">RAM (MB)</label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control"
                                        :min="schemaContainerEngines[form.container.engine].definitions.ram.minimum"
                                        v-model="form.container.ram" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Add GPUs</label>
                                <div class="col-sm-8">
                                    <input type="checkbox" class="form-check-input" v-model="form.container.gpus.enable">
                                </div>
                            </div>
                            <div class="form-group row" v-if="form.container.gpus.enable">
                                <label class="col-sm-2 col-form-label">Number of GPUs</label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" min="1" v-model="form.container.gpus.count"
                                        required>
                                </div>
                            </div>
                            <div class="form-group row" v-if="form.container.gpus.enable">
                                <label class="col-sm-2 col-form-label">GPU Vendor</label>
                                <div class="col-sm-8">
                                    <select class="form-control" v-model="form.container.gpus.vendor" required>
                                        <option :value="vendor"
                                            v-for="vendor in schemaContainerEngines[form.container.engine].definitions.vendors.enum">
                                            {{ vendor }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row" v-if="form.container.gpus.enable">
                                <label class="col-sm-2 col-form-label">Minimal VRAM (MB)</label>
                                <div class="col-sm-8">
                                    <input type="number" class="form-control"
                                        :min="schemaContainerEngines[form.container.engine].definitions.ram.minimum"
                                        v-model="form.container.gpus.vramMin">
                                </div>
                            </div>
                        </div>
                        <div class="card-body" v-if="!schemaContainerEngines">
                            Error: Could not load Container Engines Schema
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                Inputs
                            </h3>
                        </div>
                        <div class="card-body">

                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                Outputs
                            </h3>
                        </div>
                        <div class="card-body">

                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                RED String
                            </h3>
                        </div>
                        <div class="card-body">

                        </div>
                    </div>
                </div>


                <div class="col-lg-12" v-if="!schemaRed">
                    <p>Error: Could not load RED Schema</p>
                </div>

            </div>
        </div>
    </section>
</template>
  
<script>
import api from '@/services/api'

export default {
    name: 'Experiment',
    data() {
        return {
            form: {
                redVersion: undefined,
                cli: {
                    cwlVersion: undefined,
                    class: undefined,
                    baseCommand: undefined,
                    stdout: undefined,
                    stderr: undefined

                },
                container: {
                    engine: undefined,
                    image: {
                        url: undefined,
                        auth: {
                            enable: false,
                            username: undefined,
                            password: undefined
                        }
                    },
                    ram: undefined,
                    gpus: {
                        enable: false,
                        count: 1,
                        vendor: undefined,
                        vramMin: undefined
                    }
                }
            },
            schemaRed: undefined,
            schemaContainerEngines: undefined
        };
    },
    mounted() {
        this.loadSchemas()
    },
    methods: {
        async loadSchemas() {
            try {
                const [redResponse, containerEnginesResponse] = await Promise.all([
                    api.get('/schema/red'),
                    api.get('/schema/engines/container'),
                ]);

                this.schemaRed = redResponse.data;
                this.schemaContainerEngines = containerEnginesResponse.data;

                this.showDefaultValues();
            } catch (error) {
                console.error(error);
            }
        },
        showDefaultValues() {
            if (this.schemaRed) {
                this.form.redVersion = this.schemaRed.definitions.redVersion.enum[0]
                this.form.cli.cwlVersion = this.schemaRed.definitions.cli.properties.cwlVersion.enum[0]
                this.form.cli.class = this.schemaRed.definitions.cli.properties.class.enum[0]
            }
            if (this.schemaContainerEngines) {
                this.form.container.engine = Object.keys(this.schemaContainerEngines)[0]
                this.form.container.ram = this.schemaContainerEngines[this.form.container.engine].definitions.ram.minimum
                this.form.container.gpus.vendor = this.schemaContainerEngines[this.form.container.engine].definitions.vendors.enum[0]
                this.form.container.gpus.vramMin = this.schemaContainerEngines[this.form.container.engine].definitions.ram.minimum
            }
        }
    }
}
</script>

<style scoped>
.form-check-input {
    margin-left: 1rem;
    position: relative;
    vertical-align: middle;
}
</style>