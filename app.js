const express = require('express');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');

require('dotenv').config();
const app = express();
const connectDB = require('./server/database/db');
const errorHandler = require('./server/middlewares/errorHandler');

//for request body
app.use(express.json());

//cookie parser
app.use(cookieParser());

//file uploader
app.use(fileupload());

//route import
const authRoute = require('./server/routes/auth');
const userRoute = require('./server/routes/userProfile');
const categoryRoute = require('./server/routes/category');
const productRoute = require('./server/routes/product');

//middleware should be require only during development face
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  const colors = require('colors');
  app.use(morgan('tiny'));
  colors.setTheme({ success: 'rainbow', error: 'red' });
}

//database connection
connectDB();

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);

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
