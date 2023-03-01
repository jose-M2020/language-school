import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { ALLOWED_ORIGINS, PORT } from "./config.js";
import router from "./routes/index.js"
import "./db.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: ALLOWED_ORIGINS
}));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use('/api', router);

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));