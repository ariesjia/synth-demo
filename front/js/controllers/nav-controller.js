angular.module('admin')
    .controller('navController', function ($scope) {

        $scope.navList = [
            {
                "label" : "话题",
                "url" : '#/'
            },
//            {
//                "label" : "鸡贼",
//                "url" : '#/recommend'
//            }
        ];

    });
