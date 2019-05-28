import * as api from '../../library/api.js';
import send from '@polka/send-type';
import 'dotenv/config';

export async function post(req, res) {

    const credentials = {
        email : req.body.username,
        password : req.body.password
    };

    try {
        const token = await api.post('api/v1/accounts/login', credentials);
        const user = await api.post('api/v1/accounts/resolveToken', token);

        req.session.token = token.token;
        req.session.user = user;

        res.end(JSON.stringify(user));
    }
    catch(response) {
        res.send = send.bind(res, response.status);
        res.end(response);
    }
}