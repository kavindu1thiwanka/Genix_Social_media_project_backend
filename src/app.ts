import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import db from "mongoose";
import routes from "./routes"
import { json, urlencoded } from "body-parser";
import cors from "cors";

const app = express();

// allow CORS
// app.use(cors());

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/", routes);

app.use((error: Error, req: Request, res: Response) => {
  res.status(500).json({ message: error.message });
});

db.connect(process.env.MONGO_DB_URL!)
  .then(() => {
    console.log("Database connected!");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB : ", error.message);
  });
