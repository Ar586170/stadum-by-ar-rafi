(function(window, document, $, undefined) {
    'use strict';

    var stadumInit = {
        i: function(e) {
            stadumInit.s();
            stadumInit.methods();
        },

        s: function(e) {
            this._window = $(window),
                this._document = $(document),
                this._body = $('body'),
                this._html = $('html')
        },

        methods: function(e) {
            stadumInit.w();
            stadumInit.counterUp();
            stadumInit.mobileMenuActivation();
            stadumInit.stickyHeaderMenu();
            stadumInit.salActivation();
            stadumInit.bannerSliderInit();
            stadumInit.stadumSlider_2();
            stadumInit.watch_video();
            stadumInit.flagDropdown();
        },

        w: function(e) {
            this._window.on('load', stadumInit.l).on('scroll', stadumInit.res)
        },

        flagDropdown: function() {
            var $dropdownButton = $('#dropdownButton');
            var $dropdownMenu = $('#dropdownMenu');
            var $selectedFlag = $('#selectedFlag');

            if ($dropdownButton.length && $dropdownMenu.length) {
                // Toggle dropdown menu visibility
                $dropdownButton.on('click', function(e) {
                    e.stopPropagation(); // Prevent document click from immediately closing
                    $dropdownMenu.toggleClass('show');
                });

                // Handle flag selection
                $dropdownMenu.find('li').on('click', function() {
                    var $img = $(this).find('img');
                    var flagSrc = $img.attr('src');

                    // Update selected flag
                    $selectedFlag.attr('src', flagSrc);
                    
                    // Close dropdown
                    $dropdownMenu.removeClass('show');
                });

                // Close dropdown when clicking outside
                $(document).on('click', function() {
                    $dropdownMenu.removeClass('show');
                });
            }
        },
      
        counterUp: function () {
            
            var elementSelector = $('.count');
            elementSelector.each(function(){
                elementSelector.appear(function(e) {
                    var el = this;
                    var updateData = $(el).attr("data-count");
                    var od = new Odometer({
                        el: el,
                        format: 'd',
                        duration: 2000
                    });
                    od.update(updateData);
                });
            });
        },

        salActivation: function() {
            sal({
                threshold: 0.1,
                once: true
            });
        },


        mobileMenuActivation: function(e) {
            
            $('.menu-item-has-children > a').on('click', function(e) {
                
                var targetParent = $(this).parents('.mainmenu-nav'),
                    target = $(this).siblings('.stadum-submenu'),
                    targetSiblings = $(this).parent('.menu-item-has-children').siblings().find('.stadum-submenu');
                
                if (targetParent.hasClass('offcanvas')) {
                    $(target).slideToggle(400);
                    $(targetSiblings).slideUp(400);
                    $(this).parent('.menu-item-has-children').toggleClass('open');
                    $(this).parent('.menu-item-has-children').siblings().removeClass('open');
                }

            });
           
            function resizeClassAdd() {
                if (window.matchMedia('(min-width: 992px)').matches) {
                    $('body').removeClass('mobilemenu-active');
                    $('#mobilemenu-popup').removeClass('offcanvas show').removeAttr('style');
                    $('.stadum-mainmenu .offcanvas-backdrop').remove();
                    $('.stadum-submenu').removeAttr('style');
                } else {
                    $('body').addClass('mobilemenu-active');
                    $('#mobilemenu-popup').addClass('offcanvas');
                    $('.menu-item-has-children > a').on('click', function(e) {
                        e.preventDefault();
                    });
                }
            }

            $(window).on('resize', function() {
                resizeClassAdd();
            });
            
            resizeClassAdd();
        },


        stickyHeaderMenu: function() {
            var $window = $(window);
            var $body = $('body');
            var $menu = $('.stadum-mainmenu');
            var $stickyPlaceHolder = $('#stadum-sticky-placeholder');
            var $topHeader = $('.stadum-header-top');

            // Always enable sticky header
            $body.addClass('sticky-header');

            $window.on('scroll', function() {
                var scrollTop = $window.scrollTop();
                var topHeaderHeight = $topHeader.outerHeight() || 0;

                if (scrollTop > topHeaderHeight) {
                    $menu.addClass('stadum-sticky');
                    $stickyPlaceHolder.height($menu.outerHeight());
                } else {
                    $menu.removeClass('stadum-sticky');
                    $stickyPlaceHolder.height(0);
                }
            });
        },

        bannerSliderInit: function() {
            $('.js-slider-3').slick({
                dots: true,
                infinite: true,
                speed: 500,
                fade: false,
                cssEase: 'linear',
                autoplay: false,
                autoplaySpeed: 5000,
            });
        },

        stadumSlider_2: function(){
            $('.js-slider-2').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                autoplay: false,
                autoplaySpeed: 400,
                dots: false,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev"><svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0.121582C12 1.16588 13.035 2.72858 14.0812 4.04098C15.4284 5.73068 17.0362 7.20678 18.8811 8.33378C20.2632 9.17768 21.9414 9.98778 23.2896 9.98778M12 19.8784C12 18.8341 13.035 17.2714 14.0812 15.959C15.4284 14.2694 17.0362 12.7932 18.8811 11.6662C20.2632 10.8223 21.9414 10.0122 23.2896 10.0122M23.2896 9.99998H0.710449" stroke="#081933" /></svg></button>',
                nextArrow: '<button type="button" class="slick-next"><svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0.121582C12 1.16588 13.035 2.72858 14.0812 4.04098C15.4284 5.73068 17.0362 7.20678 18.8811 8.33378C20.2632 9.17768 21.9414 9.98778 23.2896 9.98778M12 19.8784C12 18.8341 13.035 17.2714 14.0812 15.959C15.4284 14.2694 17.0362 12.7932 18.8811 11.6662C20.2632 10.8223 21.9414 10.0122 23.2896 10.0122M23.2896 9.99998H0.710449" stroke="#081933" /></svg></button>',
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        },

        watch_video: function() {
            $('.stadum-demo-video').each(function() {
                $(this).magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            });
        },
    }
    stadumInit.i();

})(window, document, jQuery);