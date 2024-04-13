import express from "express";
import routes from "./api/routes/routes";
import dotenv from "dotenv";
import "reflect-metadata";
import cors from "cors";

import globalErrorHandlerModel from "./api/models/global-error-handler.model";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use("/", routes);

app.get("/ping", (_req, res) => {
  res.send("Service is responding to Ping");
});

app.all("*", (req, res) => {
  res.status(404).send(`Error: Api not found in for route "${req.url}"`);
});

app.use(globalErrorHandlerModel);

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
