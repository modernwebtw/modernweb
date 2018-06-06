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

// google map
// google.maps.event.addDomListener(window, 'load', init);

// function init() {
//     var mapOptions = {
//         zoom: 17,
//         scrollwheel: false,
//         center: new google.maps.LatLng(25.020585, 121.542329)
//     };

//     var mapElement = document.getElementById('map');
//     var map = new google.maps.Map(mapElement, mapOptions);
//     var marker = new google.maps.Marker({
//         position: new google.maps.LatLng(25.0188305, 121.5367037),
//         map: map,
//         title: '臺灣大學博雅教學館'
//     });
// }


// sinuous

var sinuousStart = function() {
    $('html, body').scrollTop(0);
    $('#sinuous_bg').show();
    $('body').addClass('game_start');
    var $sinuous = $('#sinuous');
    var g_w = $sinuous.width();
    var g_h = $sinuous.height();
    $sinuous.attr({
        'width': g_w,
        'height': g_h
    });
    SinuousWorld.stop();
    SinuousWorld.clear();
    SinuousWorld.init();
    toggleScroll(false);
    $('.rocket-box').removeClass('rocket-fly');
}

var sinuousPause = function() {
    $('body').removeClass('game_start');
    toggleScroll(true);
    $('.rocket-box').removeClass('rocket-fly');
    $('.rocket-line').show();
}

$(document).click(function(evt) {
    if (evt.target.id == "rocket") {
        return;
    } else {
        sinuousPause();
    }
});


$('#rocket').click(function() {
    // $('.rocket-line').hide();
    $('.rocket-box').addClass('rocket-fly');
    $('#modal_sinous_start').modal('show');
});

$('#modal_sinuous_start').on('shown.bs.modal', function() {
    // ga('send', 'event', 'CTA', 'click', "Enter MW17 Game");
    $('.modal-backdrop').addClass('game-bg-waring');
});


$('#btn_sinuous_start').click(function() {
    $('.ta').hide();
    $('.header').hide();
    $('body').addClass('stopScroll');
    $('#game').hide();
    $('canvas#world').addClass('topLayer').show();
    $('#status').css('z-index', '9999').show();
    sinuousStart();
});

$('#btn_sinuous_continue').click(function() {
    $('.ta').hide();
    $('.header').hide();
    $('body').addClass('stopScroll');
    $('#game').hide();
    $('canvas#world').addClass('topLayer').show();
    $('#status').css('z-index', '9999').show();
    sinuousStart();
});

$('#btn_back2').click(function() {
    $('.ta').show();
    $('body').removeClass('stopScroll');
    $('.header').show();
    $('#sinuous_bg').hide();
    sinuousPause();
});

$('#btn_sinuous_back').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Don't Want to Play MW17 Game");    
    sinuousPause();
});

$('#btn_sinuous_exit').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Exit MW17 Game");
    $('.ta').show();
    $('.header').show();
    sinuousPause();
});


// game

$('#modal_game_start').on('shown.bs.modal', function() {
    // ga('send', 'event', 'CTA', 'click', "Enter MW17 Game");
    $('.modal-backdrop').addClass('game-bg-waring');
});

$('.alienUFO').click(function() {
    $('#modal_game_start').modal('show');
});

$('#btn_game_start').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Play MW17 Game");
    $('.ta').hide();
    $('body').addClass('stopScroll');
    $('.header').hide();
    $('#game').show();
    $('#game_bg').show().css('overflow', 'hidden');
    gameStart();
});

$('#btn_continue').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Continue MW17 Game");
    $('#game').show();
    $('#game_bg').show();
    gameStart();
});

// 返回基地
$('#btn_back').click(function() {
    $('.ta').show();
    $('.header').show();
    $('body').removeClass('stopScroll');
    $('#game').hide();
    $('#game_bg').hide();
    gamePause();
});

// 先閃避
$('#btn_game_back').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Don't Want to Play MW17 Game");
    gamePause();
});

$('#btn_exit').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Exit MW17 Game");
    $('.ta').show();
    gamePause();
});

var gameStart = function() {
    $('html, body').scrollTop(0);
    $('body').addClass('game_start');
    $('.header').hide();
    $('#game_bg').show();
    var $game = $('#game');
    var g_w = $game.width();
    var g_h = $game.height();
    $game.attr({
        'width': g_w,
        'height': g_h
    });
    Game.init();
    toggleScroll(false);
}

var gamePause = function() {
    $('body').removeClass('game_start');
    $('#game_bg').hide();
    Game.pause();
    toggleScroll(true);
}

// flappy

$('.rock').click(function() {
    $('#modal_flappy_start').modal('show');
});

$('#modal_flappy_start').on('shown.bs.modal', function() {
    // ga('send', 'event', 'CTA', 'click', "Enter MW17 Game");
    $('.modal-backdrop').addClass('game-bg-waring');
});

$('#btn_flappy_start').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Play MW17 Game");
    $('.ta').hide();
    $('.header').hide();
    $('#game').hide();
    $('#flappy_bg').show();
    $("<iframe />", { src: "game/flappy/index.html" }).appendTo("body");
    $('body').addClass('stopScroll');
});

$('#btn_flappy_continue').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Continue MW17 Game");
    $('.ta').hide();
    $('.header').hide();
    $('#game').hide();
    $('#flappy_bg').show();
    $("<iframe />", { src: "game/flappy/index.html" }).appendTo("body");
    $('body').addClass('stopScroll');
});

$('#btn_back3').click(function() {
    $('.ta').show();
    $('body').removeClass('stopScroll');
    $('.header').show();
    $('#modal_flappy_over').modal('hide').removeClass('topLayer');
});

$('#btn_flappy_back').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Don't Want to Play MW17 Game");    
    $('.ta').show();
    $('body').removeClass('stopScroll');
    $('.header').show();
    $('#flappy_bg').hide();
});

$('#btn_flappy_exit').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Exit MW17 Game");
    $('.ta').show();
    $('body').removeClass('stopScroll');
    $('.header').show();
    $('#flappy_bg').hide();
});





function closeIFrame() {
    $('.ta').show();
    $('#game_bg').hide();
    $('#modal_flappy_over').modal('show');
    // console.log(window.frames['flappy'].final_score);
    $('iframe').remove();
}


window.setInterval(function() {
    var $UFOnotice = $('.alien-notice');
    $UFOnotice.css('opacity', $UFOnotice.css('opacity') === '1' ? '0' : '1');
}, 1000);


// $window.scroll(function() {
//     if (timer) {
//         window.clearTimeout(timer);
//     }
//     timer = window.setTimeout(function() {
//         $menu.toggleClass('menu--scroll', $window.scrollTop() >= $menu_target.offset().top);
//         $buy_ticket_btn.toggleClass('active', $window.scrollTop() >= $buy_target.offset().top);
//     }, 200);
// });




// 2017.07.07 = 1499356800647
// var TimeDiff = (1499356800647 - +new Date());
// var is201707070000 = TimeDiff > 0 ? TimeDiff : 4;
// var openTicket = function openTicket() {
//     $('#ticket_earlyBird').html('<a href="#" class="btn ticket__button disabled">截止購票</a>');
//     $('#ticket_discount').html('<a href="https://ec.ithome.com.tw/modernweb2017/class?p=20170040" class="btn ticket__button">立即購票</a>');
//     $('#ticket_peers').html('<a href="http://s.itho.me/modernweb/2017/Modern_Web_2017_group_application_%20form.xlsx" class="btn ticket__button">立即購票</a>');
// }

// setTimeout(openTicket, TimeDiff);