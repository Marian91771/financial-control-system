const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: 'localhost',
        user: 'user', // Provide your user here
        password: '12345678', // Provide your password here
        database: 'financial_control_system_db', // Provide your db name here
        connectTimeout: 60000,
    },
    listPerPage: 10,
};
module.exports = config;
