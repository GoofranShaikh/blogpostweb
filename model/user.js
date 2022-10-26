const mongoose = require("mongoose"); //importing mongoose

const userSchema = new mongoose.Schema({     //defining schema object to be stored in mongoDB collection
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String}
});

module.exports = mongoose.model("blogUser", userSchema); //Create model with 'blogUser' as collection name inside mongoDB