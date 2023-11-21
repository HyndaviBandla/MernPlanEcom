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
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
const port = process.env.PORT || 4000;

connectDB(); //connect to mongodb

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cookie parser middle ware
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
