import request from 'supertest';
import app from "../app";
import User from "../models/User";

const agent = request.agent(app);

export const authTests = () => {
    describe("Auth Tests", () => {
        describe("Registration tests", () => {
            /**
             * Delete test user before and after all tests in this describe block.
             * 
             * This is to ensure that the user is not already in the database before the tests run.
             * This can occur if tests fail on a previous run and the user is not deleted from the database.
             */
            beforeAll(async () => {
                await User.deleteMany({ email: "johndoe@fiscalfriend.com"})
            });

            afterAll(async () => {
                await User.deleteMany({ email: "johndoe@fiscalfriend.com"});
            });

            it("should require an email", async () => {
                const res = await request(app).post("/auth/register").send({
                    email: "",
                    password: "password",
                    firstName: "John",
                    lastName: "Doe",
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual("Missing email or password");
            });
            it("should require a password", async () => {
                const res = await request(app).post("/auth/register").send({
                    email: "johndoe@fiscalfriend.com",
                    password: "",
                    firstName: "John",
                    lastName: "Doe",
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual("Missing email or password");
            });
            it("requires a first or last name", async() => {
                const res = await request(app).post("/auth/register").send({
                    email: "johndoe@fiscalfriend.com",
                    password: "password",
                    firstName: "",
                    lastName: "",
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual("Missing name");
            });
            it("should create a new user", async () => {
                const res = await request(app).post("/auth/register").send({
                    email: "johndoe@fiscalfriend.com",
                    password: "password",
                    firstName: "John",
                    lastName: "Doe",
                });
                expect(res.statusCode).toEqual(201);
                expect(res.body.success).toEqual(true);
                expect(res.body.message).toEqual("User created successfully");
                expect(res.body.user.email).toEqual("johndoe@fiscalfriend.com");
                expect(res.body.user.firstName).toEqual("John");
                expect(res.body.user.lastName).toEqual("Doe");
                expect(res.body.user.password).toBeDefined();
            });
            it("should not create a user that already exists", async () => {
                const res = await request(app).post("/auth/register").send({
                    email: "johndoe@fiscalfriend.com",
                    password: "password",
                    firstName: "John",
                    lastName: "Doe",
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.error).toEqual("User already exists");
            });

        });

        describe("Login tests", () => {
            beforeAll(async () => {
                // Add the test user
                await User.create({
                    email: "johndoe@fiscalfriend.com",
                    password: "password",
                    firstName: "John",
                    lastName: "Doe",
                });
            });
            afterAll(async () => {
                await User.deleteMany({ email: "johndoe@fiscalfriend.com"});
            });

            it("should require an email", async () => {
                const res = await request(app).post("/auth/login").send({
                    email: "",
                    password: "password",
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual("Missing email or password");
            });
            it("should require a password", async () => {
                const res = await request(app).post("/auth/login").send({
                    email: "johndoe@fiscalfriend.com",
                    password: "",
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual("Missing email or password");
            });
            it("returns an error if the user is not found", async () => {
                const res = await request(app).post("/auth/login").send({
                    email: "notauser@test.com",
                    password: "password",
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual("User not found");
            });
            it("returns an error if the password is incorrect", async () => {
                const res = await request(app).post("/auth/login").send({
                    email: "johndoe@fiscalfriend.com",
                    password: "wrongpassword",
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual("Invalid password");
            });
            it("should login a user with the correct credentials", async () => {
                const res = await request(app).post("/auth/login").send({
                    email: "johndoe@fiscalfriend.com",
                    password: "password",
                });
                expect(res.statusCode).toEqual(201);
                expect(res.body.success).toEqual(true);
                expect(res.body.message).toEqual("Login successful");
                expect(res.header['set-cookie']).toBeDefined();
            });
        });
        describe("Logout tests", () => {
            beforeAll(async () => {
                // Add the test user
                await User.create({
                    email: "johndoe@fiscalfriend.com",
                    password: "password",
                    firstName: "John",
                    lastName: "Doe",
                });

                // Login the user **relies on login working**
                const res = await agent.post("/auth/login").send({
                    email: "johndoe@fiscalfriend.com",
                    password: "password",
                });
                expect(res.statusCode).toEqual(201);
                expect(res.body.success).toEqual(true);
                expect(res.headers['set-cookie']).toBeDefined();
            });
            afterAll(async () => {
                await User.deleteMany({ email: "johndoe@fiscalfriend.com" });
            });

            it("should log a user out", async () => {
                const res = await agent.post("/auth/logout")
                expect(res.statusCode).toEqual(201);
                expect(res.body.success).toEqual(true);
                const token = res.header['set-cookie'][0].split(";")[0];
                expect(token).toBe("token=");
            });
        });
        describe("Me tests", () => {
            let cookie: string;

            beforeAll(async () => {
                // Add the test user
                await User.create({
                    email: "johndoe@fiscalfriend.com",
                    password: "password",
                    firstName: "John",
                    lastName: "Doe",
                });

                // Login the user 
                const res = await agent.post("/auth/login").send({
                    email: "johndoe@fiscalfriend.com",
                    password: "password",
                });
                expect(res.statusCode).toEqual(201);
                expect(res.body.success).toEqual(true);
                expect(res.headers['set-cookie']).toBeDefined();
                cookie = res.headers['set-cookie'][0];
            });
            afterAll(async () => {
                await User.deleteMany({ email: "johndoe@fiscalfriend.com" });
            });

            it("should return the user's information", async () => {
                const res = await agent.post("/auth/me");
                expect(res.statusCode).toEqual(201);
                expect(res.body.success).toEqual(true);
                expect(res.body.user).toBeDefined();
            });
        });
    });
}