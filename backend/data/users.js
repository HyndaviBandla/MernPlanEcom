import bcrypt from "bcryptjs";
const users = [
  {
    name: "Hyndavi",
    email: "hyndavibandla35@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    // hashing will be done,So basically the higher the number(we used 10), the more secure the hash will be, but the longer it will take.
    isAdmin: "true",
  },
  {
    name: "likitha",
    email: "likki@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: "false",
  },
  {
    name: "shafiya",
    email: "shafi@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: "false",
  },
  {
    name: "kalyan",
    email: "srinivas@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: "false",
  },
  {
    name: "satwik",
    email: "vemula@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: "false",
  },
];
export default users;
