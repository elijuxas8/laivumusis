const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = new Server(server);

const rooms = {};

io.on("connection", (socket) => {
    console.log("Prisijungė:", socket.id);

    socket.on("join_room", (roomId) => {
        if (!rooms[roomId]) rooms[roomId] = [];
        if (rooms[roomId].length >= 2) {
            socket.emit("room_full");
            return;
        }

        rooms[roomId].push(socket.id);
        socket.join(roomId);
        socket.emit("room_joined", roomId);
        console.log(`Žaidėjas ${socket.id} prisijungė prie kambario ${roomId}`);

        if (rooms[roomId].length === 2) {
            io.to(roomId).emit("start_game");
        }
    });

    socket.on("shoot", ({ roomId, x, y }) => {
        socket.to(roomId).emit("opponent_shot", { x, y });
    });

    socket.on("disconnect", () => {
        for (const roomId in rooms) {
            rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
            io.to(roomId).emit("player_left");
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Serveris veikia ant ${PORT}`));
