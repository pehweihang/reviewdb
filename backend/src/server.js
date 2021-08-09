const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    user: process.env.MONGO_USER, 
    pass: process.env.MONGO_PASSWORD
})

const PORT = process.env.PORT || 3000;



//Routes
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(PORT, () => { 
console.log(`Server running on port ${PORT}`);
})
