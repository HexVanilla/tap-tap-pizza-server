const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const originPath = ['https://www.taptapizza.com', 'https://taptapizza.com'] //['https://www.taptapizza.com', 'https://taptapizza.com'] - http://localhost:5173

const app = express()
app.use(
  cors({
    origin: originPath,
    credentials: true,
    methods: ['GET', 'POST'],
  })
)
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    credentials: true,
    methods: ['GET', 'POST'],
    origin: originPath,
  },
})

module.exports = { express, app, httpServer, io }
