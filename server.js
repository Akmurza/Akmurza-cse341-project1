const dotenv = require('dotenv');
const express = require('express');
const mongodb = require('./data/database');
const routes = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/', routes);

mongodb.initDb((error) => {
  if (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
