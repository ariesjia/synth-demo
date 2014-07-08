angular.module('admin', [
        'ngRoute',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '/html/topic/index.html',
                controller: 'topicListController'
            })
            .when('/topic/:topicId', {
                templateUrl: '/html/topic/detail.html',
                controller: 'topicDetailController'
            })
            .when('/recommend', {
                templateUrl: '/html/recommend/list.html',
                controller: 'topicListController'
            })
            .otherwise({
                redirectTo: '/'
            });

    });
