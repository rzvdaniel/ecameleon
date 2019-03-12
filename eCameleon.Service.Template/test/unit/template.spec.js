"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../services/template.service");

describe("Test 'template' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'template.hello' action", () => {

		it("should return with 'Hello Moleculer'", () => {
			expect(broker.call("template.hello")).resolves.toBe("Hello Moleculer");
		});

	});

	describe("Test 'template.welcome' action", () => {

		it("should return with 'Welcome'", () => {
			expect(broker.call("template.welcome", { name: "Adam" })).resolves.toBe("Welcome, Adam");
		});

		it("should reject an ValidationError", () => {
			expect(broker.call("template.welcome")).rejects.toBeInstanceOf(ValidationError);
		});

	});

});

