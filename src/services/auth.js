import api from "./api";
import store from '@/store'
import router from '@/router'

class AuthService {
    login(username, password) {
        return api.post('/login', {}, {
            auth: {
                username: username,
                password: password
            }
        }).then((res) => {
            if (res.data.access_token) {
                store.dispatch('setUser', res.data.username)
                store.dispatch('setToken', res.data.access_token)
                store.dispatch('setRefreshToken', res.data.refresh_token)
                router.push("/")
            }
            return res.data;
        });
    }

    logout() {
        store.dispatch('removeUser')
        store.dispatch('removeToken')
        store.dispatch('removeRefreshToken')
        window.sessionStorage.clear()
        router.push("/login")
    }
}

export default new AuthService();