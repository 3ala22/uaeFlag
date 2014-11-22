'use strict'

angular.module('flagAdmin.navigation', [])
    .controller('navigationCtrl', ['$scope', '$location', 'Authenticate', function ($scope, $location, Authenticate) {

        $scope.menu = [
            {
                link: '#/photos/new',
                icon: 'fa-edit',
                text: 'New'
            },
            {
                link: '#/photos/approved',
                icon: 'fa-check',
                text: 'Approved'
            },
            {
                link: '#/photos/rejected',
                icon: 'fa-times',
                text: 'Rejected'
            },
            {
                link: '#/reports',
                icon: 'fa-tasks',
                text: 'Reports',
                role: 'Admin'
            }
        ];

        $scope.logout = function () {
            Authenticate.logout().success(function () {
                delete sessionStorage.authenticated;
                $scope.app.user = null;
                $location.path('/login');
            });
        };

        $scope.isActive = function (route) {
            return $location.path() === route.substring(1);
        };




    }]);