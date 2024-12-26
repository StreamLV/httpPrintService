
const defaultTestPage = async (req, res, next) => {
    res.json({
        status: 'up',
        description: 'http print server',
    });
};


exports.defaultTestPage = defaultTestPage;