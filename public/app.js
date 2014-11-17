'use strict'

angular.module('instagramFlag',[
    'ngRoute',
    'instagramFlag.flag',
    'instagramFlag.picker'
]).config(['$routeProvider', function($routeProvider){
    $routeProvider.otherwise({redirectTo:'/'});
}]);