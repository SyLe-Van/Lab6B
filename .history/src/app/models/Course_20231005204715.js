const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Course = new Schema({

    name: String,
    description: String,
    image: String,
    createAt: {type: Date, default: Data.now},
    updateAt: {type: Date, default: Data.now},
  });