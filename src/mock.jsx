import {
	createServer,
	Model,
	Response,
	RestSerializer,
} from "miragejs";
import { EXECUTIVE_ROLE_ID } from "./Constants/App";
import { decamelizeKeys } from 'humps';


export function createMockServer({ environment = "test" } = {}) {
	let server = createServer({
		environment,

		// Configure the serializer to use snake_case for keys
	    application: {
	        keyForAttribute: "snake_case",
	    },

		models: {
			user: Model,
			client: Model,
		},

		serializers: {
			client: RestSerializer.extend({
				keyForAttribute(key) {
					// Convert camelCase to snake_case
					return decamelizeKeys(key);
				},
			}),
		},

		seeds(server) {
			//----------------------------------------------------------------//
            //                      LOGIN API ENDPOINT                        //
			//----------------------------------------------------------------//

			server.create("user", {
				id: "6541c860fa17876a9dd04f1f",
				email: "demo@capsule-ui.com",
				password: "secret", // Simulate fake password.
				name: "Frank Herbert",
				first_name: "Frank",
		        last_name: "Herbert",
		        name: "Frank Herbert",
		        lexical_name: "Herbert, Frank",
		        organization_name: "",
		        organization_type: 0,
				role: EXECUTIVE_ROLE_ID,
		        was_email_verified: true,
				status: 1,
				timezone: "America/Toronto"
			});

			//----------------------------------------------------------------//
            //                      CLIENTS API ENDPOINT                      //
			//----------------------------------------------------------------//

			server.create("client", {
				id: "6541c860fa17876a9dd04f1f",
				is_ok_to_email: true,
				email: "frank@capsule-ui.com",
				name: "Frank Herbert",
				first_name: "Frank",
		        last_name: "Herbert",
		        name: "Frank Herbert",
		        lexical_name: "Herbert, Frank",
				phone: "+112345678900",
				phone_type: 1,
				is_ok_to_text: true,
				country: "Canada",
                region: "Ontario",
			    city: "London",
				birth_date: "1930-01-01T00:00:00Z",
                join_date: "2020-10-20T00:00:00Z",
			});
			server.create("client", {
				id: "6541c860fa17876a9dd04f1a",
				is_ok_to_email: true,
				email: "brian@capsule-ui.com",
				name: "Brian Herbert",
				first_name: "Brian",
		        last_name: "Herbert",
		        name: "Brian Herbert",
		        lexical_name: "Herbert, Brian",
				phone: "+112345678900",
				phone_type: 1,
				is_ok_to_text: true,
				country: "Canada",
                region: "Ontario",
			    city: "London",
				birth_date: "1980-01-01T00:00:00Z",
                join_date: "2020-10-20T00:00:00Z",
			});
			server.create("client", {
				id: "6541c860fa17876a9dd04f1b",
				is_ok_to_email: true,
				email: "zoe@capsule-ui.com",
				name: "Zoe Herbert",
				first_name: "Zoe",
		        last_name: "Herbert",
		        name: "Zoe Herbert",
		        lexical_name: "Herbert, Zoe",
				phone: "+112345678900",
				phone_type: 1,
				is_ok_to_text: true,
				country: "Canada",
                region: "Ontario",
			    city: "London",
				birth_date: "1980-01-01T00:00:00Z",
                join_date: "2020-10-20T00:00:00Z",
			});
		},

		routes() {
            // This code will make our `miragejs` server's URL be the exact
			// URL of this project frontend. This is done because we want
			// the simulated API backend to be in our frontend. Do not change!
			this.urlPrefix = process.env.REACT_APP_WWW_PROTOCOL + '://' + process.env.REACT_APP_WWW_DOMAIN;

			// The base URL we will use. Determined by your backend.
			this.namespace = "api/v1"

            //----------------------------------------------------------------//
            //                      LOGIN API ENDPOINT                        //
			//----------------------------------------------------------------//

			this.post("/login", (schema, request) => {
				// Deserialize our request payload.
				let attrs = JSON.parse(request.requestBody)
				console.log("user request payload:", attrs);

                // Perform validation based on user inputs.
                var newErrors = {};
				if (!attrs.email) {
					 newErrors["email"] = "value is missing";
				}
				if (!attrs.password) {
					 newErrors["password"] = "value is missing";
				}
				if (Object.keys(newErrors).length > 0) { // If any errors detected.
					return new Response(400, {"Content-Type" : "application/json",}, newErrors,);
				}

				// Lookup our single user by email
				let foundUser = schema.users.findBy({ email: attrs.email })
				console.log("user lookup found:", foundUser);
				if (!foundUser) {
					return new Response(400, {"Content-Type" : "application/json",}, {"email": "account does not exist for this email"},);
				}

				if (foundUser.password !== attrs.password) {
					return new Response(400, {"Content-Type" : "application/json",}, {"password": "password does not match for this account"},);
				}

				return new Response(200, {"Content-Type" : "application/json",}, {
					"user": foundUser,
					"access_token": "xxx", // Simulate fake access token.
				    "access_token_expiry_time": "2077-11-04T03:25:37.828887096Z",
				    "refresh_token": "yyy", // Simulate fake refresh token.
				    "refresh_token_expiry_time": "2077-11-17T03:25:37.828920762Z"
				},);
			})

			//----------------------------------------------------------------//
            //                      CLIENTS API ENDPOINT                      //
			//----------------------------------------------------------------//

			this.get("/clients", (schema) => {
				const clients = schema.clients.all();

				return {
			        results: clients.models.map((client) => ({
			            id: client.id,
			            email: client.email,
						is_ok_to_email: client.is_ok_to_email,
			            first_name: client.first_name,
			            last_name: client.last_name,
			            phone: client.phone,
						is_ok_to_text: client.is_ok_to_text,
			        })),
			        has_next_page: true, // Assuming this is always false in this example
			        next_cursor: '6541c860fa17876a9dd04f1b',
			    };
			});

			this.post("/clients", (schema, request) => {
				// Deserialize our request payload.
				let attrs = JSON.parse(request.requestBody)
				console.log("user request payload:", attrs);

                // Perform validation based on user inputs.
                var newErrors = {};
				if (!attrs.email) {
					 newErrors["email"] = "value is missing";
				}
				if (!attrs.firstName) {
					 newErrors["firstName"] = "value is missing";
				}
				if (!attrs.lastName) {
					 newErrors["lastName"] = "value is missing";
				}
				if (!attrs.phone) {
					 newErrors["phone"] = "value is missing";
				}
				if (!attrs.phoneType || attrs.phoneType === 0) {
					 newErrors["phoneType"] = "value is missing";
				}

				if (Object.keys(newErrors).length > 0) { // If any errors detected.
					return new Response(400, {"Content-Type" : "application/json",}, newErrors,);
				}

                attrs.id = new Date().valueOf(); // Assign unique `id` (special thanks via https://stackoverflow.com/a/18048162).
				const res = schema.clients.create({
					id: attrs.id,
					email: attrs.email,
					is_ok_to_email: attrs.isOkToEmail,
					first_name: attrs.firstName,
					last_name: attrs.lastName,
					phone: attrs.phone,
					phone_type: attrs.phoneType,
					is_ok_to_text: attrs.isOkToText,
				});

				// Create a custom response structure.
				const customResponse = {
					id: attrs.id,
					email: attrs.email,
					is_ok_to_email: attrs.isOkToEmail,
					first_name: attrs.firstName,
					last_name: attrs.lastName,
					phone: attrs.phone,
					phone_type: attrs.phoneType,
					is_ok_to_text: attrs.isOkToText,
				};

				return new Response(201, {
					"Content-Type": "application/json",
				}, customResponse);

			});

			this.get("/client/:id", (schema, request) => {
				let id = request.params.id;
				console.log("id:", id);
				let data = schema.clients.find(id)
				console.log("data:", data);
			    return new Response(200, {"Content-Type" : "application/json",}, data.attrs)
			});
		},
	})

	server.logging = true; // For debugging purposes only.

	return server
}

export default createMockServer;
