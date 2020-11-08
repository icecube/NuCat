require('dotenv').config()
const mongoose = require('mongoose')
// const findOrCreate = require("mongoose-findorcreate")
const Schema = mongoose.Schema

const eventSchema = new Schema(
    {
        _id: String,
        "Name": String,
        "Time MJD": [String],
        "Energy": [String],
        "Position PD": String,
        "Type": [String],
        "Track PD": String,
        "Dec 50%": [String],
        "Comment": [String],
        "Type PD": String,
        "img": [String],
        "Reference": [String],
        "Dec 90%": [String],
        "RA": [String],
        "Dec": [String],
        "Link": [String],
        "Time UTC": [String],
        "RA 50%": [String],
        "Pub Date": [String],
        "Pub Type": [String],
        "RA 90%": [String],
        "Time PD": String,
        "Energy PD": String,
    },
    { collection: process.env.COLLECTION }
)
// eventSchema.plugin(findOrCreate);

module.exports = mongoose.model('Event', eventSchema);