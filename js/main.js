$(document).ready(function() {
    // loading
    $("#loading").hide();

    //window and animation items
    var animation_elements = $.find('.fly-in');
    var web_window = $(window);

    //check to see if any animation containers are currently in view
    function check_if_in_view() {
        //get current window information
        var window_height = web_window.height();
        var window_top_position = web_window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        //iterate through elements to see if its in view
        $.each(animation_elements, function() {

            //get the element sinformation
            var element = $(this);
            var element_height = $(element).outerHeight();
            var element_top_position = $(element).offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
            if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
                element.addClass('in-view');
            } else {
                element.removeClass('in-view');
            }
        });

    }

    //on or scroll, detect elements in view
    $(window).on('scroll resize', function() {
        check_if_in_view()
    })
    //trigger our scroll event on initial load
    $(window).trigger('scroll');
});



    // scroll menu
    var $window = $(window);
    var $menu = $('#mainNav');
    var checkHasElm = function(arrID) {
        var $detect = false;
        for (var i = arrID.length - 1; i >= 0; i--) {
            if ($(arrID[i]).length > 0) {
                $detect = $(arrID[i]);
                break;
            }
        }
        return $detect;
    };

    var $menu_target = (function() {
        return checkHasElm([
            '#nav'
        ]);
    }());

    var timer;
    $window.scroll(function() {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(function() {
            $menu.toggleClass('menu--scroll', $window.scrollTop() >= $menu_target.offset().top);
        }, 200);
    });

    function goScroll(target) {
        var target_top = $(target).offset().top;
        var header_height = ($('html').width() <= 768) ? 0 : $('#menu').height();
        var sTop = target_top - header_height;

        $('html, body').stop().animate({
            scrollTop: sTop
        }, 1000);
    }

    location.hash && goScroll(location.hash);