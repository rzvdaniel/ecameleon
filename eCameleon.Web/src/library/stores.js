async function post(endpoint, data = {}) {

    const req = await fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });

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

    async function login(credentials) {
        const user = await post('auth/login', credentials);
        return user;
    };

    async function logout() {
        const response = await post('auth/logout');
        return response;
    };

    async function register(credentials) {
        const user = await post('auth/register', credentials);
        return user;
    };

    async function save(credentials) {
        const user = await post('auth/save', credentials);
        return user;
    };

    async function get(endpoint, params = {}) {
        const url = await Object.keys(params).length === 0 ? endpoint : endpoint + '?' + query(params);
        const data = await post('auth/get', {url});
        return data;
    };

	return { login, logout, register, save, get };
}

export const auth = createAuth();