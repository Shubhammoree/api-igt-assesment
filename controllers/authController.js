const { registerService, loginService } = require("../services/authService");
const { generateToken } = require("../utils/jwtUtil");

exports.register = async (req, res, next) => {
  try {
    const user = await registerService(req.body);
    const token = generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    const token = generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};
