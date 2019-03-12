// template.service.js
module.exports = {
	name: "template",
	version: 1,

	settings: {
		// Base path
		rest: "template/"
	},

	actions: {

			hello: {
				rest: "GET /hello",
				handler(ctx) {
					return "Hello World";
				}
			},

			// hello() {
			// 	return "Hello Moleculer";
			// },

			list: {
					// Expose as "/v1/template/"
					rest: "GET /",
					// 	type ActionVisibility = "published" | "public" | "protected" | "private"
					//visibility: 'published',
					handler(ctx) {
						return 'list';
					},
			},

			get: {
					// Expose as "/v1/template/:id"
					rest: "GET /:id",
					handler(ctx) {
						return 'get';
					}
			},

			create: {
					rest: "POST /",
					handler(ctx) {
						return 'create';
					}
			},

			update: {
					rest: "PUT /:id",
					handler(ctx) {
						return 'update';
					}
			},

			remove: {
					rest: "DELETE /:id",
					handler(ctx) {
						return 'remove';
					}
			},	
	}
};