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
            toggleBannerInterval: 10000,
            emptyThreshold: 500,
            firstFillThreshold: 750,
            featureStartDelay: 5000,
            featuredImagePeriod: 8000,
            nextFeatureDelay: 2000
        },

        init: function () {
            this.imageCount = 0;
            this.totalSize = this.$placeholders.length;
            this.emptyCount = this.totalSize;
            this.lastUpdated = null;
            this.images = [];

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

            $.getJSON('/images', {lastUpdated: me.lastUpdated}, function (data) {
                me.insertNewImages(data.total);

                me.imageCount += data.total;
                me.images = me.images.concat(data.data);
                me.lastUpdated = data.lastUpdated;
                me.updateCounter();

            });


            setTimeout($.proxy(me.getNewImages, me), me.config.getImagesInterval);

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
            var me = this,
                banners;

            banners = me.$bannerText.find('.text');

            if(banners.eq(0).is(":visible")){
                banners.eq(0).hide();
                banners.eq(1).slideDown();
            }
            else
            {
                banners.eq(0).slideDown();
                banners.eq(1).hide();
            }

            setTimeout($.proxy(me.toggleBanner, me), me.config.toggleBannerInterval);
        },

        feature: function () {
            var me = this,
                imageToFeature,
                emptySpots, randomSpot;

            if(me.images.length > 0) {
                console.log(me.images);
                imageToFeature = pickRandomElement(me.images);
                console.log(imageToFeature);
                emptySpots = me.$featureContainers.filter('.empty');
                randomSpot = $(pickRandomElement(emptySpots));

                var img = $('<img>'); //Equivalent: $(document.createElement('img'))
                img.attr('src', 'assets/' + imageToFeature.source + '/' + imageToFeature.source_id + '.small.jpg');
                img.attr('style','margin-top:' + (75 + Math.floor(Math.random() * 50)) + 'px; margin-left: ' + Math.floor(Math.random() * 200) + 'px;');
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

                setTimeout(function () {
                    img.remove();
                    randomSpot.addClass('empty');
                }, me.config.featuredImagePeriod);
            }
            setTimeout($.proxy(me.feature, me), me.config.nextFeatureDelay);

        }

    };

    flag.init();
})();