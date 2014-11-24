(function () {
    function pickRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    var flag = {
        $flag: $('#flag'),
        $placeholders: $('.placeholder'),
        $countHolder: $('#photo-counter'),
        $bannerText: $('.bannerText'),
        $featureContainers: $('.featured-image'),
        config: {
            sliceSize: 50,
            insertDelay: 100,
            getImagesInterval: 5000,
            toggleBannerInterval: 5000,
            emptyThreshold: 500,
            firstFillThreshold: 1250,
            featureStartDelay: 5000,
            featuredImagePeriod: 8000,
            nextFeatureDelay: 2000
        },

        init: function () {
            this.imageCount = 0;
            this.totalSize = this.$placeholders.length;
            this.emptyCount = this.totalSize;
            this.lastUpdated = 0;
            this.images = [];
            this.currentBannerIndex = 0;

            // show images
            this.bootstrapFlag();

            //get new images
            this.getNewImages();

            // toggle banner
            setTimeout($.proxy(this.toggleBanner,this),this.config.toggleBannerInterval);

            // feature images
            setTimeout($.proxy(this.feature,this),this.config.featureStartDelay);

        },

        bootstrapFlag: function () {
            var me = this,
                hiddenImages = me.$placeholders.filter('.blackout');

            if (hiddenImages.length > me.config.firstFillThreshold) {
                me.showImages(me.config.sliceSize);

                setTimeout($.proxy(me.bootstrapFlag, me), me.config.insertDelay);
            }
        },

        showImages: function (numToShow) {
          var me = this,
              hiddenImages = me.$placeholders.filter('.blackout'),
              slice;

            hiddenImages = _.shuffle(hiddenImages);
            if (hiddenImages.length > numToShow)
                slice = hiddenImages.slice(0, numToShow);
            else
                slice = hiddenImages;

            $.each(slice, function () {
                $(this).removeClass('blackout');
            });

            me.emptyCount -= slice.length;
        },

        hideImages: function (numToHide) {
            var me = this,
                shownImages = me.$placeholders.filter(':not(.blackout)'),
                slice;

            shownImages = _.shuffle(shownImages);
            if (shownImages.length > numToHide)
                slice = shownImages.slice(0, numToHide);
            else
                slice = shownImages;

            $.each(slice, function () {
                $(this).addClass('blackout');
            });

            me.emptyCount += slice.length;
        },

        getNewImages: function () {
            var me = this;

            $.getJSON('/images', {lastUpdated: me.lastUpdated}, function (response) {
                var newImagesCount = response.data.length;

                if(newImagesCount > 0){
                    me.lastUpdated = response.data[newImagesCount - 1].updated_at;
                    me.insertNewImages(newImagesCount);
                    me.addToImagesArray(response.data);
                    me.updateCounter();
                }
                setTimeout($.proxy(me.getNewImages, me), me.config.getImagesInterval);
            });

        },

        addToImagesArray: function (imagesToAdd)
        {
            var me = this;
            me.images = me.images.concat(imagesToAdd);
            me.imageCount += imagesToAdd.length;
        },

        insertNewImages: function(newCount) {
            var me = this;
            if(me.lastUpdated){
                me.showImages(newCount);
                if(me.emptyCount < me.config.emptyThreshold){
                    me.hideImages(me.config.firstFillThreshold - me.emptyCount);
                }

            }

        },

        updateCounter: function () {
            this.$countHolder.text(this.imageCount);
        },

        toggleBanner: function () {
            var me = this,nextIndex,
                banners, current, next;

            banners = me.$bannerText.find('.text');
            nextIndex = (me.currentBannerIndex +1) % banners.length;

            current = banners.eq(me.currentBannerIndex);
            next = banners.eq(nextIndex);

            current.hide();
            next.show();

            me.currentBannerIndex = nextIndex;

            setTimeout($.proxy(me.toggleBanner, me), me.config.toggleBannerInterval);
        },

        feature: function () {
            var me = this,
                imageToFeature,
                emptySpots, randomSpot;

            if(me.images.length > 0) {
                imageToFeature = pickRandomElement(me.images);
                emptySpots = me.$featureContainers.filter('.empty');
                randomSpot = $(pickRandomElement(emptySpots));

                var img = $('<img>'); //Equivalent: $(document.createElement('img'))
                img.attr('src', 'assets/' + imageToFeature.source + '/' + imageToFeature.source_id + '.small.jpg');
                img.attr('style','margin-top:' + (75 + Math.floor(Math.random() * 50)) + 'px; margin-left: ' + Math.floor(Math.random() * 200) + 'px;');
                img.load(function(){
                    img.appendTo(randomSpot);
                    randomSpot.removeClass('empty');
                    img.animate({
                        height: "300",
                        width: "300",
                        top: "-=75",
                        left: "-=75"
                    }, 1000, function() {
                        // Animation complete.
                    });

                    //remove image
                    setTimeout(function () {
                        img.remove();
                        randomSpot.addClass('empty');
                    }, me.config.featuredImagePeriod);
                });

            }
            setTimeout($.proxy(me.feature, me), me.config.nextFeatureDelay);

        }

    };

    flag.init();
})();