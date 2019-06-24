var toggleScroll = function(boolean) {
    if (boolean) {
        $(window).off('scroll touchmove mousewheel');
    } else {
        $(window).on('scroll touchmove mousewheel', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        })
    }
}
//modal


// mobile
$(".menu__burger, .menu__mask").on('click', function() {
    $('.menu__burger').toggleClass("on");
    $('.menu__content').toggleClass('on');
    $('.menu').toggleClass('on');
    $('body').toggleClass('is-hidden');
});

//scroll
$('a[href^="#"]:not([href="#"], [href="#buy_ticket"], [href="#carousel-example-generic"] )').click(function(e) {
    var target = '#' + $(this).attr('href').split('#')[1];
    console.log(target);
    goScroll(target);
    return false;
});

function goScroll(target) {
    var $target = $(target);
    var target_top = $target.offset().top;
    var header_height = ($('html').width() <= 768) ? 0 : $('.navbar-nav').height();
    var sTop = target_top - header_height;
    $('html, body').stop().animate({
        scrollTop: sTop
    }, 500);
}

location.hash && goScroll(location.hash);