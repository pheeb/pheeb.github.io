$(function(){
    startTimer();


    //Get URL
    var pathURL_Local = 'promotion/dir/promo/',
        yearURL = '2018',
        monthURL = '10',
        promotionURL = 'PRMM-6239-Game-Promo'
        pathURL = 'assets/',
        //newURL_Local   For Local
        newURL_Local =  window.location.protocol + "//" + window.location.host + "/" + pathURL_Local + yearURL + "/" + monthURL+ "/" + promotionURL + "/" + pathURL;
        //newURL_aws   For Aws
        newURL_aws = '//promotion-assets.11street.my/assets/' + yearURL + "/" + monthURL+ "/" + promotionURL + "/" + pathURL;
    // console.log(newURL + 'folder Name here')








    //count down timer
    function pad(num) {
        return ("0" + parseInt(num)).substr(-2);
    }

    function startTimer1() {
        var end1 = new Date;
        end1.setHours(14, 59, 59); // 11:00am
        var x1 = setInterval(function() {
            var now1 = new Date;
            var timer1 = $('.time1');
            var hour1 = timer1.find('.hour');
            var minute1 = timer1.find('.minute');
            var second1 = timer1.find('.second');

            var remain1 = ((end1 - now1) / 1000);
            var hh1 = pad((remain1 / 60 / 60) % 60);
            var mm1 = pad((remain1 / 60) % 60);
            var ss1 = pad(remain1 % 60);

            hour1.text(hh1);
            minute1.text(mm1);
            second1.text(ss1);

            if (now1 > end1) { // too late, go to tomorrow
                clearTimeout(x1);
                // timer1.removeClass('now').addClass('comingSoon');
                // $('.time2').removeClass('comingSoon').addClass('now');
            }
      }, 1000);
    }
    
    function startTimer2() {
        var end2 = new Date;
        end2.setHours(17, 59, 59); // 3:00pm
        var x2 = setInterval(function() {
            var now2 = new Date;
            var timer2 = $('.time2');
            var hour2 = timer2.find('.hour');
            var minute2 = timer2.find('.minute');
            var second2 = timer2.find('.second');

            var remain2 = ((end2 - now2) / 1000);
            var hh2 = pad((remain2 / 60 / 60) % 60);
            var mm2 = pad((remain2 / 60) % 60);
            var ss2 = pad(remain2 % 60);

            hour2.text(hh2);
            minute2.text(mm2);
            second2.text(ss2);


            if (now2 > end2) { // too late, go to tomorrow
                clearTimeout(x2);
                // timer2.removeClass('now').addClass('comingSoon');
                // $('.time3').removeClass('comingSoon').addClass('now');
            }
      }, 1000);
    }
    
    function startTimer3() {
        var end3 = new Date;
        end3.setHours(10, 59, 59); // 6:00pm

        var x3 = setInterval(function() {
            var now3 = new Date;
            var timer3 = $('.time3');
            var hour3 = timer3.find('.hour');
            var minute3 = timer3.find('.minute');
            var second3 = timer3.find('.second');

            var remain3 = ((end3 - now3) / 1000);
            var hh3 = pad((remain3 / 60 / 60) % 60);
            var mm3 = pad((remain3 / 60) % 60);
            var ss3 = pad(remain3 % 60);

            hour3.text(hh3);
            minute3.text(mm3);
            second3.text(ss3);


            if (now3 > end3) { // too late, go to tomorrow
                // clearTimeout(x3);
                end3.setDate(end3.getDate() + 1);
                // timer3.removeClass('now').addClass('comingSoon');
                // $('.time1').removeClass('comingSoon').addClass('now');
            }
      }, 1000);
    }


    startTimer3();
    startTimer2();
    startTimer1();
    














    //count down timer
    // https://www.timeanddate.com/date/durationresult.html?d1=2&m1=8&y1=2018&d2=13&m2=8&y2=2018&h1=17&i1=30&s1=7&h2=10&i2=59&s2=59
    var countDown = new Date('August 13, 2018 10:59:59').getTime(),
    x = setInterval(function() {


        var now = new Date().getTime(),
            distance = countDown - now;

            var seconds = Math.floor((distance / 1000) % 60);
            var minutes = Math.floor((distance / 1000 / 60) % 60);
            var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));


            var timer = $('#time' );
            var day = timer.find('.day');
            var hour = timer.find('.hour');
            var minute = timer.find('.minute');
            var second = timer.find('.second');

            day.text(('0' + days).slice(-2));
            hour.text(('0' + hours).slice(-2));
            minute.text(('0' + minutes).slice(-2));
            second.text(('0' + seconds).slice(-2));

            if (distance <= 0) {
                clearInterval(x);
                day.text('00');
                hour.text('00');
                minute.text('00');
                second.text('00');
            }
    });




function startTimer() {
    var systemDateNo, systemMonth, systemYear, systemHour, systemMinute, systemSecond;

    $.ajax({
        type        : 'GET',
        url         : 'http://www.11street.my/common/getServerDateTimeAjax.do',
        dataType    : 'json',
        timeout     : 1000
    }).done(function(resultObj) {
        //resultObj = {"requestStatus":"SUCCESS", "serverDateTime":"30012016095957"};
        systemDateVal   = resultObj.serverDateTime;
        systemDateNo    = systemDateVal.substring(0,2);
        systemMonth     = systemDateVal.substring(2,4);
        systemYear      = systemDateVal.substring(4,8);
        systemHour      = systemDateVal.substring(8,10);
        systemMinute    = systemDateVal.substring(10,12);
        systemSecond    = systemDateVal.substring(12,14);
        generateSystemDate();
    }).fail(function() {
        var currentTime = new Date();
        systemDateNo    = currentTime.getDate();
        if(systemDateNo < 10) systemDateNo = '0' + systemDateNo;
        systemMonth     = currentTime.getMonth() + 1;
        if(systemMonth < 10) systemMonth = '0' + systemMonth;
        systemYear      = currentTime.getFullYear();
        systemHour      = currentTime.getHours();
        systemMinute    = currentTime.getMinutes();
        systemSecond    = currentTime.getSeconds();
        generateSystemDate();
    });

    function generateSystemDate() {
        var systemDateStr = systemMonth + '/' + systemDateNo + '/' + systemYear + ' ' +
                            systemHour + ':' + systemMinute + ':' + systemSecond;
        var jsSystemDate = ( new Date( systemDateStr ) ).getTime();
        initializeClock( jsSystemDate );
    }
}

function initializeClock( milisecond ) {
    var curTime = milisecond;
    var clock = $('#clock');
    var hour = clock.find('.hour');
    var minute = clock.find('.minute');
    var second = clock.find('.second');

    function updateClock() {
        curTime = curTime + 1000;

        var systemHours = ( new Date( curTime ) ).getHours();
        if( systemHours < 10 ) systemHours = '0' + systemHours;
        var systemMinutes = ( new Date( curTime ) ).getMinutes();
        if( systemMinutes < 10 ) systemMinutes = '0' + systemMinutes;
        var systemSeconds = ( new Date( curTime ) ).getSeconds();
        if( systemSeconds < 10 ) systemSeconds = '0' + systemSeconds;

        hour.text(systemHours);
        minute.text(systemMinutes);
        second.text(systemSeconds);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}













    
    // app Download START
    var app = $('.fe-app-section'),
        appBtn = app.find('img'),
        container = app.find('.fe-app-wrapper'),
        appClose = app.find('.fe-close-button');

    appBtn.on('click', function() {
        $(this).css('opacity', '0');
        container.addClass('scaleIn').removeClass('scaleOut').fadeIn(350);
    })

    appClose.on('click', function() {
        container.addClass('scaleOut').removeClass('scaleIn').fadeOut(350);
        appBtn.css('opacity', '1');
    })
    // app Download END







    //Swiper Slider START
    //Swiper Slider START
    function swiperDesktop(){ 
        var swiper1;

        swiper1 = new Swiper('.js-swiper-banners-1-swiper-container', {
            lazy: true,
            watchOverflow: true,
            slidesPerView: 3,
            spaceBetween: 3,

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
                nextEl: '.swiper-button-next-outter-4',
                prevEl: '.swiper-button-prev-outter-4',
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

        swiper1 = new Swiper('.js-swiper-banners-1-swiper-container', {
            lazy: true,
            watchOverflow: true,
            slidesPerView: 2.5,
            spaceBetween: 3,

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
                nextEl: '.swiper-button-next-outter-4',
                prevEl: '.swiper-button-prev-outter-4',
            },

            // And if we need scrollbar
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            //     hide: false,
            //     draggable : true,
            // },



            // Responsive breakpoints
            // breakpoints: {
            //     480: {
            //         slidesPerView: 1.5,
            //         // width: $('.tab-01 .cm-prod-item').width() - 60
            //     }
            // }
        });
    }
    if (navigator.userAgent.indexOf("Mobile") <= 0) {
        swiperDesktop();
        $(window).on( 'resize', swiperDesktop);
    } else {
        swiperMobile();
        $(window).on( 'resize', swiperMobile);
    }
    //Swiper Slider END
    //Swiper Slider END









    //Slick Slider START
    // if (navigator.userAgent.indexOf("Mobile") >= 0) {
    //     function slickChanges() {
    //         if ($(window).width() <= 480) {
    //             /*-----------------------------------------------
    //                 Mobile
    //             -----------------------------------------------*/
    //             $('.fe-slider .products-section .slick.slick-custom').slick('slickSetOption', 'slidesToShow', 1.5, true);
    //             $('.fe-slider .products-section .slick.slick-custom').slick('slickSetOption', 'slidesToScroll', 1, true);
    //         }
    //     } 


    //     slickChanges();
    //     $(window).resize(slickChanges);
    // }
    //Slick Slider END





    // tabs
    var tabs = $('div.fe-tab'),
        totalTabs = tabs.length;

    if ( tabs.length ) {
        for ( var i = 0; i < totalTabs; i++ ) {
            tab = $(tabs[i]);
            btn = $('li.fe-tab-link');

            btn.click(function(){
                var tab_id = $(this).attr('data-feTab'),
                    $tabs = $(this).closest('.fe-tab');

                $tabs.find('li.fe-tab-link.active').removeClass('active');

                $(this).addClass('active');
                
                $tabs.find('.tab-pane:not(:hidden)').removeClass('active');
                $("#"+tab_id).addClass('active');

            })
        }
    }



    //Navbar START
    var navbar = $(".js-fe-navbar"),
        navbarTab = navbar.find(".fe-tabs"),
        navbarItem = navbar.find("li.fe-tab-item > a.js-anchor");
        
    if (navigator.userAgent.indexOf("Mobile") <= 0) {
        $('.fe-navbar ul li.fe-tab-item a').click(function(){
            $('li.fe-tab-item').removeClass("active");
            $(this).parent().parent().addClass("active");
        });
    } else {
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


        $('.fe-navbar .navBar-section .slick li.fe-tab-item a').click(function(){
            $('.fe-navbar .navBar-section .slick li.fe-tab-item').removeClass("active");
            $(this).parent().parent().addClass("active");
        });

        

        $(document).click(function(e) {
            var target = e.target;
            if (!$(target).is('.js-fe-navbar .dropdown-toggle') && !$(target).parents().is('.js-fe-navbar .dropdown-toggle')) {
                $('.js-fe-navbar .dropdown-toggle').removeClass('expand');
                $('.js-fe-navbar .dropdown').hide();
            }
        });
    }


    if (navbar.length) {
        $(window).on("scroll", function() {
            var o = $(this).scrollTop() + 80;

            navbar.offset().top < o ? navbarTab.addClass("fixed") : navbarTab.removeClass("fixed");

            if (navigator.userAgent.indexOf("Mobile") >= 0) {
                if ($('.js-fe-navbar .dropdown-toggle').hasClass("expand")) {
                    $('.js-fe-navbar .dropdown-toggle').removeClass("expand");
                    $('.js-fe-navbar .dropdown').hide();
                }
            }
        })
    }



    //smoothscroll
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
                scrollTop: ($(hash).offset().top - 170)
            }, 500);
        }

        return false;
    });
    //Navbar END




    //Slick for Desktop
    if (navigator.userAgent.indexOf("Mobile") <= 0) {
        $('.fe-slider .products-section .slick').slick({
            slidesPerRow: 5,
            rows: 2,
            infinite: false,
            adaptiveHeight: false,
      });
        
    } 
    

});