$(function() {
    $('.carousel').carousel();

    location.hash && (function() {
        goScroll(location.hash);
    }());

    $('.target-link').click(function() {
        var target = $(this).attr("href");
        goScroll(target);
        return false;
    });

    $(window).on('scroll', function() {
        var kvTop = $('#header').offset().top;
        var kvHeight = $('#header').height();
        var scrollTop = $('html, body').scrollTop();
        var needAddClass = (scrollTop > kvTop + kvHeight);
        $('#naviTop-content').toggleClass('bg-full', needAddClass);
        // var showGoTop = (scrollTop < 100);
        // $('#goTop').toggle(showGoTop);
    }).scroll();

});

function goScroll(id) {
    var target = $(id);
    var sTop = 0;
    if (target.length) {
        var target_top = $(target).offset().top;
        var header_height = $('#nav').height();
        sTop = target_top - header_height;
    }
    $('html, body').stop().animate({
        scrollTop: sTop
    }, 500, function() {
        location.hash = id;
    });
}