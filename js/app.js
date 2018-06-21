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

// mobile
$(".menu__burger, .menu__mask").on('click', function() {
    $('.menu__burger').toggleClass("on");
    $('.menu__content').toggleClass('on');
    $('.menu').toggleClass('on');
    $('body').toggleClass('is-hidden');
});

// scroll
$('a[href^="#"]:not([href="#"]), #buy_ticket').click(function(e) {
    var target = '#' + $(this).attr('href').split('#')[1];
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

$('.rock').mouseenter(function() {
    $('.rock').css('cursor', 'pointer');
    $('.rock3').addClass('rock-rotate1');
    $('.rock2').addClass('rock-rotate2');
});

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
    $("<iframe />", { src: "game/flappy/index.html" }).appendTo("body").css({ 'height': '100%', 'width': '100%' });
    $('body').addClass('stopScroll');
});

// $('#btn_flappy_continue').click(function() {
//     // ga('send', 'event', 'CTA', 'click', "Continue MW17 Game");
//     $('.ta').hide();
//     $('.header').hide();
//     $('#game').hide();
//     $('#flappy_bg').show();
//     $("<iframe />", { src: "game/flappy/index.html" }).appendTo("body");
//     $('body').addClass('stopScroll');
// });

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
    closeIFrame();
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
    $('body').removeClass('stopScroll');
    $('.header').show();
    $('#flappy_bg').hide();
    // console.log(window.frames['flappy'].final_score);
    $('iframe').remove();
}


window.setInterval(function() {
    var $UFOnotice = $('.alien-notice');
    $UFOnotice.css('opacity', $UFOnotice.css('opacity') === '1' ? '0' : '1');
}, 1000);


$(document).ready(function() {
    $("#loading").hide();
});

var modernwebDesc = 'Modern Web 2018 ─ 技術在我們手上，世界就在我們手上';
var modernwebUrl = location.href;

$('#btn_share_fb').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Share MW17 Game");
    var score = $('#score').text();
    FB.init({
        appId: '1615126938703368',
        status: true,
        xfbml: true,
        version: 'v3.0' // or v2.6, v2.5, v2.4, v2.3
    });

    // var FBTitle = 'tile';
    var modernwebPic = 'https://modernweb.tw/img/FBU.jpg';

    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        link: modernwebUrl,
        action_properties: JSON.stringify({
            object: {
                'og:title': '我在 Modern Web 2018 隱藏任務中，迎擊可愛又迷人的外星怪獸，獲得 ' + score + ' 分，一起來挑戰吧！',
                'og:description': modernwebDesc,
                'og:image': modernwebPic
            }
        })
    }, function(response) {});
});

$('#btn_flappy_share_fb').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Share MW17 Game");
    var score = $('#flappy_score').text();
    FB.init({
        // appId: '1293787864089459', //test FBid
        appId: '1615126938703368',
        status: true,
        xfbml: true,
        version: 'v3.0' // or v2.6, v2.5, v2.4, v2.3
    });
    var modernwebPic = 'https://modernweb.tw/img/FBP.jpg';

    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        link: modernwebUrl,
        action_properties: JSON.stringify({
            object: {
                'og:title': '我在 Modern Web 2018 隱藏任務中，越過牛牛大軍與牠的快樂伙伴，獲得 ' + score + ' 分，一起來挑戰吧！',
                'og:description': modernwebDesc,
                'og:image': modernwebPic
            }
        })
    }, function(response) {});
});



$('#btn_sinuous_share_fb').click(function() {
    // ga('send', 'event', 'CTA', 'click', "Share MW17 Game");
    event.preventDefault();
    event.stopImmediatePropagation();
    var score = $('#sinuous_score').text();
    FB.init({
        appId: '1615126938703368',
        status: true,
        xfbml: true,
        version: 'v3.0' // or v2.6, v2.5, v2.4, v2.3
    });
    var modernwebPic = 'https://modernweb.tw/img/FBR.jpg';

    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        link: modernwebUrl,
        action_properties: JSON.stringify({
            object: {
                'og:title': '我在 Modern Web 2018 隱藏任務中，閃避迎面而來的無數殞石，獲得 ' + score + ' 分，一起來挑戰吧！',
                'og:description': modernwebDesc,
                'og:image': modernwebPic
            }
        })
    }, function(response) {});
});