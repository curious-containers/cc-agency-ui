import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        user: null,
        token: null,
        refresh_token: null
    },
    mutations: {
        UPDATE_USER(state, user) {
            state.user = user
        },
        UPDATE_TOKEN(state, token) {
            state.token = token
        },
        UPDATE_REFRESH_TOKEN(state, refresh_token) {
            state.refresh_token = refresh_token
        }
    },
    actions: {
        setUser(context, user) {
            context.commit('UPDATE_USER', user)
        },
        removeUser(context) {
            context.commit('UPDATE_USER', null)
        },
        setToken(context, token) {
            context.commit('UPDATE_TOKEN', token)
        },
        removeToken(context) {
            context.commit('UPDATE_TOKEN', null)
        },
        setRefreshToken(context, refresh_token) {
            context.commit('UPDATE_REFRESH_TOKEN', refresh_token)
        },
        removeRefreshToken(context) {
            context.commit('UPDATE_REFRESH_TOKEN', null)
        },
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        }
    }
});