$(function() {
    function handle() {
        $('.J-header,.nav').animate({ 'opacity': 1, 'filter': 'alpha(opacity=100)' }).show();
        var data = dataConfig; // dataconfig.js
        var html = template('tpl-list', data);
        $('#article-list').html(html);
    }
    preloadimages(['./img/top-bg.jpeg']).done(function() {
        handle();
        lazyload(function() {
            $('.J-footer').animate({ 'opacity': 1, 'filter': 'alpha(opacity=100)' }).show();
        }); // lazyload.js
    });
});