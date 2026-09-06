const bcrypt = require("bcryptjs");

const password = "faizan@123s";

const hashPassword = async () => {
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Hashed Password:");
  console.log(hashedPassword);
};

hashPassword();