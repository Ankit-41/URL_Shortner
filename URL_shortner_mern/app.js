const express = require('express');
const app = express();
const Short_Ner = require("./models/Short_Ner");
const shortNers = require('./routes/shortNers');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(express.static('./public'));
app.use(express.json());



app.use('/api/v1/shortNers', shortNers);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port =  5000;
const connectionString='mongodb+srv://KRAKEN41:12345@cluster.0qligem.mongodb.net/03-url-short?retryWrites=true&w=majority'
const start = async () => {
  try {
    await connectDB(connectionString);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
