import express from "express";
import { DB } from "./config/database";
import { ENV } from "./constants/environment";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.route";
import expenseRoutes from "./routes/expense.route";
import marketRoutes from "./routes/market.route";
import userRoutes from "./routes/user.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ENV.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/market", marketRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

app.listen(4000, async () => {
  console.log(`Server Running on ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
  await DB.connect();
});
