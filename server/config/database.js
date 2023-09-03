const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
    mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('connected to DB successfully')
        })
        .catch((error) => {
            console.log('error while connecting to db')
            console.error(error)
            process.exit(1)
        })
} 