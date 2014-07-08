angular.module('admin')
    .service('Topic', ["$http", "$q", function ($http, $q) {

        var baseUrl = 'api/topic';

        var deferWrap = function (request) {
            var defer = $q.defer();
            request.success(function (response) {
                defer.resolve(response);
            }).error(function(error) {
                defer.reject(error);
            });

            return defer.promise;
        };

        var labelMap = {
            "FAVORABLE": {
                cls: "label-primary",
                txt: "优惠"
            }
        };


        this.getPostLable = function(){
            return labelMap;
        };

        this.getTopics = function(){
            return deferWrap($http.get(baseUrl));
        };

        this.getTopic = function(topicId){
            return deferWrap($http.get(baseUrl+'/'+topicId));
        };

        this.delete = function(topicId){
            return deferWrap($http.delete(baseUrl+'/'+topicId));
        };

        this.post = function(data){
            return deferWrap($http.post(baseUrl,data));
        };

    }]);
