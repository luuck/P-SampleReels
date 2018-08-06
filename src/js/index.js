$(function() {

    function handle() {
        $('.J-header').animate({ 'opacity': 1, 'filter': 'alpha(opacity=100)' }).show();

        var data = {
            list: [{
                title: '公共接口快速生成文档',
                gitHubUrl: 'https://github.com/luuck/P-FastCreateInterfaceDoc',
                linkUrl: 'https://luuck.github.io/P-FastCreateInterfaceDoc/dist/view/index.html#/',
                imgUrl: 'https://luuck.github.io/P-FastCreateInterfaceDoc/doc/pic/intro.png',
                desc: '这是一款通内置公共接口，快速生成Markdown语法的工具。'
            }]
        };
        var html = template('tpl-list', data);
        document.getElementById('article-list').innerHTML = html;
    }

    preloadimages(['https://luuck.github.io/P-SampleReels/dist/img/top-bg.jpeg']).done(function() {
        handle();
    });

});