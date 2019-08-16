const axios = require("axios");
const { MoleculerClientError } = require("moleculer").Errors;

module.exports = {
	name: "login",
	version: 1,

	actions: {

		login: {
			// Expose as "/v1/login/"
			rest: "POST /",
			params: {
				email: { type: "string", optional: false },
				password: { type: "string", optional: true },
				token: { type: "string", optional: true }
			},
			async handler(ctx) {
				try {
					// Get token		
					var credentials = {
						email: ctx.params.email,
						password: ctx.params.password,
						token: ctx.params.token
					};
					var tokenResult = await axios.post(`${process.env.AUTH_SERVER_URL}/api/v1/accounts/login`, credentials);
					var token = tokenResult.data;
					
					// Get user
					var userResult = await axios.post(`${process.env.AUTH_SERVER_URL}/api/v1/accounts/resolveToken`, token);		
					var user = userResult.data;
					user.token = token.token;

					return user;
				}
				catch (error) {
					throw new MoleculerClientError("Login error", 401, "AUTHENTICATION_ERROR");
				}
			}	
		}
	}
};