import axios from 'axios';

const axiosCreateConfig = {
    timeout: 60000
};
if (process.env.NODE_ENV === 'development') {
    axiosCreateConfig.baseURL = '/';
} else {
    axiosCreateConfig.baseURL = window._HAMAL_UI_API_PREFIX;
}
const request = axios.create(axiosCreateConfig);

let flag = 0; // 防止重复弹出框

request.interceptors.request.use(
    (config) => {
        // 转大写
        const method = config.method.toUpperCase();
        // 获取data参数
        const data = config.data;
        if (method === 'UPLOAD') {
            config['body'] = data;
            config['method'] = 'POST';
            config['headers']['Accept'] = '*/*';
            config['headers']['x-provider'] = 'set';
            delete config['headers']['Content-Type'];
            config['headers']['Content-Type'] = 'multipart/form-data';
        }

        return config;
    },
    (error) => {
        console.log(error);
        Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        const res = response.data;
        return res;
    },
    async (error) => {
        error.error = (callback) => {
            typeof callback === 'function' && callback();
        };
        return Promise.reject(error);
    }
);

export default request;
