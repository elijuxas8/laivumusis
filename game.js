/*
const socket = io();
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const size = 10;
const cellSize = 30;
let roomId = "";

function joinRoom() {
    roomId = document.getElementById("roomId").value;
    socket.emit("join_room", roomId);
}

socket.on("room_joined", () => {
    console.log("Prisijungta prie kambario");
});

socket.on("start_game", () => {
    document.getElementById("game").style.display = "block";
    drawBoard();
});

canvas.addEventListener("click", (e) => {
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);
    socket.emit("shoot", { roomId, x, y });
});

socket.on("opponent_shot", ({ x, y }) => {
    ctx.fillStyle = "red";
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    document.getElementById("shootSound").play();
});

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}
*/
