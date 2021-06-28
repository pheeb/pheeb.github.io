(function(){
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




    //Click event to scroll to top
    $("#scrollTop").click(function() {
        $('html, body').animate({
          scrollTop: 0
        }, 800);
        return false;
    }); 



    // $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a.js-anchor[href^="#"]').on('click', function (e) {
        e.preventDefault();
        // $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            // $(document).on("scroll", onScroll);
        });
    });


    // function onScroll(event){
    //     var scrollPos = $(document).scrollTop();
    //     $('.fe-tab-container .cm-tab-item').each(function () {
    //         var currLink = $(this);
    //         var refElement = $(currLink.find('a').attr("href"));
    //         if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
    //             $('.fe-tab-container a[href^="#"]').removeClass("active");
    //             currLink.addClass("active");
    //         }
    //         else{
    //             currLink.removeClass("active");
    //         }
    //     });
    // }

})();
