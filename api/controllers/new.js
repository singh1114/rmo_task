exports.index = (req, resp) => {
    resp.send('I am alive');
};

exports.other = (req, resp) => {
    resp.send('I am dead');
};
