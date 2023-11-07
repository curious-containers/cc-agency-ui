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

                            <div class="margin-l-1r">
                                <div class="form-group row" v-if="form.container.image.auth.enable">
                                    <label class="col-sm-2 col-form-label">Username</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control"
                                            v-model="form.container.image.auth.username">
                                    </div>
                                </div>
                                <div class="form-group row" v-if="form.container.image.auth.enable">
                                    <label class="col-sm-2 col-form-label">Password</label>
                                    <div class="col-sm-8">
                                        <input type="password" class="form-control"
                                            v-model="form.container.image.auth.password">
                                    </div>
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
                            <div v-for="(input, index) in form.inputs">
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">{{ index + 1 }}. Input</label>
                                    <div class="col-sm-8">
                                        <i class="fa-solid fa-trash fa-red form-text-align remove-form"
                                            @click="removeInputForm(index)"></i>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Name</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" v-model="input.name" placeholder="script"
                                            required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">CLI Type</label>
                                    <div class="col-sm-8">
                                        <select class="form-control" v-model="input.type" required>
                                            <option :value="className"
                                                v-for="className in schemaRed.definitions.cli.properties.inputs.patternProperties['^[a-zA-Z0-9_-]+$'].properties.type.enum">
                                                {{ className }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Class</label>
                                    <div class="col-sm-8">
                                        <input type="radio" :id="'radioInputClassFile_' + index" class="form-check-input"
                                            value="File" v-model="input.class" checked>
                                        <label class="form-check-label" :for="'radioInputClassFile_' + index">File</label>
                                        <input type="radio" :id="'radioInputClassDirectory_' + index"
                                            class="form-check-input" value="Directory" v-model="input.class">
                                        <label class="form-check-label"
                                            :for="'radioInputClassDirectory_' + index">Directory</label>
                                        <input type="radio" :id="'radioInputClassString_' + index" class="form-check-input"
                                            value="string" v-model="input.class">
                                        <label class="form-check-label"
                                            :for="'radioInputClassString_' + index">String</label>
                                        <input type="radio" :id="'radioInputClassNumber_' + index" class="form-check-input"
                                            value="number" v-model="input.class">
                                        <label class="form-check-label"
                                            :for="'radioInputClassNumber_' + index">Number</label>
                                        <input type="radio" :id="'radioInputClassBoolean_' + index" class="form-check-input"
                                            value="boolean" v-model="input.class">
                                        <label class="form-check-label"
                                            :for="'radioInputClassBoolean_' + index">Boolean</label>
                                    </div>
                                </div>
                                <div class="margin-l-1r" v-if="input.class === 'File' || input.class === 'Directory'">
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Connector</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="input.connector.command"
                                                placeholder="red-connector-http" required>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Hostname</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="input.connector.host"
                                                placeholder="https://example.com/file" required>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Port</label>
                                        <div class="col-sm-8">
                                            <input type="number" class="form-control" min="0" max="65535"
                                                v-model="input.connector.port">
                                        </div>
                                    </div>
                                    <div class="form-group row" v-if="input.class === 'File'">
                                        <label class="col-sm-2 col-form-label">File Path</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="input.connector.filePath"
                                                placeholder="/home/username/files/data.csv">
                                        </div>
                                    </div>
                                    <div class="form-group row" v-if="input.class === 'Directory'">
                                        <label class="col-sm-2 col-form-label">Directory Path</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="input.connector.dirPath"
                                                placeholder="/home/username/files">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Authentification</label>
                                        <div class="col-sm-8">
                                            <input type="radio" :id="'radioInputAuthPassword_' + index"
                                                class="form-check-input" value="password"
                                                v-model="input.connector.auth.method" checked>
                                            <label class="form-check-label"
                                                :for="'radioInputAuthPassword_' + index">Password</label>
                                            <input type="radio" :id="'radioInputAuthKey_' + index" class="form-check-input"
                                                value="key" v-model="input.connector.auth.method">
                                            <label class="form-check-label" :for="'radioInputAuthKey_' + index">SSH
                                                Key</label>
                                        </div>
                                    </div>
                                    <div class="margin-l-1r">
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Username</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"
                                                    v-model="input.connector.auth.username" required>
                                            </div>
                                        </div>
                                        <div class="form-group row" v-if="input.connector.auth.method === 'password'">
                                            <label class="col-sm-2 col-form-label">Password</label>
                                            <div class="col-sm-8">
                                                <input type="password" class="form-control"
                                                    v-model="input.connector.auth.password" required>
                                            </div>
                                        </div>
                                        <div class="form-group row" v-if="input.connector.auth.method === 'key'">
                                            <label class="col-sm-2 col-form-label">Private Key</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"
                                                    v-model="input.connector.auth.privateKey" required>
                                            </div>
                                        </div>
                                        <div class="form-group row" v-if="input.connector.auth.method === 'key'">
                                            <label class="col-sm-2 col-form-label">Passphrase</label>
                                            <div class="col-sm-8">
                                                <input type="password" class="form-control"
                                                    v-model="input.connector.auth.passphrase">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row"
                                    v-if="input.class === 'string' || input.class === 'number' || input.class === 'boolean'">
                                    <label class="col-sm-2 col-form-label">Value</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" v-model="input.value"
                                            v-if="input.class === 'string'" required>
                                        <input type="number" class="form-control" v-model="input.value"
                                            v-if="input.class === 'number'" required>
                                        <input type="checkbox" class="form-check-input" v-model="input.value"
                                            v-if="input.class === 'boolean'" required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Input Position</label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" min="0"
                                            v-model="input.inputBinding.position">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Prefix</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" v-model="input.inputBinding.prefix">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Seperate</label>
                                    <div class="col-sm-8">
                                        <input type="checkbox" class="form-check-input"
                                            v-model="input.inputBinding.seperate">
                                    </div>
                                </div>
                                <div class="form-group row" v-if="input.inputBinding.seperate">
                                    <label class="col-sm-2 col-form-label">Item Seperator</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" v-model="input.inputBinding.itemSeperator">
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <p class="add-form" @click="addInputForm()">
                                <i class="fa-solid fa-square-plus fa-xl fa-green icon-text-sep"></i>
                                Add Input
                            </p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                Outputs
                            </h3>
                        </div>
                        <div class="card-body">
                            <div v-for="(output, index) in form.outputs">
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">{{ index + 1 }}. Output</label>
                                    <div class="col-sm-8">
                                        <i class="fa-solid fa-trash fa-red form-text-align remove-form"
                                            @click="removeOutputForm(index)"></i>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Name</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" v-model="output.name" placeholder="result"
                                            required>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">CLI Type</label>
                                    <div class="col-sm-8">
                                        <select class="form-control" v-model="output.type" required>
                                            <option :value="className" v-for="className in output.types">
                                                {{ className }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">Class</label>
                                    <div class="col-sm-8">
                                        <input type="radio" :id="'radioOutputClassFile_' + index" class="form-check-input"
                                            value="File" v-model="output.class" checked>
                                        <label class="form-check-label" :for="'radioOutputClassFile_' + index">File</label>
                                        <input type="radio" :id="'radioOutputClassDirectory_' + index"
                                            class="form-check-input" value="Directory" v-model="output.class">
                                        <label class="form-check-label"
                                            :for="'radioOutputClassDirectory_' + index">Directory</label>
                                        <input type="radio" :id="'radioOutputClassStdout_' + index" class="form-check-input"
                                            value="stdout" v-model="output.class">
                                        <label class="form-check-label"
                                            :for="'radioOutputClassStdout_' + index">Stdout</label>
                                        <input type="radio" :id="'radioOutputClassStderr_' + index" class="form-check-input"
                                            value="stderr" v-model="output.class">
                                        <label class="form-check-label"
                                            :for="'radioOutputClassStderr_' + index">Stderr</label>
                                    </div>
                                </div>
                                <div class="margin-l-1r">
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Connector</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="output.connector.command"
                                                placeholder="red-connector-http" required>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Hostname</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="output.connector.host"
                                                placeholder="https://example.com/result" required>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Port</label>
                                        <div class="col-sm-8">
                                            <input type="number" class="form-control" min="0" max="65535"
                                                v-model="output.connector.port">
                                        </div>
                                    </div>
                                    <div class="form-group row"
                                        v-if="output.class === 'File' || output.class === 'stdout' || output.class === 'stderr'">
                                        <label class="col-sm-2 col-form-label">File Path</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="output.connector.filePath"
                                                placeholder="/home/username/files/data.csv">
                                        </div>
                                    </div>
                                    <div class="form-group row" v-if="output.class === 'Directory'">
                                        <label class="col-sm-2 col-form-label">Directory Path</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model="output.connector.dirPath"
                                                placeholder="/home/username/files">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Authentification</label>
                                        <div class="col-sm-8">
                                            <input type="radio" :id="'radioOutputAuthPassword_' + index"
                                                class="form-check-input" value="password"
                                                v-model="output.connector.auth.method" checked>
                                            <label class="form-check-label"
                                                :for="'radioOutputAuthPassword_' + index">Password</label>
                                            <input type="radio" :id="'radioOutputAuthKey_' + index" class="form-check-input"
                                                value="key" v-model="output.connector.auth.method">
                                            <label class="form-check-label" :for="'radioOutputAuthKey_' + index">SSH
                                                Key</label>
                                        </div>
                                    </div>
                                    <div class="margin-l-1r">
                                        <div class="form-group row">
                                            <label class="col-sm-2 col-form-label">Username</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"
                                                    v-model="output.connector.auth.username" required>
                                            </div>
                                        </div>
                                        <div class="form-group row" v-if="output.connector.auth.method === 'password'">
                                            <label class="col-sm-2 col-form-label">Password</label>
                                            <div class="col-sm-8">
                                                <input type="password" class="form-control"
                                                    v-model="output.connector.auth.password" required>
                                            </div>
                                        </div>
                                        <div class="form-group row" v-if="output.connector.auth.method === 'key'">
                                            <label class="col-sm-2 col-form-label">Private Key</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"
                                                    v-model="output.connector.auth.privateKey" required>
                                            </div>
                                        </div>
                                        <div class="form-group row" v-if="output.connector.auth.method === 'key'">
                                            <label class="col-sm-2 col-form-label">Passphrase</label>
                                            <div class="col-sm-8">
                                                <input type="password" class="form-control"
                                                    v-model="output.connector.auth.passphrase">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row" v-if="output.type != 'stdout' && output.type != 'stderr'">
                                    <label class="col-sm-2 col-form-label">Glob</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" v-model="output.glob"
                                            placeholder="result.txt">
                                    </div>
                                </div>
                                <hr>
                            </div>
                            <p class="add-form" @click="addOutputForm()">
                                <i class="fa-solid fa-square-plus fa-xl fa-green icon-text-sep"></i>
                                Add Output
                            </p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                RED String
                            </h3>
                        </div>
                        <div class="card-body">
                            <div id="redEditor" ref="redEditor"></div>
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
import JSONEditor from 'jsoneditor'

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
                    },
                },
                inputs: [{
                    name: undefined,
                    type: undefined,
                    class: 'File',
                    value: undefined,
                    connector: {
                        command: undefined,
                        host: undefined,
                        port: undefined,
                        auth: {
                            method: 'password',
                            username: undefined,
                            password: undefined,
                            privateKey: undefined,
                            passphrase: undefined
                        },
                        filePath: undefined,
                        dirPath: undefined
                    },
                    inputBinding: {
                        prefix: undefined,
                        position: 0,
                        seperate: false,
                        itemSeperator: undefined
                    }
                }],
                outputs: []
            },
            schemaRed: undefined,
            schemaContainerEngines: undefined
        };
    },
    watch: {
        form: {
            handler() {
                this.updateJsonEditor()
            },
            deep: true
        }
    },
    computed: {
        redJson() {
            let red = {
                "redVersion": this.form.redVersion,
                "cli": {
                    "cwlVersion": this.form.cli.cwlVersion,
                    "class": this.form.cli.class,
                    "baseCommand": this.form.cli.baseCommand,
                    "inputs": {},
                    "outputs": {}
                },
                "inputs": {},
                "outputs": {},
                "container": {
                    "engine": this.form.container.engine,
                    "settings": {
                        "image": {
                            "url": this.form.container.image.url
                        },
                        "ram": this.form.container.ram
                    }
                }
            }

            if (this.form.cli.stdout) {
                red.cli["stdout"] = this.form.cli.stdout
            }
            if (this.form.cli.stderr) {
                red.cli["stderr"] = this.form.cli.stderr
            }
            if (this.form.container.image.auth.enable) {
                red.container.settings.image["auth"] = {
                    "username": this.form.container.image.auth.username,
                    "password": this.form.container.image.auth.password
                }
            }
            if (this.form.container.gpus.enable) {
                red.container.settings["gpus"] = {
                    "vendor": this.form.container.gpus.vendor,
                    "devices": []
                }
                for (let i = 0; i < this.form.container.gpus.count; i++) {
                    red.container.settings.gpus.devices.push({
                        "vramMin": this.form.container.gpus.vramMin
                    })
                }
            }
            for (const formInput of this.form.inputs) {
                if (formInput.class == 'File' || formInput.class == 'Directory') {
                    red.inputs[formInput.name] = {
                        "class": formInput.class,
                        "connector": {
                            "command": formInput.connector.command,
                            "access": {
                                "host": formInput.connector.host
                            }
                        }
                    }
                    if (formInput.connector.port) {
                        red.inputs[formInput.name].connector.access["port"] = formInput.connector.port
                    }
                    if (formInput.connector.auth.username) {
                        red.inputs[formInput.name].connector.access["auth"] = {
                            "username": formInput.connector.auth.username
                        }
                        if (formInput.connector.auth.method == 'password') {
                            red.inputs[formInput.name].connector.access.auth["password"] = formInput.connector.auth.password
                        } else if (formInput.connector.auth.method == 'key') {
                            red.inputs[formInput.name].connector.access.auth["privateKey"] = formInput.connector.auth.privateKey
                            if (formInput.connector.auth.passphrase) {
                                red.inputs[formInput.name].connector.access.auth["passphrase"] = formInput.connector.auth.passphrase
                            }
                        }
                    }
                    if (formInput.class == 'File') {
                        red.inputs[formInput.name].connector.access["filePath"] = formInput.connector.filePath
                    }
                    if (formInput.class == 'Directory') {
                        red.inputs[formInput.name].connector.access["dirPath"] = formInput.connector.dirPath
                    }
                } else {
                    red.inputs[formInput.name] = formInput.value
                }
                red.cli.inputs[formInput.name] = {
                    "type": formInput.type,
                    "inputBinding": {}
                }
                if (formInput.inputBinding.prefix) {
                    red.cli.inputs[formInput.name].inputBinding["prefix"] = formInput.inputBinding.prefix
                }
                if (formInput.inputBinding.position !== undefined && formInput.inputBinding.position !== "") {
                    red.cli.inputs[formInput.name].inputBinding["position"] = formInput.inputBinding.position
                }
                if (formInput.inputBinding.seperate) {
                    red.cli.inputs[formInput.name].inputBinding["seperate"] = formInput.inputBinding.seperate
                }
                if (formInput.inputBinding.itemSeperator) {
                    red.cli.inputs[formInput.name].inputBinding["itemSeperator"] = formInput.inputBinding.itemSeperator
                }
            }
            for (const formOutput of this.form.outputs) {
                red.outputs[formOutput.name] = {
                    "class": formOutput.class,
                    "connector": {
                        "command": formOutput.connector.command,
                        "access": {
                            "host": formOutput.connector.host
                        }
                    }
                }
                if (formOutput.connector.port) {
                    red.outputs[formOutput.name].connector.access["port"] = formOutput.connector.port
                }
                if (formOutput.connector.auth.username) {
                    red.outputs[formOutput.name].connector.access["auth"] = {
                        "username": formOutput.connector.auth.username
                    }
                    if (formOutput.connector.auth.method == 'password') {
                        red.outputs[formOutput.name].connector.access.auth["password"] = formOutput.connector.auth.password
                    } else if (formOutput.connector.auth.method == 'key') {
                        red.outputs[formOutput.name].connector.access.auth["privateKey"] = formOutput.connector.auth.privateKey
                        if (formOutput.connector.auth.passphrase) {
                            red.outputs[formOutput.name].connector.access.auth["passphrase"] = formOutput.connector.auth.passphrase
                        }
                    }
                }
                if (formOutput.class == 'File') {
                    red.outputs[formOutput.name].connector.access["filePath"] = formOutput.connector.filePath
                }
                if (formOutput.class == 'Directory') {
                    red.outputs[formOutput.name].connector.access["dirPath"] = formOutput.connector.dirPath
                }
                red.cli.outputs[formOutput.name] = {
                    "type": formOutput.type,
                    "outputBinding": {
                        "glob": formOutput.glob
                    }
                }
            }
            return red
        }
    },
    async mounted() {
        await this.loadSchemas()
        this.createJsonEditor()
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
                this.form.inputs[0].type = this.schemaRed.definitions.cli.properties.inputs.patternProperties['^[a-zA-Z0-9_-]+$'].properties.type.enum[0]
            }
            if (this.schemaContainerEngines) {
                this.form.container.engine = Object.keys(this.schemaContainerEngines)[0]
                this.form.container.ram = this.schemaContainerEngines[this.form.container.engine].definitions.ram.minimum
                this.form.container.gpus.vendor = this.schemaContainerEngines[this.form.container.engine].definitions.vendors.enum[0]
                this.form.container.gpus.vramMin = this.schemaContainerEngines[this.form.container.engine].definitions.ram.minimum
            }
        },
        addInputForm() {
            this.form.inputs.push({
                name: undefined,
                type: this.schemaRed.definitions.cli.properties.inputs.patternProperties['^[a-zA-Z0-9_-]+$'].properties.type.enum[0],
                class: 'File',
                value: undefined,
                connector: {
                    command: undefined,
                    host: undefined,
                    port: undefined,
                    auth: {
                        method: 'password',
                        username: undefined,
                        password: undefined,
                        privateKey: undefined,
                        passphrase: undefined
                    },
                    filePath: undefined,
                    dirPath: undefined
                },
                inputBinding: {
                    prefix: undefined,
                    position: this.form.inputs.length,
                    seperate: false,
                    itemSeperator: undefined
                }
            })
        },
        addOutputForm() {
            this.form.outputs.push({
                name: undefined,
                type: this.getOutputTypes()[0],
                types: this.getOutputTypes(),
                class: 'File',
                connector: {
                    command: undefined,
                    host: undefined,
                    port: undefined,
                    auth: {
                        method: 'password',
                        username: undefined,
                        password: undefined,
                        privateKey: undefined,
                        passphrase: undefined
                    },
                    filePath: undefined,
                    dirPath: undefined
                },
                glob: undefined
            })

        },
        removeInputForm(index) {
            this.form.inputs.splice(index, 1)
        },
        removeOutputForm(index) {
            this.form.outputs.splice(index, 1)
        },
        getOutputTypes() {
            if (this.schemaRed) {
                let outputsTypes = []
                for (const prop of this.schemaRed.definitions.cli.properties.outputs.patternProperties['^[a-zA-Z0-9_-]+$'].oneOf) {
                    for (const e of prop.properties.type.enum) {
                        outputsTypes.push(e)
                    }
                }
                return outputsTypes
            }
        },
        createJsonEditor() {
            const options = {
                enableSort: false,
                enableTransform: false
            }
            this.editor = new JSONEditor(this.$refs.redEditor, options)
            this.editor.set(this.redJson)
        },
        updateJsonEditor() {
            if (this.editor) {
                this.editor.update(this.redJson)
            }
        }
    }
}
</script>

<style scoped>
.form-check-input {
    margin-left: 1rem;
    margin-top: 0.3rem;
    position: relative;
    vertical-align: middle;
}

.form-check-label {
    margin-left: 0.7rem;
    margin-right: 2rem;
    margin-top: 0.3rem;
    position: relative;
    vertical-align: middle;
}

.form-text-align {
    margin-top: 0.3rem;
    margin-bottom: 0;
    position: relative;
    vertical-align: middle;
}

.add-form {
    font-weight: 700;
    margin-left: 0.5rem;
    cursor: pointer;
}

.remove-form {
    margin-right: 0.7rem;
    cursor: pointer;
}

.icon-text-sep {
    margin-right: 0.7rem;
}
</style>