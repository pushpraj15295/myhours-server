
require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.error('Unable to connect to the database. Error:', error.message);
    process.exit(1); 
  }
};

module.exports = {
  connectToDatabase,
};
