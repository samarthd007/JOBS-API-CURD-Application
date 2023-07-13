require('dotenv').config();
require('express-async-errors');
const body_parser=require('body-parser')
const express = require('express');
const app = express();

//database
const connectDB=require('./db/connect')
const authenticateUser=require('./middleware/authentication')

//Routers
const authrouter = require('./routes/auth');
const jobsrouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(body_parser.json())
app.use(express.json());
// extra packages

//routes
app.use('/api/v1/auth',authrouter)
app.use('/api/v1/jobs',authenticateUser,jobsrouter) 

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
