require('dotenv').config()
const auth = require('basic-auth')
const compare = require('tsscmp')
const { Event, Candidate, Info } = require('../models')

// createInfo = (req, res) => {
//     var body = req.body
//     // if nothing post
//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide an Info',
//         })
//     }
//     // basic auth
//     const credentials = auth(req)
//     if (!credentials || !compare(credentials.name, process.env.USERNAME) || !compare(credentials.pass, process.env.DB_PASS)) {
//         return res.status(401).json({ success: false, error: "Access denied." })
//     }
//     // get model
//     const info = new Info(body)
//     if (!info) {
//         return res.status(400).json({ success: false, error: "Invalid schema." })
//     }
//     // identity and schema passed -> DB
//     info
//         .save()
//         .then(() => {
//             return res.status(201).json({
//                 success: true,
//                 id: info._id,
//                 message: 'Info created!',
//             })
//         })
//         .catch(error => {
//             return res.status(400).json({
//                 error,
//                 message: 'Info not created!',
//             })
//         })
// }

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

/**
 * Retrieve a Candidate by id and populate its Infos
 */
getCandidateById = async (req, res) => {
    try {
        await Candidate.findOne({ _id: req.params.id })
            .populate('infos')
            .exec(function (err, candidate) {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!candidate) {
                    return res
                        .status(404)
                        .json({ success: false, error: `Candidate not found` })
                }
                return res.status(200).json({ success: true, data: candidate })
            });
    } catch (err) {
        console.log(err)
    }
}

getCandidates = async (req, res) => {
    await Candidate.find({}, (err, candidates) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!candidates.length) {
            return res
                .status(404)
                .json({ success: false, error: `candidates not found` })
        }
        return res.status(200).json({ success: true, data: candidates })
    }).catch(err => console.log(err))
}

module.exports = {
    // createCandidate,
    // updateMovie,
    // deleteMovie,
    getCandidates,
    getCandidateById,
}