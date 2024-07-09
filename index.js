const express =require('express')
const app = express()
const port = 3001
const http = require('http')
const cors =require('cors')
const {Server} =require("socket.io")


app.use(cors())

const server =http.createServer(app)

const io = new Server(server,{
    cors: {
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
console.log("user connected",socket.id)

socket.on('joinRoom',(data)=>{
    socket.join(data)
})




    socket.on('send_message',(data)=>{
console.log(data,'its data')
// socket.broadcast.emit('reccieve',data)
socket.to(data.room).emit('reccieve',data)
})
})



server.listen(port,()=>{
    console.log(`running on ${port}`)
}) 