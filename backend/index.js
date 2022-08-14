const connectToMongo=require("./db");
const express = require('express')

// console.log(typeof connectToMongo())
connectToMongo()


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Harsh!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})