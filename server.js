const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const socketio = require("socket.io");
const formatMessage = require('./utils/messages');



const { v4: uuidv4 } = require("uuid");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use("/peerjs", peerServer);
//create room id
app.get("/", (req, rsp) => {
    rsp.redirect(`/${uuidv4()}`);
  });

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});
const botName = 'Admin';

io.on('connection', socket =>{

  //welcome current user
  socket.emit('message', formatMessage(botName,'Welcome to VideoPhone!'));
  //broadcast when user connects
  socket.broadcast.emit('message', formatMessage(botName, 'A new user has joined'));

  //listen for chatMessage
  socket.on('chatMessage', msg => {
    io.emit('message', formatMessage('User',msg));
  })

  //runs when client disconnects
  socket.on('disconnect',() =>{
    io.emit('message', formatMessage(botName,'A user has left'));
  });
});

server.listen(3030);




