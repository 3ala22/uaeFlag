'use strict'

angular.module('instagramFlag.login',[
    'ngRoute',
    'ngResource',
    'ngSanitize'
])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/login',{
                controller: 'loginCtrl',
                templateUrl: 'pages/login/login.html'
            });
    }])
    .config(['$httpProvider',function($httpProvider){
        var interceptor = function($rootScope,$location,$q){
            var success = function(response){
                return response
            };
            var error = function(response){
                if (response.status == 401){
                    delete sessionStorage.authenticated
                    $location.path('/login')
                    //Flash.show(response.data.flash)
                }
                return $q.reject(response)
            };
            return function(promise){
                return promise.then(success, error)
            }
        };
        $httpProvider.interceptors.push(interceptor)
    }])
    .factory('Authenticate', function($resource){
        return $resource("/service/authenticate/")
    })
    .controller('loginCtrl',['$scope','$sanitize','$location','Authenticate',
        function($scope,$sanitize,$location,Authenticate) {
        $scope.login = function () {
            Authenticate.save({
                'username': $sanitize($scope.username),
                'password': $sanitize($scope.password)
            }, function () {
                $scope.flash = ''
                $location.path('/picker');
                sessionStorage.authenticated = true;
            }, function (response) {
                $scope.flash = response.data.flash
            })
        };
    }]);