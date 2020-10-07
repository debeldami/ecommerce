const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();
const connectDB = require('./server/database/db');
const errorHandler = require('./server/middlewares/errorHandler');

//for request body
app.use(express.json());

//cookie parser
app.use(cookieParser());

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
app.use(errorHandler);

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
