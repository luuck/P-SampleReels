function lazyload(fn) {
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
            query = $q('img.lazy')
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
            if (typeof fn === "function") {
                fn();
            }
        };
        // Array.prototype.slice.call is not callable under our lovely IE8
        for (var i = 0; i < query.length; i++) {
            images.push(query[i]);
        };

        processScroll();
        addEventListener('scroll', processScroll);

    }(this);
}