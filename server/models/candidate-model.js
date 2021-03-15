require('dotenv').config()
const mongoose = require('mongoose')
const findOrCreate = require("mongoose-findorcreate")
const Schema = mongoose.Schema

const candidateSchema = new Schema(
    {
        // _id: Schema.Types.ObjectID,
        run_id: { type: Number, required: true },
        event_id: { type: Number, required: true },
        // default: run$RUNNUM.evt$EVENTNUM
        // can be updated after creation 
        name: String,
        // UTC String: 
        // accetped format: 
        // e.g. "2010-12-10T13:06:27.944+00:00" [yyyy-mm-ddThh:mm:ss:lll+00:00]
        // e.g. "2010/12/10 13:06:27.944"       [yyyy/mm/dd hh:mm:ss:lll]
        time: {
            type: Date,
            get: v => v.toUTCString(),
        },
        // in degrees J2000
        ra: { type: Number, min: 0.0, max: 360.0 },
        dec: { type: Number, min: -90.0, max: 90.0 },
        ra50plus: { type: Number, min: 0.0, max: 360.0 },
        ra50minus: { type: Number, min: -360.0, max: 0.0 },
        dec50plus: { type: Number, min: 0.0, max: 180.0 },
        dec50minus: { type: Number, min: -180.0, max: 0.0 },
        ra90plus: { type: Number, min: 0.0, max: 360.0 },
        ra90minus: { type: Number, min: -360.0, max: 0 },
        dec90plus: { type: Number, min: 0.0, max: 180.0 },
        dec90minus: { type: Number, min: -180.0, max: 0.0 },
        // in TeV
        energy: Number,
        // e.g: gfu-bronze / ehe-gold / hese-cascade / sourceflare
        type: { type: String, lowercase: true },
        // e.g: neutrinotrackalert / cascadealert / gfucluster / allskyflare / gcn-notice / gcn-circular
        track: { type: String, lowercase: true },
        // anything else (in json)
        json: Schema.Types.Mixed,
        // multiple infos
        infos: [{
            type: Schema.Types.ObjectID,
            ref: "Info",
        }],

        // TODO store time/position/energy/source references
        // refs: { type: Schema.Types.ObjectID, ref: "Ref" },
    },
)

candidateSchema.plugin(findOrCreate);

module.exports = mongoose.model('Candidate', candidateSchema);