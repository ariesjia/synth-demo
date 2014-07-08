var markdown = require( "markdown" ).markdown,
    Promise = require("bluebird");


exports.get = function( req , res ){

    var av = req.AV;
    var params = req.params,
        id = params.id,
        defer = Promise.defer();

    var Topic = av.Object.extend("Topic"),
        query = new av.Query(Topic);

    query.get(id).then(function(result){
        var content = result.attributes.content;
        if(content){
            result.attributes.content = markdown.toHTML(content);
        }
        defer.resolve(result);
    },function(error){
        defer.reject(error);
    });

    return defer.promise;

};