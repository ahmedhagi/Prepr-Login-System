const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },

      first_name: {
        type: String,
        required: [true, "Please provide a First Name"],
        unique: false,
      },

      last_name: {
        type: String,
        required: [true, "Please provide a Last Name"],
        unique: false,
      },

      user_name: {
        type: String,
        required: [true, "Please provide Username"],
        unique: false,
      },

      user_type: {
        type: String,
        required: [true, "Please provide a User Type"],
        unique: false,
      },

      language: {
        type: String
      },
      
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);

