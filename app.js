const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

//setup express

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: '*',
  })
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server has started in port: ${PORT}`))

// Setup mongoose

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, async (err) => {
  if (err) throw err
  console.log('Mongodb connection successful')
})

// mongoose.connect(
//   process.env.MONGODB_CONNECTION_STRING,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: false },
//   (err) => {
//     if (err) throw err
//     console.log('Mongodb connection successful')
//   }
// )

// setup routes

app.use('/auth/users', require('./routes/userRouter'))
