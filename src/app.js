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

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello Kartik");
});

export default server;
