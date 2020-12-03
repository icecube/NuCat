const express = require('express')
const Ctrls = require('../controllers')
const router = express.Router()

router.post('/event', Ctrls.EventCtrl.createEvent)
// router.put('/event/:id', EventCtrl.updateMovie)
// router.delete('/event/:id', EventCtrl.deleteMovie)
router.get('/event/:id', Ctrls.EventCtrl.getEventById)
router.get('/events', Ctrls.EventCtrl.getEvents)

router.post('/info', Ctrls.InfoCtrl.createInfo)
router.put('/info/:id', Ctrls.InfoCtrl.updateInfo)
router.delete('/info/:id', Ctrls.InfoCtrl.deleteInfo)
router.get('/info/:id', Ctrls.InfoCtrl.getInfoById)
router.get('/infos', Ctrls.InfoCtrl.getInfos)

// router.post('/candidate', Ctrls.CandidateCtrl.createCandidate)
// router.put('/event/:id', EventCtrl.updateMovie)
// router.delete('/event/:id', EventCtrl.deleteMovie)
router.get('/candidate/:id', Ctrls.CandidateCtrl.getCandidateById)
router.get('/candidates', Ctrls.CandidateCtrl.getCandidates)


module.exports = router