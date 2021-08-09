const express = require('express')
const mongoose = require('mongoose')
const testRoutes = require('./routes/testRoutes.js')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.ysint.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(testRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})