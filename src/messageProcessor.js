import { EventEmitter } from 'events'


class EventBus extends EventEmitter {
    constructor() {
        super()
        this.users = []
        console.log('subscribing to events')
        this.on('msgFrom', (load) => {
            const others = this.users.filter(usr =>  usr != load.from )
            others.map((oth) => {
                console.log(`message from ${load.from} - content: ${load.msg}`)
                this.emit('msgFor' + oth, load.msg + ' echoed - from: '+ load.from)
            })
        })
    }

    messageSenderHandler(socket) {
        return (data) => {
            console.log('message for socket.id ', data)
            socket.emit("message", "Gatcha! " + data)
        }
    }

    addUser(user) {
        this.users.push(user)
    }

    registerSocket(socket) {
        this.addUser(socket.id)
        this.on('msgFor' + socket.id, this.messageSenderHandler(socket))
    }

/*     unregisterSocket(socket) {
        this.removeListener('msgFor'+ socket.id, this.)
    } */
}
const eb = new EventBus()
const MessageBUS = ( ) => eb
export { MessageBUS }