var gulp = require("gulp");
var htmlmin = require('gulp-htmlmin');
var scss = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');

// <!-- build:<type> <path> -->
// <!-- endbuild -->

//////////////////////////////////
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('scss', function() {
    gulp.src('src/scss/**/!(_)*.scss') // 排除以_开头的文件
        .pipe(scss().on('error', scss.logError))
        // .pipe(gulp.dest("dist"))
        .pipe(cssnano())
        .pipe(gulp.dest('src/css'))
        .pipe(reload({
            stream: true
        }))
});

gulp.task('images', function() {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});

// Copying fonts 
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('js', function() {
    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});
//////////////////////////////////

gulp.task('browserSync', function() {
    browserSync.init({
        // proxy: "你的域名或IP"
        server: {
            baseDir: "./src"
        }
    });
});

gulp.task('useref', function() {
    return gulp.src('src/*.html')
        .pipe(gulpIf('*.css', minifyCSS()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    del('dist');
});

// gulp.task('clean', function(callback) {
//     del('dist');
//     return cache.clearAll(callback);
// })

// 不像图片被删除
gulp.task('clean:dist', function(callback) {
    del(['dist/**/*', '!dist/img', '!dist/img/**/*'], callback)
});

// 监听scss、js、image、html
gulp.task('watch', ['browserSync', 'scss', 'js', 'html', 'images'], function() {
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/js/**/*.js', ['js'], reload);
    gulp.watch('src/img/**/*', ['images'], reload);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

// 开发任务
gulp.task('default', function(callback) {
    runSequence('clean', ['scss', 'browserSync'], 'watch',
        callback
    )
});

// 发布
gulp.task('build', ['clean', 'scss', 'useref', 'images', 'fonts'], function() {
    console.log('Building files');
});

// 是否开启雪碧图合并