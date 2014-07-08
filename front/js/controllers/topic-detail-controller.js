angular.module('admin')
    .controller('topicDetailController', ["$scope", "Topic", "$routeParams",
        function ($scope, Topic , $routeParams) {

            
            var vm = $scope.vm = {};

            function getTopic() {
                vm.loaded = false;

                Topic.getTopic($routeParams.topicId).then(function (result) {
                    vm.topic = result;
                    vm.loaded = true;
                });

            }

            getTopic();

    }]);
