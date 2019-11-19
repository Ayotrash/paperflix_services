const mongoose = require('mongoose');
/* const keys = require('./keys'); */

function mongoConnection(env) {
  if (env == 'development') {
    mongoose.connect(process.env.MONGODB_SERVER_DEV, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB for Development was connected');
  } else {
    mongose.connect(process.env.MONGODB_SERVER_PROD, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB for Production was connected');
  }
}

module.exports = mongoConnection;