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