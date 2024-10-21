const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.resolve("public"))); // Adjust path as needed

// Socket.IO connection
io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Placeholder for handling events
    socket.on("eventName", (data) => {
        // Handle the event here
        console.log(`Received data: ${data}`);
        
        // Emit a response if needed
        socket.emit("responseEvent", { message: "Response data" });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Serve the main HTML page
app.get("/", (req, res) => {
    res.sendFile(path.resolve("index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
