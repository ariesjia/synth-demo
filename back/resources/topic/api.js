var markdown = require( "markdown" ).markdown,
    Promise = require("bluebird");
    util = require('util');


exports.getIndex = function (req, res) {

    var av = req.AV,
        defer = Promise.defer();

    var Topic = av.Object.extend("Topic"),
        query = new av.Query(Topic);

    var getCount = function(){
        return query.count();
    };

    var getTopic = function() {
        return query.limit(10).find();
    };

    Promise.props({
        count : getCount(),
        list : getTopic()
    }).then(function(result){
        defer.resolve({
            'count' : result.count,
            'list' : result.list
        })
    });


    return defer.promise;
};


exports.post = function(req,res){
    var message = req.body,
        defer = Promise.defer(),
        av = req.AV;

    var Topic = av.Object.extend("Topic"),
        topic = new Topic();

    topic.save(message, {
        success: function(result) {
            defer.resolve(result);
        },
        error: function(result, error){
            defer.reject(error);
        }
    });

    return defer.promise;
};


exports.delete = function(req,res){

    var av = req.AV;
    var params = req.params,
        id = params.id;

    var Topic = av.Object.extend("Topic"),
        topic = new Topic();

    topic.set("objectId", id);

    return topic.destroy();
};

