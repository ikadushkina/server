const request = require("supertest");
const { app } = require("../src/server");
const utils = require("../src/utilsForTests");
const jwt = require("../src/utils/token");

describe("TESTING AUTH", () => {
  it("should login", async () => {
    const res = await request(app).get("/auth/login").send();
    expect(res.statusCode).toEqual(200);
    utils.storage.set(res.body.data.token);
  });
  // it("should add doc", async () => {
  //   let token = utils.storage.get();
  //   const res = await request(app)
  //     .post("/doc/add")
  //     .send({
  //       docName: "jest test",
  //       docType: "jest test",
  //     })
  //     .set("Authorization", "Bearer " + token);
  //   expect(res.statusCode).toEqual(200);
  // });
  it("should logout", async () => {
    let token = utils.storage.get();
    const res = await request(app)
      .post("/auth/logout")
      .send()
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(200);
  });
});
