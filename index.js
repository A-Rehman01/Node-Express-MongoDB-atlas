const express = require('express');
const mongoose = require('mongoose');
const app = express();
const postRouter = require('./routes/post');
var bodyParser = require('body-parser')
var cors = require('cors')

//MiddleWare
app.use(cors());

//middleware post for Body parser
// app.use(express.json());
app.use(bodyParser.json())


//ADD env config
require('dotenv').config()


//Routes Midddleware
//Post_route
app.use('/posts', postRouter);

app.get('/', (req, res) => {
    res.send('Ok')
})

//connect DB
mongoose.connect(process.env.mongoConnection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => {
        console.log('Connected to DB')
    })


const PORT = process.env.PORT || process.env.locolhost

app.listen(PORT, () => console.log(`Port Listening in ${PORT}`))