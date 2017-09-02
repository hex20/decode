var plugins     = require('gulp-load-plugins');
var yargs       = require('yargs');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Load all Gulp plugins into one variable
var $ = plugins();

var PRODUCTION = !!(yargs.argv.production);

gulp.task('default', ['browser-sync', 'sass']);

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });
});

gulp.task('sass', function() {
  return gulp.src("styles/scss/*.scss")
    .pipe($.sourcemaps.init())
    .pipe(sass())
    .pipe($.autoprefixer({browsers: COMPATIBILITY}))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest("styles/"))
    .pipe(browserSync.stream());
});