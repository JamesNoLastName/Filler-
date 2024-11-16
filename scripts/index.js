const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname)));

io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("eventName", (data) => {
        console.log(`Received data: ${data}`);
        
        socket.emit("responseEvent", { message: "Response data" });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve("index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
