function preloadimages(arr) {
    var newimages = [],
        loadedimages = 0
    var postaction = function() {} //此处增加了一个postaction函数
    var arr = (typeof arr != "object") ? [arr] : arr

    function imageloadpost() {
        loadedimages++
        if (loadedimages == arr.length) {
            postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
        }
    }
    for (var i = 0; i < arr.length; i++) {
        newimages[i] = new Image()
        newimages[i].src = arr[i]
        newimages[i].onload = function() {
            imageloadpost()
        }
        newimages[i].onerror = function() {
            imageloadpost()
        }
    }
    return { //此处返回一个空白对象的done方法
        done: function(f) {
            postaction = f || postaction
        }
    }
}
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
/* lazyload.js (c) Lorenzo Giuliani
 * MIT License (http://www.opensource.org/licenses/mit-license.html)
 *
 * expects a list of:
 * `<img src="blank.gif" data-src="my_image.png" width="600" height="400" class="lazy">`
 */

! function(window) {
    var $q = function(q, res) {
            if (document.querySelectorAll) {
                res = document.querySelectorAll(q);
            } else {
                var d = document,
                    a = d.styleSheets[0] || d.createStyleSheet();
                a.addRule(q, 'f:b');
                for (var l = d.all, b = 0, c = [], f = l.length; b < f; b++)
                    l[b].currentStyle.f && c.push(l[b]);

                a.removeRule(0);
                res = c;
            }
            return res;
        },
        addEventListener = function(evt, fn) {
            window.addEventListener ?
                this.addEventListener(evt, fn, false) :
                (window.attachEvent) ?
                this.attachEvent('on' + evt, fn) :
                this['on' + evt] = fn;
        },
        _has = function(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        };

    function loadImage(el, fn) {
        var src = el.getAttribute('data-src');
        if (src) {
            var img = new Image();
            img.onload = function() {
                el.src = src;
                el.removeAttribute('data-src');
                el.style.width = '100%';
                fn ? fn() : null;
            }
            img.src = src;
        }
    }

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect()

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        )
    }

    var images = new Array(),
        query = $q('img.lazy'),
        processScroll = function() {
            for (var i = 0; i < images.length; i++) {
                if (!!images[i] && elementInViewport(images[i])) {
                    (function() {
                        loadImage(images[i], function() {
                            images[i] = null;
                        });
                    })(i);

                }
            };
        };
    // Array.prototype.slice.call is not callable under our lovely IE8
    for (var i = 0; i < query.length; i++) {
        images.push(query[i]);
    };

    processScroll();
    addEventListener('scroll', processScroll);

}(this);