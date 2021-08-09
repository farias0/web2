const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postRoutes.js')

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

app.use(userRoutes);
app.use(postRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})