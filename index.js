const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { config } = require("dotenv");

config();
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: { ssl: { require: true } }
});

// Set up the models
const Author = require('./models/author')(sequelize, DataTypes);
const Book = require('./models/book')(sequelize, DataTypes);

// Create a new Express application
const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.send("Hello World! This is a book catalog.");
});

app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).send("Error fetching authors");
  }
});

app.get("/books/:author_id", async (req, res) => {
  const authorId = parseInt(req.params.author_id);
  try {
    const books = await Book.findAll({
      where: {
        authorId: authorId
      }
    });
    res.json(books);
  } catch (error) {
    console.error("Error fetching books for author:", error);
    res.status(500).send("Error fetching books for author");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
