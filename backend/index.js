const connectToMongo=require("./db");
const express = require('express')

// Connect to mongoDB
connectToMongo()

const app = express()
const port = 5000

// Middleware for receiving body from an API request
app.use(express.json())

//Available Routes
app.use('/api/auth',require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})