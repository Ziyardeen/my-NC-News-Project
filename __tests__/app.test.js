const request = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("/api/topics", () => {
  test("404- test for bad URL", () => {
    return request(app).get("/Not_A_URl").expect(404);
  });
});

describe("/api/healthcheck: HealthCheck to confirm connection with sever", () => {
  describe("/api/healthcheck", () => {
    test("200 - returns a status of 200 ", () => {
      return request(app).get("/api/healthcheck").expect(200);
    });
  });
});

describe("/api/topics", () => {
  test("status:200, Should get all topics with the corrrect data", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        body.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });

  test("status:200, Should return the correct data", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body[0].slug).toBe("mitch");
        expect(body[0].description).toBe("The man, the Mitch, the legend");
      });
  });

  test("status:200, Should return the correct data in the correct order", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body[1]).toMatchObject({
          description: "Not dogs",
          slug: "cats",
        });
      });
  });
});

const request = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("/api/topics", () => {
  test("404- test for bad URL", () => {
    return request(app).get("/Not_A_URl").expect(404);
  });
});

describe("/api/healthcheck: HealthCheck to confirm connection with sever", () => {
  describe("/api/healthcheck", () => {
    test("200 - returns a status of 200 ", () => {
      return request(app).get("/api/healthcheck").expect(200);
    });
  });
});

describe("/api/topics", () => {
  test("status:200, Should get all topics with the corrrect data", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        body.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });

  test("status:200, Should return the correct data", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body[0].slug).toBe("mitch");
        expect(body[0].description).toBe("The man, the Mitch, the legend");
      });
  });

  test("status:200, Should return the correct data in the correct order", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body[1]).toMatchObject({
          description: "Not dogs",
          slug: "cats",
        });
      });
  });
});
