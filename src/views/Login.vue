<template>
  <div class="login-center">

    <div class="login-box">
      <div class="card">
        <div class="card-body login-card-body">

          <form name="form" @submit.prevent="handleLogin">
            <div class="input-group mb-3">
              <input v-model="username" type="text" class="form-control" placeholder="Username" required>
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input v-model="password" type="password" class="form-control" placeholder="Password" required>
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <button class="btn btn-primary btn-block">Login</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from "vuex";

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    handleLogin() {
      axios.post(process.env.VUE_APP_AGENCY_URL + '/login', {}, {
        auth: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        //localStorage.setItem('username', res.data.username)
        //localStorage.setItem('token', res.data.access_token)
        this.setUser(res.data.username);
        this.setToken(res.data.access_token);
        this.$router.push("/")
      }).catch(err => {
        this.username = ""
        this.password = ""
      })
    }
  }
}
</script>

<style>
.btn {
  max-width: 200px;
  margin: auto;
}

.login-center {
  align-items: center;
  background-color: #e9ecef;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100vh;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>