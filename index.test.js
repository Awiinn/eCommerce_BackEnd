const request = require("supertest");
const app = require("./index");

describe("Testing endpoints", () => {
  it("Get all products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("Get single product", async () => {
    const res = await request(app).get("/products/1");
    expect(res.statusCode).toEqual(200);
  });
});

describe("Test login route", () => {
  it("Logs in user", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "testus",
      password: "testPassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});

// describe("Api endpoint for registering user", () => {
//   it(
//     ("Adds user to db",
//     async () => {
//       const register = await request(app).post("auth/register").send({
//         firstName: "first",
//         lastName: "last",
//         email: "email@admin.co",
//         password: "pass123",
//       });
//       expect(register.statusCode).toEqual(200);
//     })
//   );
// });

// describe("api endpoint for registering user", () => {
//   it("adds user to db", )
// })