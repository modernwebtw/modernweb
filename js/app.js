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
$('#modal_game_start').on('shown.bs.modal', function() {
    ga('send', 'event', 'CTA', 'click', "Enter MW17 Game");
    $('.modal-backdrop').addClass('game-bg-waring');
});

$('#alien').click(function() {
    $('#modal_game_start').modal('show');
});

$('#btn_game_start').click(function() {
    ga('send', 'event', 'CTA', 'click', "Play MW17 Game");
    gameStart();
});

$('#btn_continue').click(function() {
    ga('send', 'event', 'CTA', 'click', "Continue MW17 Game");
    gameStart();
});

// 返回基地
$('#btn_back').click(function() {
    gamePause();
});

// 先閃避
$('#btn_game_back').click(function() {
    ga('send', 'event', 'CTA', 'click', "Don't Want to Play MW17 Game");
    gamePause();
});

$('#btn_exit').click(function() {
    ga('send', 'event', 'CTA', 'click', "Exit MW17 Game");
    gamePause();
});

$('#btn_share_fb').click(function() {
    ga('send', 'event', 'CTA', 'click', "Share MW17 Game");
    var score = $('#score').text();
    FB.init({
        appId: '1615126938703368'
    });
    FB.ui({
        method: 'feed',
        link: location.href,
        title: '我在 Modern Web 2017 隱藏任務中，迎擊可愛又迷人的外星怪獸，獲得 ' + score + ' 分，一起來挑戰吧！',
        picture: 'http://modernweb.tw/img/game_share.jpg',
        description: 'Modern Web 2017 ─ 技術在我們手上，世界就在我們手上',
        caption: 'Modern Web 2017 ─ 8/10-11 登場'
    }, function(response) {});
});

var gameStart = function() {
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

var gamePause = function() {
    $('body').removeClass('game_start');
    Game.pause();
    toggleScroll(true);
}

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

// scroll menu
var $window = $(window);
var $menu = $('#menu');
var checkHasElm = function(arrID) {
    var $detect;
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
        '#about',
        '#agenda',
        '#jobs'
    ]);
}());
var $buy_target = (function() {
    return checkHasElm([
        '#speaker',
        '#agenda',
        '#jobs'
    ]);
}());
var $buy_ticket_btn = $('#buy_ticket');
var timer;
$window.scroll(function() {
    if (timer) {
        window.clearTimeout(timer);
    }
    timer = window.setTimeout(function() {
        $menu.toggleClass('menu--scroll', $window.scrollTop() >= $menu_target.offset().top);
        $buy_ticket_btn.toggleClass('active', $window.scrollTop() >= $buy_target.offset().top);
    }, 200);
});

// mobile
$(".menu__burger, .menu__mask").on('click', function() {
    $('.menu__burger').toggleClass("on");
    $('.menu__content').toggleClass('on');
    $('.menu').toggleClass('on');
    $('body').toggleClass('is-hidden');
});

// scroll
$('#menu a[href^="#"]:not([href="#"]), #buy_ticket').click(function() {
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
    }, 500);
}


location.hash && goScroll(location.hash);

// 2017.07.07 = 1499356800647
var TimeDiff = (1499356800647 - +new Date());
var is201707070000 = TimeDiff > 0 ? TimeDiff : 4;
var openTicket = function openTicket() {
    $('#ticket_earlyBird').html('<a href="#" class="btn ticket__button disabled">截止購票</a>');
    $('#ticket_discount').html('<a href="https://ec.ithome.com.tw/modernweb2017/class?p=20170040" class="btn ticket__button">立即購票</a>');
    $('#ticket_peers').html('<a href="http://s.itho.me/modernweb/2017/Modern_Web_2017_group_application_%20form.xlsx" class="btn ticket__button">立即購票</a>');
}

setTimeout(openTicket, TimeDiff);