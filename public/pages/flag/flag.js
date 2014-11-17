'use strict'

angular.module('instagramFlag.flag', [
    'ngRoute',
    'ngAnimate',
    'ngQueue'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'flagCtrl',
            templateUrl: 'pages/flag/flag.html'
        });
    }])
    .controller('flagCtrl', ['$scope', '$http', '$timeout','$queue','$filter', function ($scope, $http, $timeout,$queue, $filter) {
        var i, WIDTH = 48,
            HEIGHT = 24,
            TOTAL_SIZE = WIDTH * HEIGHT,
            placeholderArray = [],
            addToFlagQueue,
            addToFlagRowQueue,
            lastUpdated = null,
            rowNum = 0,
            addToFlagQueueCallbackFn = addToFlagRandom;


        function init() {
            // initialize queues
            addToFlagQueue =  $queue.queue(addToFlagQueueCallbackFn, {
                delay: 600, //delay 1 seconds between processing items
                complete: function() {
                    //$scope.flagFull = true;
                    console.log('Queue is empty');
                }
            });

            // initialize queues
            addToFlagRowQueue =  $queue.queue(addToFlagRowQueueHandler, {
                delay: 500, //delay 1 seconds between processing items
                complete: function() {
                    console.log('Row Queue is empty');
                }
            });

            // initialize placeholders
            for (i = 0; i < TOTAL_SIZE; i++) {
                placeholderArray.push(
                    {
                        id: i,
                        row: parseInt(i / WIDTH),
                        col: parseInt(i % WIDTH),
                        image: null,
                        feature: false
                    }
                )
            }
            $scope.placeholders = placeholderArray;

            // inti other properties
            //$scope.flash = false;
            $scope.flagFull = false;

            $scope.$watch('flagFull', function(isFull){
               if(isFull)
                   $timeout(function(){
                       //$scope.flash = false;
                       $timeout(feature, 4000);
                   },4000);
                   //$timeout(function(){ //start flash animation
                   //    $scope.flash = true;
                   //
                   //},2000);
            });

            $scope.imageCount = 0;

            // start getting images
            getImages();
        }

        function getImages() {

            $http.get('/images',{
                params:{
                    lastUpdated: lastUpdated
                }
            }).success(function (data) {
                if(data.data.length > 0) {
                    var chunks = chunkArray(data.data, 20);
                    lastUpdated = data.lastUpdated;
                    chunks.forEach(function (chunk) {
                        addToFlagQueue.add(chunk);
                    });
                }
                //insertIntoRowQueue(data);

                if (!$scope.flagFull)
                    $timeout(getImages, 5000);
            });
        }


        function addToFlagRandom(images)
        {
            if(!(images instanceof Array))
                images = [images];
            images.forEach(function(image){
                var emptyPlaces = _.where($scope.placeholders, {image: null});
                if (emptyPlaces.length === 0) {
                    $scope.flagFull = true;
                    return;
                }
                addToFlag(pickRandomElement(emptyPlaces),image);
            });

        }

        function addToFlagSequential(image)
        {
            var nextPlace = _.findWhere($scope.placeholders, {image:null});
            if (!nextPlace) {
                $scope.flagFull = true;
                return;
            }
            addToFlag(nextPlace,image);
        }


        function insertIntoRowQueue(images)
        {
            var chunks = chunkArray(images,HEIGHT);

            chunks.forEach(function(chunk){
                if(rowNum === HEIGHT){
                   $scope.flagFull = true;
                }
                if(chunk.length === WIDTH)
                    addToFlagRowQueue.add({
                        data:chunk,
                        rowNum : rowNum++
                    });
            });
        }

        function chunkArray(arr, numberOfChunks)
        {
            var chunks = [],
                numberOfChunks = numberOfChunks || 5,
                itemsPerChunk = parseInt(arr.length/ numberOfChunks);
            if(itemsPerChunk === 0){
                chunks.push(arr);
                return chunks;
            }
            while (arr.length > 0)
                chunks.push(arr.splice(0, itemsPerChunk));
            return chunks;
        }

        function addToFlagRowQueueHandler(item){
            addRowToFlag(item.data,item.rowNum);
        }

        function addRowToFlag(images, rowNum)
        {
            var row = _.filter($scope.placeholders, {row:rowNum});

            row.forEach(function(placeholder, index){
               addToFlag(placeholder,images[index]);
            });
        }

        function pickRandomElement(array)
        {
            return array[Math.floor(Math.random()*array.length)];
        }

        function addToFlag(placeholder, image){
            placeholder.image = image;
            $scope.imageCount++;
        }

        function shuffle(){
            $scope.placeholders = _.shuffle($scope.placeholders);
            $timeout(arrange, 5000);
        }

        function arrange(){
            $scope.placeholders = _.sortBy($scope.placeholders, function (item){
                return item.id;
            });
        }

        function feature() {
            var filledPlaces = _.filter($scope.placeholders,function (item){
                if(item.row < 3 || item.row >= 20 || item.col < 3 || item.col >= 37)
                    return false;
               return item.image;
            });
            var imageToFeature = pickRandomElement(filledPlaces);

            if(imageToFeature) {
                imageToFeature.feature = true;
                $timeout(function () {
                    imageToFeature.feature = false;
                }, 8000);
            }

            $timeout(feature, 4000);
        }

        $scope.color = function (placeholder) {
            if(placeholder.image) {
                if (placeholder.col <= parseInt(WIDTH * 0.25)) {
                    return 'red';
                }
                if (placeholder.row <= parseInt(HEIGHT * 0.333)) {
                    return 'green';
                }
                if (placeholder.row <= parseInt(HEIGHT * 0.666)) {
                    return 'white';
                }
                return 'black';
            }
            return 'black';
        };

        $scope.feature = function (placeholder) {
            return placeholder.feature? 'feature':'';
        };

        init();




    }]);
