var plugins     = require('gulp-load-plugins');
var yargs       = require('yargs');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var rimraf      = require('rimraf');
var uglify      = require('gulp-uglify-cli');
var neat        = require('node-neat').includePaths;
var bourbon     = require('node-bourbon').includePaths;
var normalize   = require('node-normalize-scss').includePaths;
var svgInject   = require('gulp-svg-inject');
var svgmin      = require('gulp-svgmin');
var runSequence = require('run-sequence');
var _           = require('lodash');

// Load all Gulp plugins into one variable
var $ = plugins();

var PRODUCTION = !!(yargs.argv.production);

gulp.task('build', function() {
  runSequence('clean', 'images', ['sass', 'js', 'fonts', 'vendorCopy'], 'html', 'server')
});

gulp.task('server', function() {
  browserSync.init({
    server: './dist', port: 8080
  });

  gulp.watch("src/styles/**/*", ['sass']);
  gulp.watch("src/js/*.js", ['js']);
  gulp.watch("src/images/**/*", ['images']);
  gulp.watch("src/*.html", ['html']);
  gulp.watch("src/fonts/**", ['fonts']);
});

// Delete the contents of the 'dist' folder
gulp.task('clean', function(done) {
  rimraf('./dist', done);
});

// Compile scss and copy to dist
gulp.task('sass', function() {
  return gulp.src("src/styles/*.scss")
    .pipe($.sourcemaps.init())
    .pipe(sass({
      includePaths: ['sass'].concat(neat, bourbon, normalize)
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest("dist/styles/"))
    .pipe(browserSync.stream());
});

// Copy images to dist folder and minify if production
gulp.task('images', function() {
  return gulp.src('src/images/**/*.*')
  .pipe(svgmin())
  .pipe(gulp.dest('dist/images/'));
})

// Copy HTML file to dist folder
gulp.task('html', function() {
  return gulp.src('src/index.html')
  .pipe(svgInject())
  .pipe(gulp.dest('dist'));
});

// Copy js to dist and minify if production
gulp.task('js', function() {
  return gulp.src('src/js/*')
  .pipe($.if(PRODUCTION, uglify()
    .on('error', function(e) {console.log(e);})
  ))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('vendorCopy', function() {
  var assets = {
    js: [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/dragula/dist/dragula.min.js'
    ],
    styles: ['./node_modules/dragula/dist/dragula.min.css']
  };

  _(assets).forEach(function (assets, type) {
    gulp.src(assets).pipe(gulp.dest('./dist/' + type + '/lib/'));
  });
});

// Copy fonts to dist folder
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/')
  .pipe(gulp.dest('dist/fonts/'));
});
