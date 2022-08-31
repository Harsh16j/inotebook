const connectToMongo=require("./db");
const express = require('express')
const cors = require('cors') //To handle the CORS error in the browser for making request to the backend API

// Connect to mongoDB
connectToMongo()

const app = express()
const port = 5000

// Middleware for receiving body from an API request
app.use(express.json())

// Middleware for enabling CORS
app.use(cors())

//Available Routes
app.use('/api/auth',require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})