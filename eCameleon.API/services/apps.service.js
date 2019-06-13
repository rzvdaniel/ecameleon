const DbService = require("../mixins/db.mixin");

module.exports = {
	name: "apps",
	version: 1,

	mixins: [
		DbService("apps"),
	],

	settings: {
		fields: {
			id: { type: "string", readonly: true, primaryKey: true, secure: true, columnName: "_id" },
			name: { type: "string", maxlength: 250, required: true },
			description: { type: "string", maxlength: 5000, required: true },
			active: { type: "boolean", default: true },
			protected: { type: "boolean", default: true },
			createdAt: { type: "number", updateable: false, default: Date.now },
			updatedAt: { type: "number", readonly: true, updateDefault: Date.now }
		}
	},

	actions: {

		list: {
			rest: "GET /",
			handler(ctx) {
				return 'list';
			}
		},

		get: {
			rest: "GET /:id",
			handler(ctx) {
				return 'get';
			}
		},

		create: {
			rest: "POST /",
			params: {
				name: { type: "string", maxlength: 250 },
				description: { type: "string", maxlength: 5000, optional: true }
			},
			async handler(ctx) {
				const entity = {
					name:  ctx.params.name,
					description: ctx.params.description,
					active : true,
					protected: true,
					createdAt: Date.now(),
					updatedAt: Date.now()
				};

				const app = await this.adapter.insert(entity);

				return this.transformDocuments(ctx, {}, app);
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
		}
	}
};