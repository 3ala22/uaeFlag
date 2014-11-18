'use strict'

angular.module('instagramFlag',[
    'ngRoute',
    'instagramFlag.flag',
    'instagramFlag.picker',
    'instagramFlag.login'
]).config(['$routeProvider', function($routeProvider){
    $routeProvider.otherwise({redirectTo:'/'});
}]).run(function($http,CSRF_TOKEN){
    $http.defaults.headers.common['csrf_token'] = CSRF_TOKEN;
});