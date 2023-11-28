import axiosInstance from "./api";
import AuthService from '@/services/auth'

const setup = (store) => {
    let retrys = 0

    axiosInstance.interceptors.request.use((config) => {
        const token = store.state.token;
        if (token && config.url !== '/refreshtoken') {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use((res) => {
        retrys = 0
        return res;
    }, async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== '/login' && err.response) {
            if (err.response.status === 401 && retrys < 10) {
                retrys++

                try {
                    const refresh_token = store.state.refresh_token
                    const rs = await axiosInstance.post("/refreshtoken", {}, {
                        headers: {
                            Authorization: 'Bearer ' + refresh_token,
                            'Content-Type': 'application/json'
                        }
                    });

                    const accessToken = rs.data.access_token;
                    store.dispatch('setToken', accessToken)

                    return axiosInstance(originalConfig);
                } catch (_error) {
                    if (_error.response) {
                        const statusCode = _error.response.status;
                        if (statusCode >= 400 && statusCode < 500) {
                            AuthService.logout()
                        }
                    }
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    });
};

export default setup;