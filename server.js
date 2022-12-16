const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});


const app = require('./app');


const db = process.env.DATABASE

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(console.log('DB is connected'))


const port = process.env.PORT || 3000;


app.listen(port, () => {})
