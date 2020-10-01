import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import dotenv from "dotenv";

if (process.env.NODE_ENV === "development")
  dotenv.config({ path: "./.env.dev" });
else dotenv.config({ path: "./.env" });

import apiRoute from "./routes/api";

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", apiRoute);

const port = parseInt(process.env.PORT as string) || 5000;
app.listen(port, () => console.log(`started on port ${port}`));
