import { createServer, Model, Response } from "miragejs";
import { EXECUTIVE_ROLE_ID } from "./Constants/App";


export function createMockServer({ environment = "test" } = {}) {
	let server = createServer({
		environment,

		models: {
			user: Model
		},

		seeds(server) {
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
			})
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
					return new Response(400, { some: 'login failed' }, newErrors,);
				}

				// Lookup our single user by email
				let foundUser = schema.users.findBy({ email: attrs.email })
				console.log("user lookup found:", foundUser);
				if (!foundUser) {
					return new Response(400, { some: 'login failed' }, {"email": "account does not exist for this email"},);
				}

				if (foundUser.password !== attrs.password) {
					return new Response(400, { some: 'login failed' }, {"password": "password does not match for this account"},);
				}

				return new Response(200, { some: 'successful login' }, {
					"user": foundUser,
					"access_token": "xxx", // Simulate fake access token.
				    "access_token_expiry_time": "2077-11-04T03:25:37.828887096Z",
				    "refresh_token": "yyy", // Simulate fake refresh token.
				    "refresh_token_expiry_time": "2077-11-17T03:25:37.828920762Z"
				},);
			})

			this.get("/users", (schema) => {
				return schema.users.all()
			})
		},
	})

	return server
}

export default createMockServer;
