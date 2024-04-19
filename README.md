# Northcoders News API

#ACCESSING THE DATABASE LOCALLY
To access the datbase locally, one must add test and development environment variables with the database names where apprapriate to successfully connect to the database.

To create these enviroment variables, you should create the following files, .env.test and .env.development which sjould individually contain "PGDTATABASE=<test_databse_name>" and "PGDTATABASE=<dev_databse_name>" respectively. replace the text in <> inclusive with the databse names.

<!-- Project Summary -->

This project is a backend API project that interracts with a psql database to manage and retrieve data grouped into articles, comments,users and topics tables by interracting with various endpoints:
GET /api/topics: Retrieves all topics.
GET /api : Provides information about all available API endpoints.
GET /api/articles/:article_id: Retrieves an article by its ID.
GET /api/articles : Retrieves all articles and includes comment count (with feature request).
GET /api/articles/:article_id/comments: Retrieves all comments for a specific article.
POST /api/articles/:article_id/comments: Adds a comment to an article.
PATCH /api/articles/:article_id: Updates an article's vote count.
DELETE /api/comments/:comment_id: Deletes a comment by its ID.
GET /api/users: Retrieves all users.

- GET /api/articles (topic query): Filters articles by a specified topic (query parameter).

1. Cloning the repository
   Ensure that git is install
   clone the repository to your local machine // git clone <url>
2. Environment Variables
   The project uses 3 environment variable for production(.env.production), development (.env.development)and testing(.env.test). They conatain the DATABASE_URL=<database> with production having its <database> asigned to the elephant url where the database resides. Test and development asigned to nc_news_test and nc_news respectively.

3. seeding
   Install npm
   check the package json file and run the database scripts setup and seed js files. Install any packages when promted to.

4. the project was created on the following dependencies and their versions
   and node version: "version": "1.0.0" as the minimum version required.
   "dependencies": {
   "express": "^4.19.2",
   "dotenv": "^16.0.0",
   "pg": "^8.7.3"
   },

5. Hosted Link

https://ziyardeen-nc-news-be-project.onrender.com
