import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" })); // for JSON data and set limit
app.use(express.urlencoded({ extended: false, limit: "16kb" })); // for URL-encoded data
app.use(express.static("public")); // for static files anyone can access
app.use(cookieParser()); // for parsing cookies

import userRouter from './routes/user.router.js';

app.use("/api/v1/users", userRouter);

export { app };