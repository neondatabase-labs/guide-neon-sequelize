const { Sequelize, DataTypes } = require("sequelize");
const { config } = require("dotenv");

config();
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

const Author = require('./models/author')(sequelize, DataTypes);
const Book = require('./models/book')(sequelize, DataTypes);

const seedDatabase = async () => {
  const author = await Author.create(
    { name: 'J.K. Rowling', bio: 'The creator of the Harry Potter series' }
  );
  await Book.create({ title: 'Harry Potter and the Philosopher\'s Stone', authorId: author.id });
  await Book.create({ title: 'Harry Potter and the Chamber of Secrets', authorId: author.id });

  const author2 = await Author.create(
    { name: 'J.R.R. Tolkien', bio: 'The creator of Middle-earth and author of The Lord of the Rings.' }
  );
  await Book.create({ title: 'The Hobbit', authorId: author2.id });
  await Book.create({ title: 'The Fellowship of the Ring', authorId: author2.id });
  await Book.create({ title: 'The Two Towers', authorId: author2.id });
  await Book.create({ title: 'The Return of the King', authorId: author2.id });

  const author3 = await Author.create(
    { name: 'George R.R. Martin', bio: 'The author of the epic fantasy series A Song of Ice and Fire.' }
  );
  await Book.create({ title: 'A Game of Thrones', authorId: author3.id });
  await Book.create({ title: 'A Clash of Kings', authorId: author3.id });

  await sequelize.close();
};

seedDatabase();