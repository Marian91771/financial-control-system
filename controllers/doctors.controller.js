const Doctor = require('../models/doctor.model');

const getAllDoctors = async (req, res) => {
    const doctors = await Doctor.getAll();
    console.log(doctors);
    res.status(200).json(doctors);
};

const postDoctor = async (req, res) => {
    const { fullname, specialization, qualification } = req.query;
    try {
        const result = await Doctor.postdoctor(fullname, specialization, qualification);
        res.status(201).json({ message: 'Doctor added', result });
    } catch (error) {
        console.error('Error inserting doctor:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

const deleteDoctor = async (req, res) => {
    const { id } = req.params;
    console.log('Deleting doctor with ID:', id);
    try {
        const result = await Doctor.deletedoctor(id);
        res.status(200).json({ message: 'Doctor deleted successfully', result });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = {
    getAllDoctors,
    postDoctor,
    deleteDoctor,
};
