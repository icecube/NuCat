require('dotenv').config()
const auth = require('basic-auth')
const compare = require('tsscmp')
const { Event, Candidate, Info } = require('../models')

createInfo = (req, res) => {
    var body = req.body
    // if nothing post
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Info',
        })
    }
    // basic auth
    const credentials = auth(req)
    if (!credentials || !compare(credentials.name, process.env.USERNAME) || !compare(credentials.pass, process.env.DB_PASS)) {
        return res.status(401).json({ success: false, error: "Access denied." })
    }
    // apply model to get doc
    const info = new Info(body)
    if (!info) {
        return res.status(400).json({ success: false, error: "Invalid schema." })
    }
    // identity and schema passed -> DB
    const conditions = {
        run_id: info.run_id,
        event_id: info.event_id,
    }
    // TODO check if 
    // $track.$type.rev$REV.run$RUNNUM.evt$EVENTNUM 
    // already exists. raise error if does

    info
        .save().then((i) => {
            const cand = {
                name: i.name,
                time: i.time,
                ra: i.ra,
                dec: i.dec,
                ra50plus: i.ra50plus,
                ra50minus: i.ra50minus,
                dec50plus: i.dec50plus,
                dec50minus: i.dec50minus,
                ra90plus: i.ra90plus,
                ra90minus: i.ra90minus,
                dec90plus: i.dec90plus,
                dec90minus: i.dec90minus,
                energy: i.energy,
                type: i.type,
                track: i.track,
                infos: [i.id],
            }
            console.log(cand)
            Candidate
                .findOrCreate(conditions, cand, function (err, doc, created) {
                    if (err) console.log(err);
                    if (!created) {
                        // if not created => candidate already exists
                        Candidate.findOneAndUpdate(conditions, { '$push': { infos: i.id } })
                            .then(console.log("Successfully added one more info into existing candidate"));
                    } else {
                        // if created => candidate did not exist
                        console.log("New candidate created:");
                        console.log(doc);
                    }
                })
        })
        .then(() => {
            return res.status(201).json({
                success: true,
                id: info._id,
                message: 'Info created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Info not created!',
            })
        })
}

updateInfo = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    // basic auth
    const credentials = auth(req)
    if (!credentials || !compare(credentials.name, process.env.USERNAME) || !compare(credentials.pass, process.env.DB_PASS)) {
        return res.status(401).json({ success: false, error: "Access denied." })
    }

    Info.findOne({ _id: req.params.id }, (err, info) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Info not found!',
            })
        }
        // TODO if run_id/event_id get changed
        // the candidate associated will be changed as well
        // info.run_id = body.run_id
        // info.event_id = body.event_id
        info.rev = body.rev
        info.name = body.name
        info.time = body.time
        info.ra = body.ra
        info.dec = body.dec
        info.ra50plus = body.ra50plus
        info.ra50minus = body.ra50minus
        info.dec50plus = body.dec50plus
        info.dec50minus = body.dec50minus
        info.ra90plus = body.ra90plus
        info.ra90minus = body.ra90minus
        info.dec90plus = body.dec90plus
        info.dec90minus = body.dec90minus
        info.energy = body.energy
        info.type = body.type
        info.track = body.track
        info.reference = body.reference
        info.link = body.link
        info.comment = body.comment
        info.json = body.json
        info
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: info._id,
                    message: 'Info updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Info not updated!',
                })
            })
    })
}

deleteInfo = async (req, res) => {
    // basic auth
    const credentials = auth(req)
    if (!credentials || !compare(credentials.name, process.env.USERNAME) || !compare(credentials.pass, process.env.DB_PASS)) {
        return res.status(401).json({ success: false, error: "Access denied." })
    }
    // TODO: change the candidate.infos
    await Info.findOneAndDelete({ _id: req.params.id }, (err, info) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!info) {
            return res
                .status(404)
                .json({ success: false, error: `Info not found` })
        }

        return res.status(200).json({ success: true, data: info })
    }).catch(err => console.log(err))
}

getInfoById = async (req, res) => {
    await Info.findOne({ _id: req.params.id }, (err, info) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!info) {
            return res
                .status(404)
                .json({ success: false, error: `Info not found` })
        }
        return res.status(200).json({ success: true, data: info })
    }).catch(err => console.log(err))
}

getInfos = async (req, res) => {
    await Info.find({}, (err, infos) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!infos.length) {
            return res
                .status(404)
                .json({ success: false, error: `infos not found` })
        }
        return res.status(200).json({ success: true, data: infos })
    }).catch(err => console.log(err))
}

module.exports = {
    createInfo,
    updateInfo,
    deleteInfo,
    getInfos,
    getInfoById,
}