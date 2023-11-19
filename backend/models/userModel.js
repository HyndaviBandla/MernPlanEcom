import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
      // So that's going to be a Boolean value and the default is going to be false.So in order to make an admin, we specifically have to go into the database and change that value to true.
    },
  },
  {
    timestamps: true,
    // In Mongoose, the timestamps: true option is used when defining a schema to automatically add two fields to each document: createdAt and updatedAt. These fields are used to track when a document is created and when it was last updated
  }
);
// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};
// dot pre because what that does is it allows us to do something before it's saved in the database.
// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); //f this is not modified password, then we're just going to call the next piece of middleware because that's what this is  middleware for Mongoose.
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);
export default User;
