const request = require("supertest");
const { app } = require("../src/server");
const utils = require("../src/utilsForTests");

describe("TESTING AUTH", () => {
  it("should login", async () => {
    const res = await request(app).post("/auth/login").send({
      login: "yasha",
      password: "yasha",
    });
    expect(res.statusCode).toEqual(200);
    utils.storage.set(res.body.data.token);
  });
  it("should logout", async () => {
    let token = utils.storage.get();
    const res = await request(app)
      .post("/auth/logout")
      .send()
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(200);
  });
});
