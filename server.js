const dotenv = require('dotenv');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const mongodb = require('./model/database');
const routes = require('./routes');
const swaggerDocument = require('./swagger');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      message: 'Invalid JSON in request body',
    });
  }

  return next(error);
});

mongodb.initDb((error) => {
  if (error) {
    console.error('Database failed:', error);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`running on port ${port}`);
  });
});
