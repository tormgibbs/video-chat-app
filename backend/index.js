const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.use(cors())


const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on('connection', (socket) => {
  console.log('connected')
  socket.emit('me', socket.id)

  socket.on('disconnect', () => {
    console.log('disconnected')
    socket.broadcast.emit('callEnded')
  })

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name })
  })

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal)
  })
})


server.listen(PORT, () => console.log(`Server started on port ${PORT}`))

