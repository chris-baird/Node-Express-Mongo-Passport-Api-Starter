const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

describe("Route Tests", () => {
  describe("Tests secure routes test without token", () => {
    it("Gets rejected with a 401 Unauthorized", async () => {
      //   Using supertest to start the app and the send a get request to a protected endpoint
      const response = await request(app).get("/user/profile");
      // Checks api response for a status 401 Unauthorized
      expect(response.status).toBe(401);
    });
  });

  describe("Tests secure routes test with token", () => {
    it("Gets a success of 200", async () => {
      // Test user object
      const userInfo = {
        email: "chris@gmail.com",
        password: "password",
      };
      // Grabbing token with supertest from API
      const {
        body: { token },
      } = await request(app)
        .post("/login")
        .send(userInfo)
        .set("Accept", "application/json");
      // Using supertest to start the app and the send a get request to a protected endpoint with token attached
      const response = await request(app)
        .get("/user/profile")
        .query({ secret_token: token });
      // Checks api response for a status 200 OK
      expect(response.status).toBe(200);
    });
  });
  // Closes the mongoose connection when all the tests have run
  afterAll((done) => {
    mongoose.disconnect(done);
  });
});
