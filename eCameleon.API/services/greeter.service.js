// greeter.service.js
module.exports = {
	name: "greeter",
	version: 2,

	actions: {

		// example: {
		// 	// Expose as "/v2/tests/:id"
		// 	rest: "GET /:id",
		// 	// 	type ActionVisibility = "published" | "public" | "protected" | "private"
		// 	visibility: 'published',
		// 	handler(ctx) {
		// 		return 'get';
		// 	}
		// },

		hi() {
			return "Hi Moleculer";
		},

		hello: {
			rest: "GET /hello",
			handler(ctx) {
				return "Hello World";
			}
		},

		list: {
			// Expose as "/v2/tests/"
			rest: "GET /",
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
			// Expose as "/v2/tests/"
			rest: "POST /",
			handler(ctx) {
				return 'create';
			}
		},

		update: {
			// Expose as "/v2/tests/:id"
			rest: "PUT /:id",
			handler(ctx) {
				return 'update';
			}
		},

		remove: {
			// Expose as "/v2/tests/:id"
			rest: "DELETE /:id",
			handler(ctx) {
				return 'remove';
			}
		},	
	}
};