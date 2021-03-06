const request = require("supertest");
const { app } = require("../src/server");
const utils = require("../src/utilsForTests");

describe("TESTING DOC", () => {
  it("should login", async () => {
    const res = await request(app).post("/auth/login").send({
      login: "yasha",
      password: "yasha",
    });
    expect(res.statusCode).toEqual(200);
    utils.storage.set(res.body.data.token);
  });
  it("should add doc", async () => {
    let token = utils.storage.get();
    const res = await request(app)
      .post("/doc/add")
      .send({
        docName: "jest test",
        docType: "jest test",
      })
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(200);
  });
  it("should add tag to doc", async () => {
    let token = utils.storage.get();
    const res = await request(app)
      .post("/doc/addtag")
      .send({
        doc: 5,
        tag: 2,
      })
      .set("Authorization", "Bearer " + token);
    expect(res.statusCode).toEqual(200);
  });
});
