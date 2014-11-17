'use strict'

angular.module('instagramFlag.picker', [
    'ngRoute',
    'ngAnimate',
    'ngQueue',
    'ui.bootstrap'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/picker', {
            controller: 'pickerCtrl',
            templateUrl: 'pages/picker/picker.html'
        });
    }])
    .controller('pickerCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $scope.images = [];
        $scope.paginator = {
            currentPage: 1
        };
        $scope.status = {
            new: 1,
            approved: 2,
            rejected: 3
        };
        $scope.mode = $scope.status.new;


        function init() {
            getPhotos();
            $timeout(fetchNewPhotos, 10000);
        }

        function getPhotos(page) {
            page = page || $scope.paginator.currentPage;
            $http.get('/api/photo', {
                params: {
                    page: page,
                    status: $scope.mode
                }
            }).success(function (data) {
                $scope.images = data.data;
                $scope.paginator = data.paginator;
            });
        }

        function fetchNewPhotos() {
            if ($scope.mode === $scope.status.new) {
                console.log('Getting new photos');
                getPhotos();
            }
            $timeout(fetchNewPhotos, 10000);
        }

        $scope.changeStatus = function (image, newStatus) {
            image.status = newStatus;
            $http.put('/api/photo/' + image.id, image);
        };

        $scope.pageChanged = function () {
            getPhotos();
        };

        $scope.setMode = function (newMode) {
            $scope.mode = newMode;
            $scope.paginator.currentPage = 1;
            getPhotos();
        };
        $scope.isActive = function (mode) {
            return $scope.mode === mode;
        };

        init();

    }]);