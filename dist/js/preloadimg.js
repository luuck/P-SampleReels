function preloadimages(n){var o=[],e=0,t=function(){};n="object"!=typeof n?[n]:n;function r(){++e==n.length&&t(o)}for(var c=0;c<n.length;c++)o[c]=new Image,o[c].src=n[c],o[c].onload=function(){r()},o[c].onerror=function(){r()};return{done:function(n){t=n||t}}}