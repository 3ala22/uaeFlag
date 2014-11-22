'use strict'

angular.module('flagAdmin', [
    'ngRoute',
    'flagAdmin.navigation',
    'flagAdmin.picker',
    'flagAdmin.login',
    'flagAdmin.reports'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/new'});
    }])

    .run(function ($http, CSRF_TOKEN) {
        $http.defaults.headers.common['csrf_token'] = CSRF_TOKEN;
    })

    .controller('mainCtrl', ['$scope', '$location', 'Authenticate', function ($scope, $location, Authenticate) {
        if (!sessionStorage.authenticated) {
            $location.path('/login');
        }

        $scope.app = {
            user: null
        };

        Authenticate.check().success(function(data){
          $scope.app.user = data.user;
        });

        $scope.isLoggedIn = function (){
            return sessionStorage.authenticated;
        };


    }]);