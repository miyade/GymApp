const User = require("../models/User");
const bcrypt = require("bcrypt");
module.exports = {
  async createUser(req, res) {
    try {
      const { firstName, lastName, password, email } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          firstName,
          lastName,
          password: hashedPassword,
          email,
        });
        return res.json({
          _id:user._id,
          email:user.email,
          firstName: user.firstName,
          lastName: user.lastName
        });
      }
      return res.status(400).json({
        message: "User already exists! Do you want to login instead?",
      });
    } catch (error) {
      throw Error(`Error while registering new user : ${error}`);
    }
  },


  async getUserById(req, res) {

    const { userId } = req.params;

    try {
      const user = await User.findById(userId)
      return res.json(user)
    } catch (error) {
      return res.status(400).json({
        message:
          "User does not exist, Id was not found, do you want to register? ",
      })
    }
  }
}
