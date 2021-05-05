require('dotenv').config()
const mongoose = require('mongoose')

let db_url = 'mongodb'
if (process.env.DB_SRV != "false") {
    db_url += '+srv'
}
let db_url_log = db_url+`://XXXX:XXXX@${process.env.DB_ADDRESS}/${process.env.DB_NAME}?retryWrites=true&w=majority`
db_url += `://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_ADDRESS}/${process.env.DB_NAME}?retryWrites=true&w=majority`

console.log("Connecting to MongoDB via "+db_url_log)

mongoose
    .connect(db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db