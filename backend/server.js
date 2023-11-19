// import express from "express";
// import products from "./data/products.js";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// const app = express();

// dotenv.config();
// const port = process.env.PORT || 4000;
// connectDB();
// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);

// app.use(errorHandler);
// app.use(notFound);
// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 4000;

connectDB(); //connect to mongodb

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie parser middle ware
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
