'use strict'

angular.module('instagramFlag.flag', [
    'ngRoute',
    'ngAnimate',
    'ngQueue',
    'hills.services'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'flagCtrl',
            templateUrl: 'pages/flag/flag.html'
        });
    }])
    .controller('flagCtrl', ['$scope', '$http', '$timeout', '$queue', 'preloader', function ($scope, $http, $timeout, $queue, preloader) {
        var i, WIDTH = 80,
            HEIGHT = 39,
            TOTAL_SIZE = WIDTH * HEIGHT,
            placeholderArray = [],
            addToFlagQueue,
            addToFlagRowQueue,
            lastUpdated = null,
            rowNum = 0,
            totalAdded = 0,
            addToFlagQueueCallbackFn = addToFlagRandom;


        function init() {
            // initialize queues
            addToFlagQueue = $queue.queue(addToFlagQueueCallbackFn, {
                delay: 100, //delay 1 seconds between processing items
                complete: function () {
                    //$scope.flagFull = true;
                    console.log('Queue is empty');
                }
            });

            //// initialize queues
            //addToFlagRowQueue = $queue.queue(addToFlagRowQueueHandler, {
            //    delay: 500, //delay 1 seconds between processing items
            //    complete: function () {
            //        console.log('Row Queue is empty');
            //    }
            //});

            // initialize placeholders
            for (i = 0; i < TOTAL_SIZE; i++) {
                placeholderArray.push(
                    {
                        id: i,
                        row: parseInt(i / WIDTH),
                        col: parseInt(i % WIDTH),
                        image: null
                    }
                )
            }
            $scope.placeholders = placeholderArray;

            // inti other properties
            //$scope.flash = false;
            $scope.flagFull = false;

            $scope.$watch('flagFull', function (flagFull) {
                if (flagFull) {
                    console.log('Flag full');
                    $timeout(getImages, 5000);
                    $timeout(feature, 1000);
                }

            });

            $scope.imageCount = 0;

            $scope.bannerText = 'english';

            $scope.spriteUrl = null;

            // featured images
            $scope.featuredImages = [];
            for (i = 0; i < 12; i++) {
                $scope.featuredImages.push({
                    area: i,
                    image: null,
                    style: getRandomPos()
                });
            }

            // start getting images
            getImages();

            $timeout(switchBannerText, 10000);

        }

        function getRandomPos () {
            console.log('getting random position');
            return 'margin-top:' + (75 + Math.floor(Math.random() * 50)) + 'px; margin-left: ' + Math.floor(Math.random() * 200) + 'px;';

        }

        function switchBannerText() {
            if ($scope.bannerText === 'english')
                $scope.bannerText = 'arabic';
            else
                $scope.bannerText = 'english';

            $timeout(switchBannerText, 10000);
        }

        function getImages() {

            $http.get('/images', {
                params: {
                    lastUpdated: lastUpdated
                }
            }).success(function (data) {
                if (data.data.length > 0) {
                    var chunks = chunkArray(data.data, 20);
                    lastUpdated = data.lastUpdated;
                    //$scope.spriteUrl = data.sprite.img;
                    chunks.forEach(function (chunk) {
                        addToFlagQueue.add(chunk);
                    });
                    $scope.imageCount += data.total;

                }
                //insertIntoRowQueue(data);

                //$timeout(getImages, 5000);
            });
        }


        function addToFlagRandom(images) {
            if (!(images instanceof Array))
                images = [images];

            //var urls = [$scope.spriteUrl];

            //var urls = _.map(images,function(image){
            //    return 'assets/'+image.source+'/'+image.source_id+'.24x24.jpg';
            //});

            images.forEach(function (image) {
                if (!$scope.flagFull) {
                    var emptyPlaces = _.where($scope.placeholders, {image: null});
                    addToFlag(pickRandomElement(emptyPlaces), image);
                }
                else {
                    addToFlag(pickRandomElement($scope.placeholders), image);
                }

            });

            //// Preload the images; then, add to flag.
            //preloader.preloadImages( urls ).then(
            //    function handleResolve( imageLocations ) {
            //        //console.info( "Preload Successful" );
            //        // Loading was successful.
            //
            //    },
            //    function handleReject( imageLocation ) {
            //
            //        // Loading failed on at least one image.
            //
            //        console.error( "Image Failed", imageLocation );
            //        console.info( "Preload Failure" );
            //
            //    },
            //    function handleNotify( event ) {
            //
            //        //$scope.percentLoaded = event.percent;
            //        //
            //        //console.info( "Percent loaded:", event.percent );
            //
            //    }
            //);


        }

        function addToFlagSequential(image) {
            var nextPlace = _.findWhere($scope.placeholders, {image: null});
            if (!nextPlace) {
                $scope.flagFull = true;
                return;
            }
            addToFlag(nextPlace, image);
        }


        function insertIntoRowQueue(images) {
            var chunks = chunkArray(images, HEIGHT);

            chunks.forEach(function (chunk) {
                if (rowNum === HEIGHT) {
                    $scope.flagFull = true;
                }
                if (chunk.length === WIDTH)
                    addToFlagRowQueue.add({
                        data: chunk,
                        rowNum: rowNum++
                    });
            });
        }

        function chunkArray(arr, numberOfChunks) {
            var chunks = [],
                numberOfChunks = numberOfChunks || 5,
                itemsPerChunk = parseInt(arr.length / numberOfChunks);
            if (itemsPerChunk === 0) {
                chunks.push(arr);
                return chunks;
            }
            while (arr.length > 0)
                chunks.push(arr.splice(0, itemsPerChunk));
            return chunks;
        }

        // check if two cells are adjacent to each other.
        //function isAdjacent(cell1, cell2) {
        //    var adjacencyThreshold = 13;
        //    if (Math.abs(cell1.row - cell2.row) < adjacencyThreshold && Math.abs(cell1.col - cell2.col) < adjacencyThreshold) {
        //        //console.log('Cell (' + cell1.row + ',' + cell1.col + ') is adjacent to cell (' + cell2.row + ',' + cell2.col + ')')
        //        return true;
        //    }
        //    return false;
        //}

        //function isAdjacentToFeatured(cell) {
        //    var res = false;
        //    //featuredImages.forEach(function (featuredCell) {
        //    //    if (isAdjacent(cell, featuredCell)) {
        //    //        res = true;
        //    //        return;
        //    //    }
        //    //});
        //    return res;
        //}

        //function addToFlagRowQueueHandler(item) {
        //    addRowToFlag(item.data, item.rowNum);
        //}

        //function addRowToFlag(images, rowNum) {
        //    var row = _.filter($scope.placeholders, {row: rowNum});
        //
        //    row.forEach(function (placeholder, index) {
        //        addToFlag(placeholder, images[index]);
        //    });
        //}

        function pickRandomElement(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        function addToFlag(placeholder, image) {
            placeholder.image = image;
            totalAdded++;
            if(totalAdded === TOTAL_SIZE){
                $scope.flagFull = true;
            }
        }

        //function shuffle() {
        //    $scope.placeholders = _.shuffle($scope.placeholders);
        //    $timeout(arrange, 5000);
        //}
        //
        //function arrange() {
        //    $scope.placeholders = _.sortBy($scope.placeholders, function (item) {
        //        return item.id;
        //    });
        //}

        function feature() {
            var freeAreas = _.filter($scope.featuredImages, function (item) {
                return item.image === null;
            });
            //console.log(_.pluck(freeAreas,'area'));

            var freeArea = pickRandomElement(freeAreas);

            var filledPlaces = _.filter($scope.placeholders, function (item) {
                return item.image;
            });

            var imageToFeature = pickRandomElement(filledPlaces);

            if (imageToFeature) {
                freeArea.image = imageToFeature.image;
                $timeout(function () {
                    freeArea.image = null;
                }, 8000);
            }

            $timeout(feature, 2000);
        }


        $scope.color = function (placeholder) {
            if (placeholder.image) {
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


        $scope.clipStyle = function (image) {
            var imgSize = 24;
            var pos = image.pos * imgSize;
            return 'width: ' + imgSize + 'px; height: ' + imgSize + 'px; background-image: url(' + image.spriteUrl + '); text-align:center; background-position: -0px -' + pos + 'px;';
            //return 'clip: rect(' + image.pos + 'px,' + imgSize + 'px,' + (image.pos + imgSize) + 'px,0); top:-' + image.pos + 'px;';
        };

        //$scope.imageSrc = function () {
        //    return $scope.spriteUrl;
        //    //return 'assets/'+placeholder.image.source+'/'+placeholder.image.source_id+'.small.jpg';
        //};

        init();


    }]);
