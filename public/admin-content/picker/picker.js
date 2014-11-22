'use strict'

angular.module('flagAdmin.picker', [
    'ngRoute',
    'ui.bootstrap'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/photos/:mode', {
            controller: 'pickerCtrl',
            templateUrl: 'admin-content/picker/picker.html'
        });
    }])
    .controller('pickerCtrl', ['$scope', '$http', '$timeout','$routeParams', function ($scope, $http, $timeout, $routeParams) {
        $scope.images = [];
        $scope.paginator = {
            currentPage: 1,
            numOfPages: 1
        };
        $scope.status = {
            new: 1,
            approved: 2,
            rejected: 3
        };
        $scope.mode = null;

        var fetchPhotosPromise = null;

        function init() {
            $scope.mode = $scope.status[$routeParams.mode];

            getPhotos();
            if ($routeParams.mode === 'new') {
                fetchPhotosPromise = $timeout(fetchNewPhotos, 5000);

                $scope.$on('$destroy', function () {
                    $timeout.cancel(fetchPhotosPromise);
                });
            }
        }

        function getPhotos(page) {
            page = page || $scope.paginator.currentPage;
            var limit = $scope.mode === $scope.status.new? 1000 : 20;
            $http.get('/api/photo', {
                params: {
                    page: page,
                    status: $scope.mode,
                    limit: limit,
                    sort: 'updated_at',
                    order: 'desc'
                }
            }).success(function (data) {
                $scope.images = data.data;
                $scope.paginator = data.paginator;
            });
        }

        function fetchNewPhotos() {
            if ($scope.mode === $scope.status.new) {
                getPhotos();
            }
            fetchPhotosPromise = $timeout(fetchNewPhotos, 5000);
        }

        $scope.changeStatus = function (image, newStatus) {
            image.status = newStatus;
            $http.put('/api/photo/' + image.id, image);
        };

        $scope.pageChanged = function () {
            getPhotos();
        };

        init();

    }])
    .filter('sourceText', function() {
        return function(input) {
            switch(input) {
                case 'twitter':
                    return 'Twitter';
                case 'instagram':
                    return 'Instagram';
                case 'media_pole':
                    return 'Media Pole';
                default: return '';

            }
        };
    });