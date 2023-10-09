const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(
  cors({
    origin: 'https://elconejo.info',
    credentials: true,
    methods: ['GET', 'POST'],
  })
)
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    credentials: true,
    methods: ['GET', 'POST'],
    origin: 'https://elconejo.info', //localhost:5173
  },
})

module.exports = { express, app, httpServer, io }
