const request = require("supertest");
const server = require("../../index");

test("it should console log the server port when connected", async () => {
  const users = await request(server).get("/api/users");
  console.log(users.body);
  expect(users.body.length).toBe(3);
})