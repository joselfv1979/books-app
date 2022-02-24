import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connect } from "./db/connect";
import loginRouter from "./routes/LoginRoutes";
import usersRouter from "./routes/userRoutes";
import booksRouter from "./routes/bookRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { createAdminUser } from "./utils/createAdmin";

if (!process.env.PORT) {
  process.exit(1);
}

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create admin app utility
createAdminUser();

// Routes
app.use("/api/login", loginRouter)
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);

// Error handler middleware 
app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT as string, 10);

connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
