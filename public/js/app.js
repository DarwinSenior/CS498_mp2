var imdb250App = angular.module('imdb250App', [
    'ngAnimate',
    'ngRoute',
	'imdb250Controllers'
	]);

imdb250App.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/list', {
                templateUrl: 'partials/list.html',
                controller: 'listController'
            }).
            when('/detail/:rank', {
                templateUrl: 'partials/details.html',
                controller: 'detailController'
            }).
            when('/gallery', {
                templateUrl: 'partials/gallery.html',
                controller: 'galleryController'
            }).
            when('/compare', {
                templateUrl: 'partials/compare.html',
                controller: 'compareController'
            }).
            otherwise({
                redirectTo: '/list'
            });
    }]);