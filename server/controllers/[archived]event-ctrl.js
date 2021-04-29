require('dotenv').config()
const auth = require('basic-auth')
const compare = require('tsscmp')
const Event = require('../models/event-model')

createEvent = (req, res) => {
    var body = req.body
    // if nothing post
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Event',
        })
    }
    // basic auth
    const credentials = auth(req)
    if (!credentials || !compare(credentials.name, process.env.USERNAME) || !compare(credentials.pass, process.env.PASS)) {
        return res.status(401).json({ success: false, error: "Access denied." })
    }
    // get model
    const event = new Event(body)
    if (!event) {
        return res.status(400).json({ success: false, error: "Invalid schema." })
    }
    // identity and schema passed -> DB
    event
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: event._id,
                message: 'Event created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Event not created!',
            })
        })
}

// updateMovie = async (req, res) => {
//     const body = req.body

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a body to update',
//         })
//     }

//     Movie.findOne({ _id: req.params.id }, (err, movie) => {
//         if (err) {
//             return res.status(404).json({
//                 err,
//                 message: 'Movie not found!',
//             })
//         }
//         movie.name = body.name
//         movie.time = body.time
//         movie.rating = body.rating
//         movie
//             .save()
//             .then(() => {
//                 return res.status(200).json({
//                     success: true,
//                     id: movie._id,
//                     message: 'Movie updated!',
//                 })
//             })
//             .catch(error => {
//                 return res.status(404).json({
//                     error,
//                     message: 'Movie not updated!',
//                 })
//             })
//     })
// }

// deleteMovie = async (req, res) => {
//     await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }

//         if (!movie) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Movie not found` })
//         }

//         return res.status(200).json({ success: true, data: movie })
//     }).catch(err => console.log(err))
// }

getEventById = async (req, res) => {
    await Event.findOne({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!event) {
            return res
                .status(404)
                .json({ success: false, error: `Event not found` })
        }
        return res.status(200).json({ success: true, data: event })
    }).catch(err => console.log(err))
}

getEvents = async (req, res) => {
    await Event.find({}, (err, events) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!events.length) {
            return res
                .status(404)
                .json({ success: false, error: `Events not found` })
        }
        return res.status(200).json({ success: true, data: events })
    }).catch(err => console.log(err))
}

module.exports = {
    createEvent,
    // createMovie,
    // updateMovie,
    // deleteMovie,
    getEvents,
    getEventById,
}