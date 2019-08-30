// import { api } from '../../library/api.js';

export function post(req, res) {

	// Delete the server session
	delete req.session.token;
	delete req.session.user;

	// TODO! Logout from the Api itself
	//const user = await api.post('api/v1/logout', credentials);

	res.end(JSON.stringify({ ok: true }));
}