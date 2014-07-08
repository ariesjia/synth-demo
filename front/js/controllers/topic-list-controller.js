angular.module('admin')
    .controller('topicListController', ["$scope", "Topic","modalService",
        function ($scope, Topic,modalService) {

        var postLabelMap = Topic.getPostLable();

        var vm = $scope.vm = {};

        vm.expendState = false;
        vm.pagination = {};


        $scope.getLabelText = function (post) {
            return postLabelMap[post.label].txt;
        };
        $scope.getLabelClass = function (post) {
            return postLabelMap[post.label].cls;
        };

        $scope.addPost = function(){
            modalService.show({
                title : '添加话题',
                url : 'html/topic/modal/add.html',
                controller : 'addTopicModalController'
            }).then(function(result){
                getTopic();
            });
        };

        $scope.deleteTopic = function ($event,topicId){

            modalService.show({
                title : '删除话题',
                tip : '确定要删除话题么？'
            }).then(function(){
                Topic.delete(topicId).then(function (result) {
                    getTopic();
                });
            });

            $event.preventDefault();
            return false;
        };

        var getTopic = $scope.getTopic = function(pageNumber) {
            vm.loaded = false;
            vm.error = false;

            Topic.getTopics( pageNumber || 1 ).then(function (result) {
                $scope.topic = result;
                vm.loaded = true;
            },function(){
                vm.loaded = true;
                vm.error = true;
            });
        };

        var init = function(){
            getTopic();
        };

        init();




    }]);
