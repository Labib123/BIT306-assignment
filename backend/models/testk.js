const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
  name: {type: String, required:true},
  stock: {type: Number, required:true}
});

module.exports = mongoose.model('TestK',  postSchema);
