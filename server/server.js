const express = require('express')
const proxy = require('express-http-proxy')
const path = require('path');

const PORT = process.env.PORT || 3000
const API = 'http://localhost:3001'

const APP_DIR = path.resolve('./app');

const app = express()

app.use('/api', proxy(API));
app.use(express.static(APP_DIR))
app.use((_req, res) => {
  res.sendFile(APP_DIR + '/index.html');
})

app.listen(PORT, () => console.log('Server listening on port', PORT))
