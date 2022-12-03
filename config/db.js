// import mongoose
const mongoose = require('mongoose');

// define an asynchronouse function that initiates DB connection
const initiateDBConnection = async () => {
    try {
        // call connect() method in mongoose.
        // the method expects the connection URI which we stored as an environment variable.
        await mongoose.connect(process.env.MONGO_CONNECTION_URI);
        
    }
}