import supertest from "supertest";

import app from "../src/index"
import { FruitInput } from "services/fruits-service";

const api = supertest(app);

// beforeAll(async () => {
//   await prisma.reservation.deleteMany();
// });

describe("API test", () => {
  it("should return 201 when inserting a fruit", async () => {

    const fruit: FruitInput = {
      name: "maça",
      price: 10
    };
    const { status, body } = await api.post("/fruits").send(fruit);  
    expect(status).toBe(201);
    
  });

  it("should return 409 when inserting a fruit that is already registered", async () => {

    const fruit: FruitInput = {
      name: "maça",
      price: 10
    };
    const { status } = await api.post("/fruits").send(fruit);  
    expect(status).toBe(409);
    
  });
  it("should return 422 when inserting a fruit with data missing", async () => {
    const fruit = {
      name: "uva"      
    };
    const { status } = await api.post("/fruits").send(fruit);  
    expect(status).toBe(422);
    
  });

  it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async () => {
    const { status } = await api.get("/fruits/5")
    expect(status).toBe(404);    
  });

  it("should return one fruit when given a valid and existing id", async () => {
    const { status, body } = await api.get("/fruits/1")
    expect(status).toBe(200);
    expect(body).toEqual({"id": 1, "name": "maça", "price": 10});    
  });

  it("should return all fruits if no id is present", async () => {
    const fruit: FruitInput = {
      name: "pera",
      price: 10
    };

   await api.post("/fruits").send(fruit);
    const { status, body } = await api.get("/fruits")
    expect(status).toBe(200);
    expect(body).toHaveLength(2);    
  });

  it("should return 400 when id param is present but not valid", async () => {
    const { status } = await api.get("/fruits/x")
    expect(status).toBe(400);    
  });

  
});