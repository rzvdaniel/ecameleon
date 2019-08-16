import { config } from "../config.js"

function query(params) {

    return Object
        .keys(params)
        .map(key => key + (params[key] ? '=' + params[key] : ''))
        .join('&');
};

async function send({ method, path, data, token }) {

    const fetch = process.browser ? window.fetch : require('node-fetch').default;

    const opts = { method, headers: {} };

    if (data) {
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        opts.body = query(data)
    }

    if (token) {
        opts.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = await fetch(`${config.API_URL}/${path}`, opts);
    const res = await req.text();

    try {
        return JSON.parse(res);
    }
    catch (e) {
        return req;
    }
}

function createApi() {

    async function get(path, token) {
        return await send({ method: 'GET', path, token });
    };

    async function del(path, token) {
        return await send({ method: 'DELETE', path, token });
    };

    async function post(path, data, token) {
        return await send({ method: 'POST', path, data, token });
    };

    async function put(path, data, token) {
        return await send({ method: 'PUT', path, data, token });
    };

    return { get, del, post, put };
}

export const api = createApi();