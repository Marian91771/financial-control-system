const requestLogger = (req, res, next) => {
    const routeParams = req.params;
    const queryParams = req.query;

    const requestInfo = {
        method: req.method,
        url: req.originalUrl,
        pathVariables: routeParams,
        queryString: queryParams,
    };

    console.log('[Request Info]', JSON.stringify(requestInfo, null, 2));

    next();
};

module.exports = requestLogger;
