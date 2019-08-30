import { api } from '../../library/api.js';
import send from '@polka/send-type';

export async function post(req, res) {
    
    try {
        const credentials = {
            email : req.body.username,
            password : req.body.password
        };

        const user = await api.post('api/v1/login', credentials);

        req.session.token = user.token.token;
        req.session.user = user;
        
        res.end(JSON.stringify(user));
    }
    catch(response) {
        res.send = send.bind(res, response.status);
        res.end(response);
    }
}