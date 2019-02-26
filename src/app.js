import http from 'http'
import { env, mongo, port, ip, /* apiRoot */ } from './config'
//import mongoose from './services/mongoose'
// import express from './services/express'
import express from 'express'
//import api from './api'
import io from 'socket.io'
import { EventEmitter} from 'events'
import { MessageBUS } from  './messageProcessor'

// const app = express(apiRoot, api)
const app = express()
const server = http.createServer(app)
const sIo = io(server)

sIo.on('connect', (socket) => {
  console.log('connected', socket.id)

const mb = MessageBUS()
mb.registerSocket(socket)

  socket.on('disconnect', () => {
    console.log('disconnected')
    // externalEvent.removeListener('msgFor' + socket.id, evSoHandler)
    mb.emit('msgFrom', {
      from: socket.id,
      msg: 'chau'
    })
  })

  socket.on('message', (msg) => {
    console.log(msg)
    mb.emit('msgFrom', {
      from: socket.id,
      msg: msg
    })
  })
})


//mongoose.connect(mongo.uri, { useMongoClient: true })
// mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
