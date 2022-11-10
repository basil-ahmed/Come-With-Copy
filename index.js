let express = require("express");
let app = express();
app.use("/", express.static("public"));

let messages = {}

let activities = [];

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);
let port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

//logic for public namespace
io.on("connect", (socket) => {

    console.log("New Connection : ", socket.id);

    activities.forEach((e) => {
        socket.emit("activity", e)
    })

    socket.on('joinroom', (data) => {
        console.log(io.sockets.adapter.sids);
        if(socket.room) {
            socket.leave(socket.room);
        }
        socket.join(data.room);
        socket.room = data.room;
        if (!messages[socket.room]) {
            messages[socket.room] = [];
        }
        socket.emit('messages',messages[socket.room]);
    })

    //on receiving message from the client - add it to the appropriate data object + send it all other clients in the room
    socket.on('message', (data) => {
        //add this message to the data object
        if(socket.room) {
        messages[socket.room].push(data.message);
        //send to all other clients in this room
        io.to(socket.room).emit('message',{
            'message' : data.message
        })
        }

    })

    socket.on("activity", (data) => {

        if (activities.indexOf(data) == -1) {
            activities.push(data);
        }

        io.emit("activity", {
            activity: data.activity,
            category: data.category})
    })
  
    // for when C disconnects
    socket.on("disconnect", () => {
      console.log("Socket Disconnected : ", socket.id);
    })
  
})