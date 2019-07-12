"use strict";

const _ 			= require("lodash");
const jwt 			= require("jsonwebtoken");

const DbService 	= require("../mixins/db.mixin");
const CacheCleaner 	= require("../mixins/cache.cleaner.mixin");
const ConfigLoader 	= require("../mixins/config.mixin");
const SecureAutoalias 	= require("../mixins/secureautoalias.mixin");

const { MoleculerRetryableError, MoleculerClientError } = require("moleculer").Errors;

module.exports = {
	name: "accounts",
	version: 1,

	mixins: [
		DbService("accounts"),
		CacheCleaner([
			"cache.clean.accounts"
		]),
		ConfigLoader([
			"site.**",
			"mail.**",
			"accounts.**"
		]),
		SecureAutoalias
	],

	/**
	 * Service settings
	 */
	settings: {
		actions: {
			sendMail: "mail.send"
		},

		fields: {
			id: { type: "string", readonly: true, primaryKey: true, secure: true, columnName: "_id" },
			username: { type: "string", maxlength: 50, required: true },
			firstName: { type: "string", maxlength: 50, required: true },
			lastName: { type: "string", maxlength: 50, required: true },
			email: { type: "string", maxlength: 100, required: true },
			password: { type: "string", minlength: 6, maxlength: 60, hidden: true },
			avatar: { type: "string" },
			roles: { required: true },
			socialLinks: { type: "object" },
			status: { type: "number", default: 1 },
			plan: { type: "string", required: true },
			verified: { type: "boolean", default: false },
			token: { type: "string", readonly: true },
			"totp.enabled": { type: "boolean", default: false },
			passwordless: { type: "boolean", default: false },
			passwordlessTokenExpires: { hidden: true },
			resetTokenExpires: { hidden: true },
			verificationToken: { hidden: true },
			createdAt: { type: "number", updateable: false, default: Date.now },
			updatedAt: { type: "number", readonly: true, updateDefault: Date.now },
			lastLoginAt: { type: "number" },
		},
	},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {



		/**
		 * Get user by JWT token (for API GW authentication)
		 *
		 * @actions
		 * @param {String} token - JWT token
		 *
		 * @returns {Object} Resolved user
		 */
		resolveToken: {
			cache: {
				keys: ["token"],
				ttl: process.env.JWT_AUTH_TOKEN_CACHE_EXPIRES
			},
			params: {
				token: "string"
			},
			async handler(ctx) {
				const decoded = await this.verifyJWT(ctx.params.token);
				if (!decoded.id)
					throw new MoleculerClientError("Invalid token", 401, "INVALID_TOKEN");

				const user = await this.getById(decoded.id);

				if (!user)
					throw new MoleculerClientError("User is not registered", 401, "USER_NOT_FOUND");

				if (!user.verified)
					throw new MoleculerClientError("Please activate your account!", 401, "ERR_ACCOUNT_NOT_VERIFIED");

				if (user.status !== 1)
					throw new MoleculerClientError("User is disabled", 401, "USER_DISABLED");

				return await this.transformDocuments(ctx, {}, user);
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Send email to the user email address
		 *
		 * @param {Context} ctx
		 * @param {Object} user
		 * @param {String} template
		 * @param {Object?} data
		 */
		async sendMail(ctx, user, template, data) {
			if (!this.config["mail.enabled"])
				return this.Promise.resolve(false);

			try {
				return await ctx.call(this.settings.actions.sendMail, {
					to: user.email,
					template: template,
					data: _.defaultsDeep(data, {
						user,
						siteUrl: this.config["site.url"],
						siteName: this.config["site.name"]
					})
				}, { retries: 3, timeout: 10000 });

			} catch(err) {
				/* istanbul ignore next */
				this.logger.error("Send mail error!", err);
				/* istanbul ignore next */
				throw err;
			}
		},

		async getToken(user) {
			return await this.generateJWT({ id: user._id.toString() });
		},

		/**
		 * Generate a JWT token from user entity.
		 *
		 * @param {Object} payload
		 * @param {String|Number} [expiresIn]
		 * Expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  
		 * Eg: 60, "2 days", "10h", "7d"
		 */
		generateJWT(payload, expiresIn) {
			return new this.Promise((resolve, reject) => {
				const jwtExpiresIn = expiresIn || this.config["accounts.jwt.expiresIn"];
				return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: jwtExpiresIn }, (err, token) => {
					if (err) {
						this.logger.warn("JWT token generation error:", err);
						return reject(new MoleculerRetryableError("Unable to generate token", 500, "UNABLE_GENERATE_TOKEN"));
					}

					resolve(token);
				});
			});
		},

		/**
		 * Verify a JWT token and return the decoded payload
		 *
		 * @param {String} token
		 */
		verifyJWT(token) {
			return new this.Promise((resolve, reject) => {
				jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
					if (err) {
						this.logger.warn("JWT verifying error:", err);
						return reject(new MoleculerClientError("Invalid token", 401, "INVALID_TOKEN"));
					}

					resolve(decoded);
				});
			});
		}
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};