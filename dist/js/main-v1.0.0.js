var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var scss = require('gulp-sass')
var cssnano = require('gulp-cssnao');
var imagemin = require('gulp-imagemin');

gulp.task('image', function() {
    gulp.src('img/*.{jpg,png,gif}')
        .pipe(caches(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});

// 使用sass预编译的css
gulp.task('scss', function() {
    gulp.src('*.scss')
        .pipe(scss())
        .pipe(gulp.dest('dist'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('html', function() {
    gulp.src('*.html').pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    })).pipe(gulp.dest('dist'));
});

gulp.src().pipe().pipe(gulp.dest(''));

gulp.task('default', function() {
    console.log('gulp启动成功');
});;
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