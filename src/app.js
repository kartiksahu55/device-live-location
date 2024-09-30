import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

io.on("connection", (socket) => {
    console.log("Connected")
    socket.on("send-location", (data) => {
      socket.emit("receive-location", { id: socket.id, ...data });
    });
  });

app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

export default server;
