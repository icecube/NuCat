require('dotenv').config()
const auth = require('basic-auth')
const compare = require('tsscmp')
const { Candidate, Info } = require('../models')

createCandidate = (req, res) => {
    var body = req.body
    // if nothing post
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Candidate',
        })
    }
    // basic auth
    const credentials = auth(req)
    if (!credentials || !compare(credentials.name, process.env.USERNAME) || !compare(credentials.pass, process.env.PASS)) {
        return res.status(401).json({ success: false, error: "Access denied." })
    }
    // get model
    const candidate = new Candidate(body)
    if (!candidate) {
        return res.status(400).json({ success: false, error: "Invalid schema." })
    }
    // identity and schema passed -> DB
    candidate
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: candidate._id,
                message: 'Candidate created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Candidate not created!',
            })
        })
}

updateCandidate = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    // basic auth
    const credentials = auth(req)
    if (!credentials || !compare(credentials.name, process.env.USERNAME) || !compare(credentials.pass, process.env.PASS)) {
        return res.status(401).json({ success: false, error: "Access denied." })
    }

    Candidate.findOne({ _id: req.params.id }, (err, candidate) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Candidate not found!',
            })
        }
        // TODO if run_id/event_id get changed
        // the candidate associated will be changed as well
        // candidate.run_id = body.run_id
        // candidate.event_id = body.event_id
        // currently those two ids are not allowed to be changed
        // so NO candidate = body
        // not sure
        // candidate.infos = body.infos
        const { run_id, event_id, infos, ...tmp } = body;
        candidate = tmp;
        candidate
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: candidate._id,
                    message: 'Candidate updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Candidate not updated!',
                })
            })
    })
}

deleteCandidate = async (req, res) => {
    // basic auth
    const credentials = auth(req)
    if (!credentials || !compare(credentials.name, process.env.USERNAME) || !compare(credentials.pass, process.env.PASS)) {
        return res.status(401).json({ success: false, error: "Access denied." })
    }
    await Candidate.findOneAndDelete({ _id: req.params.id }, (err, candidate) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!candidate) {
            return res
                .status(404)
                .json({ success: false, error: `Candidate not found` })
        }
        // TODO: delete all associated infos
        return res.status(200).json({ success: true, data: candidate })
    }).catch(err => console.log(err))
}

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
/**
 * Retrieve all candidates (default values)
 */
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
    createCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidates,
    getCandidateById,
}