const mongoose = require('mongoose');const Test = mongoose.model('TestC', {
  name: {
      type: String,
      required: true
  },
});
module.exports = Test;
