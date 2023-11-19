// JS So this is going to be the script that we run that will seed all of our data.
import mongoose from "mongoose";
import dotenv from "dotenv"; //And the reason for this is because we need the the mongo Uri obviously because we're importing the data.
// Just think of this, this file is completely separate from the rest of our application.
// We're just running it from the command line.Like literally we could say Node and then Cedar and run the file.
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // So before we import any products or users, we want to delete them all.

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    // Now when we insert the products from products JS, they have to have a user and obviously we want the admin to be that user because those are the only users that can create products.

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    }); // variable that's going to hold the products that we're going to insert.

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  // Because every  mongoose method that you call is going to return a promise.
  // So we need to use async await or you could get rid of a wait and you could do, you know, delete many

  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
// npm run data:import
// and npm run data:destroy in terminal since used     "data:import": "node backend/seeder.js", "data:destroy": "node backend/seeder.js -d" in package.json
// so no need to use node backend/seeder    and node backend/seeder -d
