$('#btn_share_fb').click(function() {
    ga('send', 'event', 'CTA', 'click', "Share MW17 Game");
    var finalScore = $('#title').text().replace(/\D/g, '');
    FB.init({
        appId: '1615126938703368'
    });
    FB.ui({
        method: 'feed',
        link: location.href,
        title: '我在 Modern Web 2018 隱藏任務中，駕駛太空船閃避太空殞石，獲得 ' + finalScore + ' 分，一起來挑戰吧！',
        picture: 'http://modernweb.tw/img/game_share.jpg',
        description: 'Modern Web 2018 ─ 技術在我們手上，世界就在我們手上',
        caption: 'Modern Web 2018 ─ 7/18-19 登場'
    }, function(response) {});
});