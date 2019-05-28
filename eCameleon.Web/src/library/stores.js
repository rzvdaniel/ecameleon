import { writable } from 'svelte/store';

async function post(endpoint, data = {}) {

    const req = await fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
        
    // interface Response extends Body {
    //     readonly headers: Headers;
    //     readonly ok: boolean;
    //     readonly redirected: boolean;
    //     readonly status: number;
    //     readonly statusText: string;
    //     readonly trailer: Promise<Headers>;
    //     readonly type: ResponseType;
    //     readonly url: string;
    //     clone(): Response;
    // }

    try {
        return req.json();
    }
    catch(e) {
        return req;
    }
}

function query(params) {

    return Object
        .keys(params)
        .map(key => key + (params[key] ? '=' + params[key] : '' ))
        .join('&');
};

function createAuth() {

	const { subscribe, set, update } = writable();

    async function login(credentials) {
        const user = await post('auth/login', credentials);

        set({user});

        return user;
    };

    async function logout() {

        const response = await post('auth/logout');

        set({user: null});

        return response;
    };

    async function register(credentials) {

        const user = await post('auth/register', credentials);

        return user;
    };

    async function save(credentials) {

        const user = await post('auth/save', credentials);

        set({user});

        return user;
    };

    async function get(endpoint, params = {}) {

        const url = await Object.keys(params).length === 0 ? endpoint : endpoint + '?' + query(params);
        const data = await post('auth/get', {url});

        return data;
    };

	return { subscribe, login, logout, register, save, get };
}

export const auth = createAuth();