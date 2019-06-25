const DbService = require("../mixins/db.mixin");

module.exports = {
	name: "apps",
	version: 1,

	mixins: [
		DbService("apps"),
	],

	settings: {
		fields: ["_id", "name", "title", "description", "active", "created"]
	},

	hooks: {
		before: {
		  create(ctx) {
			ctx.params.created = new Date();
		  },
		  update(ctx) {
			ctx.params.updated = new Date();
		  }
		}
	},

	actions: {

	},

	/**
	 * Methods
	 */
	methods: {

	}
};