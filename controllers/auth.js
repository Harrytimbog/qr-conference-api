const register = async (req, res) => {
  res.send("register user");
};

const logout = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
