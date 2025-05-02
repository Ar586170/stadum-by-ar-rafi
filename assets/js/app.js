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
            stadumInit.sponsoreSwiperActive();
            stadumInit.testimonialSliderInit();
        },

        w: function(e) {
            this._window.on('load', stadumInit.l).on('scroll', stadumInit.res)
        },

        sponsoreSwiperActive: function () {
            var swiper = new Swiper(".mySwiper", {
              spaceBetween: 40,
              slidesPerView: 'auto',
              grabCursor: true,
              a11y: false,
              freeMode: true,
              speed: 3000,
              loop: true,
              autoplay: {
                delay: 0.5,
                stopOnLastSlide: false,
                disableOnInteraction: false,
              },
              breakpoints: {
                300: {
                  spaceBetween: 20,
                },
                375: {
                  spaceBetween: 20,
                },
                475: {
                  spaceBetween: 20,
                },
                640: {
                  spaceBetween: 30,
                },
                768: {
                  spaceBetween: 40,
                },
                991: {
                  spaceBetween: 40,
                },
              },
            });
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

        testimonialSliderInit: function() {
            $('.testimonial-slider').slick({
                infinite: true,
                slidesToShow: 1,
                arrows: true,
                dots: false,
                autoplay: false,
                prevArrow: '<button type="button" class="slick-prev"><svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g clip-path="url(#clip0_710_4885)"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.037 -1.66298C17.037 0.529757 17.4283 2.70102 18.1887 4.72685C18.9491 6.75267 20.0637 8.59339 21.4687 10.1439C22.8737 11.6944 24.5418 12.9243 26.3775 13.7634C28.2133 14.6026 30.1809 15.0345 32.1679 15.0345V15.1052H32.168V17.5052H32.1679V17.576C30.1809 17.576 28.2133 18.0079 26.3775 18.847C24.5418 19.6861 22.8737 20.9161 21.4687 22.4666C20.0637 24.0171 18.9491 25.8578 18.1887 27.8836C17.4283 29.9094 17.037 32.0807 17.037 34.2734H14.5833C14.5833 25.2158 20.1565 19.2052 27.6617 17.5051L0.167969 17.5051L0.167969 15.1051L27.6619 15.1051C20.1566 13.4051 14.5833 7.3945 14.5833 -1.66309H17.037Z" fill="#081933"/></g><defs><clipPath id="clip0_710_4885"><rect width="32" height="32" fill="white" transform="translate(0.167969 0.305176)"/></clipPath></defs></svg></button>',
                nextArrow: '<button type="button" class="slick-next"><svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_708_4588)"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.037 -1.66309C17.037 0.529653 17.4283 2.70092 18.1887 4.72675C18.9491 6.75257 20.0637 8.59328 21.4687 10.1438C22.8737 11.6943 24.5418 12.9242 26.3775 13.7633C28.2133 14.6025 30.1809 15.0343 32.1679 15.0343V15.1051H32.168V17.5051H32.1679V17.5759C30.1809 17.5759 28.2133 18.0078 26.3775 18.8469C24.5418 19.686 22.8737 20.916 21.4687 22.4665C20.0637 24.017 18.9491 25.8577 18.1887 27.8835C17.4283 29.9093 17.037 32.0806 17.037 34.2733H14.5833C14.5833 25.2158 20.1565 19.2052 27.6617 17.5051L0.167969 17.5051L0.167969 15.1051L27.6619 15.1051C20.1566 13.4051 14.5833 7.3945 14.5833 -1.66309H17.037Z" fill="#081933"/></g><defs><clipPath id="clip0_708_4588"><rect width="32" height="32" fill="white" transform="translate(0.167969 0.305176)"/></clipPath></defs></svg></button>',
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
                prevArrow: '<button type="button" class="slick-prev"><svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_710_4885)"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.037 -1.66298C17.037 0.529757 17.4283 2.70102 18.1887 4.72685C18.9491 6.75267 20.0637 8.59339 21.4687 10.1439C22.8737 11.6944 24.5418 12.9243 26.3775 13.7634C28.2133 14.6026 30.1809 15.0345 32.1679 15.0345V15.1052H32.168V17.5052H32.1679V17.576C30.1809 17.576 28.2133 18.0079 26.3775 18.847C24.5418 19.6861 22.8737 20.9161 21.4687 22.4666C20.0637 24.0171 18.9491 25.8578 18.1887 27.8836C17.4283 29.9094 17.037 32.0807 17.037 34.2734H14.5833C14.5833 25.2158 20.1565 19.2052 27.6617 17.5051L0.167969 17.5051L0.167969 15.1051L27.6619 15.1051C20.1566 13.4051 14.5833 7.3945 14.5833 -1.66309H17.037Z" fill="#081933"/></g><defs><clipPath id="clip0_710_4885"><rect width="32" height="32" fill="white" transform="translate(0.167969 0.305176)"/></clipPath></defs></svg></button>',
                nextArrow: '<button type="button" class="slick-next"><svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_708_4588)"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.037 -1.66309C17.037 0.529653 17.4283 2.70092 18.1887 4.72675C18.9491 6.75257 20.0637 8.59328 21.4687 10.1438C22.8737 11.6943 24.5418 12.9242 26.3775 13.7633C28.2133 14.6025 30.1809 15.0343 32.1679 15.0343V15.1051H32.168V17.5051H32.1679V17.5759C30.1809 17.5759 28.2133 18.0078 26.3775 18.8469C24.5418 19.686 22.8737 20.916 21.4687 22.4665C20.0637 24.017 18.9491 25.8577 18.1887 27.8835C17.4283 29.9093 17.037 32.0806 17.037 34.2733H14.5833C14.5833 25.2158 20.1565 19.2052 27.6617 17.5051L0.167969 17.5051L0.167969 15.1051L27.6619 15.1051C20.1566 13.4051 14.5833 7.3945 14.5833 -1.66309H17.037Z" fill="#081933"/></g><defs><clipPath id="clip0_708_4588"><rect width="32" height="32" fill="white" transform="translate(0.167969 0.305176)"/></clipPath></defs></svg></button>',
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