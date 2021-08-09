const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
        // if (value.length) throw new Error("Negative calories aren't real.");
      },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
        // if (value < 0) throw new Error("Negative calories aren't real.");
      },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
        // if (value < 0) throw new Error("Negative calories aren't real.");
      },
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;