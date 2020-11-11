const express = require('express')

const EventCtrl = require('../controllers/event-ctrl')
const Ctrls = require('../controllers')

const router = express.Router()

router.post('/event', Ctrls.EventCtrl.createEvent)
// router.put('/event/:id', EventCtrl.updateMovie)
// router.delete('/event/:id', EventCtrl.deleteMovie)
router.get('/event/:id', Ctrls.EventCtrl.getEventById)
router.get('/events', Ctrls.EventCtrl.getEvents)

router.post('/info', Ctrls.InfoCtrl.createInfo)
// router.put('/event/:id', EventCtrl.updateMovie)
// router.delete('/event/:id', EventCtrl.deleteMovie)
router.get('/info/:id', Ctrls.InfoCtrl.getInfoById)
router.get('/infos', Ctrls.InfoCtrl.getInfos)


module.exports = router