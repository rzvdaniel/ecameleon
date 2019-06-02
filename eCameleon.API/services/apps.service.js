const DbService = require("../mixins/db.mixin");

module.exports = {
	name: "apps",
	version: 1,

	mixins: [
		DbService("apps"),
	],

	settings: {
		rest: "apps/"
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
					// Expose as "/v1/apps/"
					rest: "GET /",
					// 	type ActionVisibility = "published" | "public" | "protected" | "private"
					//visibility: 'published',
					handler(ctx) {
						return 'list';
					},
			},

			get: {
					// Expose as "/v2/tests/:id"
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