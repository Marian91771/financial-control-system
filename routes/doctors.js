const express = require('express');
const { getAllDoctors, postDoctor, deleteDoctor } = require('../controllers/doctors.controller');

const router = express.Router();

router.get('/', getAllDoctors);
router.post('/new', postDoctor);
router.delete('/delete/:id', deleteDoctor);

module.exports = router;
