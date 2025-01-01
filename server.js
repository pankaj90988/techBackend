require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Handling Cors Policy
const cors = require('cors');
app.use(cors());
var corsOptions = {
  origin: 'http://localhost:5173',
  method: "GET, POST, PUT, DELETE, PATH, HEAD",
  CredentialS: true,
  optionsSuccessStatus: 200
}

//addingh api end points and route
const authRoute = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require("./router/service-router");
const connectDb = require("./utils/db")
app.use(express.json());//middleware=> means we can use json in this application


app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);


// const PORT = 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`);
  });
});