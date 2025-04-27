const db = require('./db');

const Doctor = function (doctor) {
    this.id = doctor.DoctorID;
};

Doctor.getAll = async () => {
    const query = 'SELECT * FROM doctors';
    const rows = await db.query(query);
    return rows;
};

Doctor.getById = async id => {
    const query = 'SELECT * FROM doctors WHERE DoctorID = ?';
    const rows = await db.query(query, [id]);
    return rows && rows.length > 0 ? rows[0] : null;
};

Doctor.postdoctor = async (fullname, specialization, qualification) => {
    const query = `
        INSERT INTO doctors (fullname, specialization, qualification)
        VALUES (?, ?, ?)
    `;
    const values = [fullname, specialization, qualification];
    const result = await db.query(query, values);

    return result;
};

Doctor.deletedoctor = async id => {
    const query = 'DELETE FROM doctors WHERE DoctorID = ?';
    await db.query(query, [id]);
    // return result.rows[0];
};

module.exports = Doctor;
