angular.module('admin')
    .controller('addTopicModalController', ["$scope", "Topic", "$modalData", "$modalInstance",
        function ($scope, Topic, $modalData, $modalInstance) {

            var vm = $scope.vm = {
                submitted : false
            };

            $scope.ok = function(){
                vm.checked = true;

                if( !vm.submitted && $scope.modalForm.$valid ){
                    vm.submitted = true;
                    Topic.post($scope.topic).then(function(){
                        vm.submitted = false;
                        $modalInstance.close();
                    });
                }

            };

        }]);
