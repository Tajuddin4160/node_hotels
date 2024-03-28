const mongoose = require("mongoose");
const MONGOURL = process.env.DB_URL;
//const MONGOURL = process.env.DB_URL_LOCAL;
mongoose.connect(MONGOURL, {
    useNewUrlParser: false,
    useUnifiedTopology: false
}
)

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongodb server')
})

db.on('error', (err) => {
    console.error('mongodb connection error', err);

})

db.on('disconnected', () => {
    console.log('disconnected mongodb');
})

module.exports = db;