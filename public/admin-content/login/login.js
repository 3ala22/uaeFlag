'use strict'

angular.module('flagAdmin.login', [
    'ngRoute',
    'ngResource',
    'ngSanitize'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'admin-content/login/login.html'
        });
    }])
    .config(['$httpProvider', function ($httpProvider) {
        var interceptor = function ($rootScope, $location, $q) {

            return {
                'responseError': function (response) {
                    if (response.status == 401) {
                        delete sessionStorage.authenticated;
                        $location.path('/login');
                        //Flash.show(response.data.flash)
                    }
                    return $q.reject(response);

                }
            };

        };
        $httpProvider.interceptors.push(interceptor);
    }])
    .factory('Authenticate', ['$http', function ($http) {
        var serviceUrl = '/api/auth';
        return {
            check: function () {
                return $http.get(serviceUrl);
            },
            login: function (data) {
                return $http.post(serviceUrl, data);
            },
            logout: function () {
                return $http.get(serviceUrl + '/logout');
            }
        }
    }])
    .controller('loginCtrl', ['$scope', '$sanitize', '$location', 'Authenticate',
        function ($scope, $sanitize, $location, Authenticate) {
            $scope.login = function () {
                Authenticate.login({
                    'username': $sanitize($scope.username),
                    'password': $sanitize($scope.password)
                }).success(function (response) {
                    $scope.app.user = response.user;
                    $scope.flash = '';
                    $location.path('/photos/new');
                    sessionStorage.authenticated = true;
                }).error(function (response) {
                    $scope.flash = response.flash;
                });
            };
        }]);