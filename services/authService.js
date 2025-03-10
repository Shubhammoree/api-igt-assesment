const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerService = async (data) => {
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const user = new User(data);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

exports.loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
