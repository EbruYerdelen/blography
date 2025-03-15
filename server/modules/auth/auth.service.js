require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("./user.model");
const jwt = require("jsonwebtoken");


const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const createUser = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);
  return await User.create(userData);
};

const comparePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const options = { expiresIn: "1hr" };
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    secretKey,
    options
  );
};


const updateUserPassword = async (userId, newPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  return await User.findByIdAndUpdate(
    userId,
    { password: hashedNewPassword },
    { new: true }
  );
};

const findUserById = async (id) => {
  return await User.findById(id);
}

const findUserByIdAndDelete = async (id) => {
  return await User.findByIdAndDelete(id)
}


module.exports = {
  findUserByEmail,
  createUser,
  comparePassword,
  generateToken,
  updateUserPassword,
  findUserById,
  findUserByIdAndDelete,
};
