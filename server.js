require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const port = process.env.PORT || 3001
const dbUri = process.env.DB_URI

//middlewares
app.use(cors())
app.use(express.json())

//db
mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    if (res) console.log('DB connected')
  })
  .catch((err) => console.log(err))
mongoose.set('useFindAndModify', false)

app.listen(port, (err) => {
  if (err) return console.log(err)
  console.log(`Server started at ${port}`)
})

//routes
app.use('/api/user', require('./api/routes/user'))
app.use('/api/post', require('./api/routes/post'))
app.use('/api/comment', require('./api/routes/comment'))

// redirect vue routes in production build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist/spa')))
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/dist/spa', 'index.html'))
  })
}
