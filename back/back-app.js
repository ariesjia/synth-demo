var synth = require('synth');
var promise = require('bluebird');

var AV = require('avoscloud-sdk').AV;
AV.initialize(
    "g8do499608lxzcnkoh0nlm50o9xa95q2c8pmm07sj0yjtey8",
    "bp7mnnz13hwlajxdq9e8qmubs20d1g0iu9v7oupmjzfp0j3g"
);

synth.app.use(function (req, res, next) {
    req.AV = AV;
    req.appName = "dipper";
    next();
});


module.exports = synth({
    'apiTimeout' : 20000
});
