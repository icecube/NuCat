require('dotenv').config()
const mongoose = require('mongoose')

mongoose
    .connect(`mongodb+srv://${process.env.USERNAME}:${process.env.DB_PASS}@nucatgt.jfmfo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db