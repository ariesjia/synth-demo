var synth = require('synth');
var promise = require('bluebird');

var AV = require('avoscloud-sdk').AV;
AV.initialize(
    "1r414epvk385szctcvzzcfwu9gqwqowqns5orrlmokn295i1",
    "al7et4pgbo1ggq258iw6kkbfjxnlv51vpge7hphfo0hwjsca"
);

synth.app.use(function (req, res, next) {
    req.AV = AV;
    req.appName = "dipper";
    next();
});


module.exports = synth({
    'apiTimeout' : 20000
});
