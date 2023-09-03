const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json())
const PORT = process.env.PORT || 4000;

const user = require('./routes/user')
app.use('/api/v1', user)

// cookie parser parderff
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.listen(PORT , () => {
    console.log('listening on port',PORT);
});

require('./config/database').dbConnect();



app.get('/', (req, res) => {
    console.log("<h1>default route</h1>");
})

