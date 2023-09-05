const mongoose = require('mongoose');
require('dotenv').config();

exports.connect =() => {
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("connect to db succesffuly"))
    .catch((error) => {
        console.log("connection failed with db")
        console.error(error);
        process.exit(1);
    })
}

