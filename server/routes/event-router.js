const express = require('express')

const EventCtrl = require('../controllers/event-ctrl')

const router = express.Router()

router.post('/event', EventCtrl.createEvent)
// router.put('/event/:id', EventCtrl.updateMovie)
// router.delete('/event/:id', EventCtrl.deleteMovie)
router.get('/event/:id', EventCtrl.getEventById)
router.get('/events', EventCtrl.getEvents)

module.exports = router