require('dotenv').config()
const mongoose = require('mongoose');
// const findOrCreate = require("mongoose-findorcreate")
const Schema = mongoose.Schema

const infoSchema = new Schema(
    {
        // _id should not be defined explicitly
        // _id: Schema.Types.ObjectID,
        run_id: { type: Number, required: true },
        event_id: { type: Number, required: true },
        rev: { type: Number, default: 0 },      // required or default 0
        // Format: $track.$type.rev$REV.run$RUNNUM.evt$EVENTNUM (overwriten by server if not provide)
        name: String,
        // UTC String, accetped formats: 
        // e.g. "2010-12-10T13:06:27.944+00:00" [yyyy-mm-ddThh:mm:ss:lll+00:00]
        // e.g. "2010/12/10 13:06:27.944"       [yyyy/mm/dd hh:mm:ss:lll]
        time: {
            type: Date,
            get: v => v.toUTCString()
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
        energy: Number,    // in TeV
        // e.g: gfu-bronze / ehe-gold / hese-cascade / sourceflare
        type: { type: String, lowercase: true, required: true },
        // e.g: neutrinotrackalert / cascadealert / gfucluster / allskyflare / gcn-notice / gcn-circular
        track: { type: String, lowercase: true, required: true },
        // more formal reference format string
        reference: String,
        // url 
        link: String,
        // short comment
        comment: { type: String, maxlength: 5000 },
        // anything else (in json)
        json: Schema.Types.Mixed,
        created: { type: Date, default: Date.now },
    },
)
// automaticlly assign name in format: $track.$type.rev$REV.run$RUNNUM.evt$EVENTNUM
infoSchema.pre('save', function (next) {
    if (!this.name) this.name = this.track + "." + this.type + ".rev" + this.rev + ".run" + this.run_id + ".evt" + this.event_id;
    next();
});

module.exports = mongoose.model('Info', infoSchema);