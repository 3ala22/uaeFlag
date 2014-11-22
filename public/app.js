'use strict'

angular.module('instagramFlag',[
    'ngRoute',
    'instagramFlag.flag',
]).config(['$routeProvider', function($routeProvider){
    $routeProvider.otherwise({redirectTo:'/'});
}]);