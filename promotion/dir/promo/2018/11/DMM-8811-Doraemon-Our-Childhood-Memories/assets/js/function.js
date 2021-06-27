$(function(){


    //Get URL
    var yearURL = '2018',
        monthURL = '10',
        promotionURL = 'PRMM-6239-Game-Promo'
        pathURL = 'assets/',
        //newURL_Local   For Local
        newURL_Local =  window.location.protocol + "//" + window.location.host + "/" + 'promotion/dir/promo/' + yearURL + "/" + monthURL+ "/" + promotionURL + "/" + pathURL;
        //newURL_aws   For Aws
        newURL_aws = '//image.11st.my/g3/md_img/promo/' + yearURL + "/" + monthURL+ "/" + promotionURL + "/" + pathURL;
    // console.log(newURL + 'folder Name here')










    //Load Images when window load
    $(window).load(function() {
        $.fn.preLoadImages = function(cb) {
            var urls = [], promises = [], $imgs = $(this).find('img');
            $imgs.each(function(){
                var promise = $.Deferred();
                var img = new Image();
                img.onload = function(){
                    promise.resolve(img.src);
                };
                img.src = $(this).attr('src');
                promises.push(promise);
            });

            $.when.apply(null, promises).done(cb);
        }

        $('#cm-promotion').preLoadImages(function(){
            var results = arguments;
        });
    });










    //Swiper Slider START
    function swiperDesktop(){  
        var swiper1;

        swiper1 = new Swiper('.js-swiper-container', {
            lazy: true,
            watchOverflow: true,
            slidesPerView: 5,
            spaceBetween: 10,

            // If we need row
            // slidesPerView: 3, // or 'auto'
            // slidesPerColumn: 2,
            // slidesPerGroup:3,


            // If we need pagination
            // pagination: {
            //     el: '.swiper-pagination',
            //     type: 'bullets',
            //     clickable: true,
            // },
            
            
            // Navigation arrows
            navigation: {
                prevEl: '.js-swiper-button-prev',
                nextEl: '.js-swiper-button-next',
            },



            // And if we need scrollbar
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            //     hide: false,
            //     draggable : true,
            // },
        });
    }
    function swiperMobile(){  
        var swiper1;

        swiper1 = new Swiper('.js-swiper-container', {
            lazy: true,
            watchOverflow: true,
            slidesPerView: 3.5,
            spaceBetween: 10,

            // If we need row
            // slidesPerView: 3, // or 'auto'
            // slidesPerColumn: 2,
            // slidesPerGroup:3,


            // If we need pagination
            // pagination: {
            //     el: '.swiper-pagination',
            //     type: 'bullets',
            //     clickable: true,
            // },
            
            
            // Navigation arrows
            navigation: {
                prevEl: '.js-swiper-button-next',
                nextEl: '.js-swiper-button-prev',
            },

            // And if we need scrollbar
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            //     hide: false,
            //     draggable : true,
            // },



            // Responsive breakpoints
            // breakpoints: {
            //     499: {
            //         slidesPerView: 2.5,
            //         width: $('.js-swiper-container .cm-prod-item').width() - 50
            //     }
            // }
        });
    }
    if (navigator.userAgent.indexOf("Mobile") <= 0) {
        //Desktop
        swiperDesktop();
        $(window).on( 'resize', swiperDesktop);
    } else {
        //Mpbile
        swiperMobile();
        $(window).on( 'resize', swiperMobile);
    }
    //Swiper Slider END













    //Slick Slider START
    // https://github.com/kenwheeler/slick/
    function slickDesktop(){  
        $('.fe-slider .products-section .slick').not('.slick-initialized').slick({
            lazyLoad: 'ondemand',
            infinite: false,
            adaptiveHeight: true,
            speed : 600,
            // dots: true, //true show dots
            // arrows: false,  //false hide arrow


            //Default - hide if row Active -- START
            slidesToShow: 4,
            slidesToScroll: 2,
            //Default - hide if row Active -- END


            //Row - Show only -- START
            // rows: 2, //Use slidesPerRow to set
            // slidesPerRow: 4,
            //Row - Show only -- END
        });
    }
    function slickMobile(){  
        $('.fe-slider .products-section .slick').not('.slick-initialized').slick({
            lazyLoad: 'ondemand',
            infinite: false,
            adaptiveHeight: true,
            speed : 600,
            // dots: true, //true show dots
            // arrows: false,  //false hide arrow


            //Default - hide if row Active -- START
            slidesToShow: 2.5,
            slidesToScroll: 2,
            //Default - hide if row Active -- END


            //Row - Show only -- START
            // rows: 2, //Use slidesPerRow to set
            // slidesPerRow: 4,
            //Row - Show only -- END
            responsive: [
                {
                    breakpoint: 481,
                    settings: {
                        //Default - hide if row Active -- START
                        slidesToShow: 1.5,
                        slidesToScroll: 1,
                        //Default - hide if row Active -- END
                        

                        //Row - Show only -- START
                        // rows: 2, //Use slidesPerRow to set
                        // slidesPerRow: 4,
                        //Row - Show only -- END
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
        });
    }

    
    if (navigator.userAgent.indexOf("Mobile") <= 0) {
        //Desktop
        slickDesktop();
        $(window).on( 'resize', slickDesktop);
    } else {
        //Mpbile
        slickMobile();
        $(window).on( 'resize', slickMobile);
    }
    //Slick Slider END











    // tabs
    function tabs(){  
        var tabs = $('div.js-fe-tab-toggle'),
        totalTabs = tabs.length;

        if ( tabs.length ) {
            for ( var i = 0; i < totalTabs; i++ ) {
                tab = $(tabs[i]);
                btn = tabs.find('ul li.fe-tab-link');

                btn.click(function(){
                    var tab_id = $(this).attr('data-feTab'),
                        $tabs = $(this).closest('.js-fe-tab-toggle');

                    $tabs.find('li.fe-tab-link.active').removeClass('active');

                    $(this).addClass('active');
                    
                    $tabs.find('.tab-pane:not(:hidden)').removeClass('active');
                    $("#"+tab_id).addClass('active');
                });
            }
        }





        //tabs Special
        $(".js-fe-tab-special ul li.fe-tab-link-toggle").click(function() {
            var tab_id = $(this).attr('data-feTab');

            $(this).siblings().removeClass('active');
            $('.js-fe-tab-special').find("#"+tab_id).siblings().removeClass('active');

            $(this).toggleClass('active');
            $("#"+tab_id).toggleClass('active');


            // if (navigator.userAgent.indexOf("Mobile") <= 0) {
                // setTimeout(function() {
                //     console.log('remove active');
                //     $('.js-fe-navbar .js-fe-tab-toggle ul li.fe-tab-link.active').removeClass('active');
                //     $('.js-fe-navbar .js-fe-tab-toggle .tab-content .tab-pane').removeClass('active');
                // }, 20000);

                // function countdown(element) {
                    // interval = setInterval(function() { 
                    //     if ($(this).hasClass('active')) {    
                    //         $(this).siblings().removeClass('active');
                    //         $('.js-fe-tab-special').find("#"+tab_id).siblings().removeClass('active');
                    //         clearInterval(interval);
                    //     }
                    // }, 300);
                // }
            // }
        });
    }
    tabs();
    $(window).on( 'resize', tabs);
    










    
    


    //Navbar START
    var navbar = $(".js-fe-navbar"),
        navbarTab = navbar.find(".fe-tabs"),
        navbarItem = navbar.find("li.fe-tab-item > a.js-anchor");

    function navbarDesktop(){  
        $('.fe-navbar ul li.fe-tab-item a').click(function(){
            $('li.fe-tab-item').removeClass("active");
            $(this).parent().parent().addClass("active");
        });
    }
    function navbarMobile(){  
        $('.js-fe-navbar .dropdown-toggle').click(function(){
            if ($(this).hasClass('expand')) {    
                $(this).removeClass('expand');
                $(this).parent().find('.dropdown').slideUp();
            } else {
                $(this).parent().find('.dropdown').slideUp();
                $('.js-fe-navbar .dropdown-toggle').removeClass('expand');
                $(this).addClass('expand');
                $(this).next().filter('.dropdown').slideToggle();
            }
        });




        //Slick Navbar -- START
        $('.fe-slider .navBar-section .slick').not('.slick-initialized').slick({
            lazyLoad: 'ondemand',
            infinite: false,
            adaptiveHeight: true,
            speed : 600,
            slidesToShow: 3.5,
            slidesToScroll: 2,
            // dots: true, //true show dots
            // arrows: false,  //false hide arrow

            //Row - Show only -- START
            // rows: 2,
            //Row - Show only -- END
            responsive: [
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 1.5,
                        slidesToScroll: 1,

                        //Row - Show only -- START
                        // rows: 2,
                        //Row - Show only -- END
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
        });
        $('.fe-navbar .navBar-section .slick li.fe-tab-item a').click(function(){
            $('.fe-navbar .navBar-section .slick li.fe-tab-item').removeClass("active");
            $(this).parent().parent().addClass("active");
        });
        //Slick Navbar -- END




        

        $(document).click(function(e) {
            var target = e.target;
            if (!$(target).is('.js-fe-navbar .dropdown-toggle') && !$(target).parents().is('.js-fe-navbar .dropdown-toggle')) {
                $('.js-fe-navbar .dropdown-toggle').removeClass('expand');
                $('.js-fe-navbar .dropdown').hide();
            }
        });
    }
    function navbarScroll(){  
        if (navbar.length) {
            $(window).on("scroll", function() {
                var o = $(this).scrollTop() + 80;

                navbar.offset().top < o ? navbarTab.addClass("fixed") : navbarTab.removeClass("fixed");

                if (navigator.userAgent.indexOf("Mobile") >= 0) {
                    if (navigator.userAgent.indexOf("CP_11STMY") >= 0) {
                        navbar.offset().top < o ? navbarTab.addClass("fixed-app") : navbarTab.removeClass("fixed-app");
                    }
                    
                    if ($('.js-fe-navbar .dropdown-toggle').hasClass("expand")) {
                        $('.js-fe-navbar .dropdown-toggle').removeClass("expand");
                        $('.js-fe-navbar .dropdown').hide();
                    }
                }
            })
        }
    }
    function navbarSmoothScroll(){  
        $('a.js-anchor[href^="#"]').on('click', function (e) {
            var hash = this.hash;

            $("a[href^='#']").removeClass('active');
            $(this).addClass('active');

            if (navigator.userAgent.indexOf("Mobile") <= 0) {
                $('html, body').animate({
                    scrollTop: ($(hash).offset().top - 155)
                }, 500);
            } else {
                $('html, body').animate({
                    scrollTop: ($(hash).offset().top - 100)
                }, 500);
            }

            return false;
        });
    }
        
    if (navigator.userAgent.indexOf("Mobile") <= 0) {
        //Desktop
        navbarDesktop();
        $(window).on( 'resize', navbarDesktop);
    } else {
        //Mpbile
        navbarMobile();
        $(window).on( 'resize', navbarMobile);
    }


    
    navbarScroll();
    $(window).on( 'resize', navbarScroll);


    //smoothscroll
    navbarSmoothScroll();
    $(window).on( 'resize', navbarSmoothScroll);
    //Navbar END




    

});
