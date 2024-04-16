const request = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endpoints = require("../endpoints.json");

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

describe("/api", () => {
  test("status 200: Should return the constent of the endpoints.json file", () => {
    request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject(endpoints);
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET:200 sends a single article object to the client", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.author).toBe("butter_bridge");
        expect(body.title).toBe("Living in the shadow of a great man");
        expect(body.article_id).toBe(1);
        expect(body.body).toBe("I find this existence challenging");
        expect(body.topic).toBe("mitch");
        expect(typeof body.created_at).toBe("string");
        expect(body.votes).toBe(100);
        expect(body.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("GET:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });

  test("GET:400 sends an appropriate status and error message when given an invalid article id", () => {
    return request(app)
      .get("/api/articles/not-a-team")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
});
