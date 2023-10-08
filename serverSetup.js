const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    credentials: true,
    methods: ['GET', 'POST'],
    origin: /^https:\/\/tap-tap-pizza-client(-[a-z0-9]+)?\.vercel\.app$/, //localhost:5173
  },
})

module.exports = { express, app, httpServer, io }
