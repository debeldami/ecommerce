const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./server/database/db');

//route import
const userRoutes = require('./server/routes/user');

//middleware should be require only during development face
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  const colors = require('colors');
  app.use(morgan('tiny'));
  colors.setTheme({ success: 'rainbow', error: 'red' });
}

//database connection
connectDB();

app.use('/', userRoutes);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development')
    console.log(
      `server in ${process.env.NODE_ENV} mode running at port ${PORT}`.success
    );
});

//handling promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`.error);
  server.close(() => process.exit(1));
});
