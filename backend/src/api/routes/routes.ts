import express from "express";
import UserRoute from "./user.routes";
import CategoryRoute from "./category.routes";

const app = express();

app.use("/users", UserRoute());
app.use("/categories", CategoryRoute());

export default app;
