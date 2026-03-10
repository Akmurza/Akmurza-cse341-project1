const dotenv = require('dotenv');
const express = require('express');
const mongodb = require('./model/database');
const routes = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

mongodb.initDb((error) => {
  if (error) {
    console.error('Database failed:', error);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`running on port ${port}`);
  });
});
