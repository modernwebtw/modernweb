// fb
window.fbAsyncInit = function () {
    FB.init({
        appId: '681372298729949'
    });
};

// google map

google.maps.event.addDomListener(window, 'load', init);

function init() {
    var mapOptions = {
        zoom: 17,
        scrollwheel: false,
        center: new google.maps.LatLng(25.020585, 121.542329)
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(25.020585, 121.542329),
        map: map,
        title: '臺灣大學社會科學院'
    });
}

// game
$('#alien').click(function () {
    $('#modal_game_start').on('shown.bs.modal', function () {
        $('.modal-backdrop').addClass('game-bg-waring');
    }).modal('show');
});

$('#btn_game_start, #btn_continue').click(function () {
    gameStart();
});

$('#btn_back, #btn_exit').click(function () {
    gamePause();
});

$('#btn_share_fb').click(function () {
    var score = $('#score').text();
    FB.ui({
        method: 'feed',
        link: location.href,
        picture: 'http://modernweb.tw/img/game_share.jpg',
        description: 'Modern Web 2017 ─ 8/10-11 登場',
        caption: '我在 Modern Web 2017 隱藏任務中，迎擊可愛又迷人的外星怪獸，獲得 ' + score + ' 分，一起來挑戰吧！'
    }, function (response) {});
});

var gameStart = function () {
    $('html, body').scrollTop(0);
    $('body').addClass('game_start');
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

var gamePause = function () {
    $('body').removeClass('game_start');
    Game.pause();
    toggleScroll(true);
}

var toggleScroll = function (boolean) {
    if (boolean) {
        $(window).off('scroll touchmove mousewheel');
    } else {
        $(window).on('scroll touchmove mousewheel', function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        })
    }
}

// scroll menu
var $window = $(window);
var $about = $('#about');
var $menu = $('#menu');
var $speaker = $('#speaker');
var $buy_ticket_btn = $('#buy_ticket');
var timer;
$window.scroll(function () {
    if (timer) {
        window.clearTimeout(timer);
    }
    timer = window.setTimeout(function () {
        $menu.toggleClass('menu--scroll', $window.scrollTop() >= $about.offset().top);
        $buy_ticket_btn.toggleClass('active', $window.scrollTop() >= $speaker.offset().top);
    }, 200);
});

// mobile
$(".menu__burger, .menu__mask").on('click', function () {
    $(this, '.menu__content', '.menu').toggleClass('on');
    $('body').toggleClass('is-hidden');
});

// scroll
$('#menu a[href^="#"]:not([href="#"]), #buy_ticket').click(function () {
    var target = '#' + $(this).attr('href').split('#')[1];
    goScroll(target);
    return false;
});

function goScroll(target) {
    var target_top = $(target).offset().top;
    var header_height = ($('html').width() <= 768) ? 0 : $('#menu').height();
    var sTop = target_top - header_height;

    $('html, body').stop().animate({
        scrollTop: sTop
    }, 1000);
}