const performanceLogger = (req, res, next) => {
    const start = process.hrtime(); // початок

    res.on('finish', () => {
        const diff = process.hrtime(start); // різниця з початку
        const timeInMs = diff[0] * 1000 + diff[1] / 1e6; // перетворити в мілісекунди
        console.log(`${req.method} ${req.originalUrl} — ${timeInMs.toFixed(2)} ms`);
    });

    next();
};

module.exports = performanceLogger;
