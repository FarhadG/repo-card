// module dependencies

var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var gulp = require('gulp');

// config

var config = {
  js: {
    src: './repo-card.js',
    min: 'repo-card.min.js',
    dest: './dist/'
  },
  css: {
    src: './style.css',
    dest: './dist/'
  }
};

// compile css

gulp.task('styles', function() {
  return gulp.src(config.css.src)
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.css.dest));
});

// minify and write contents to `.min.js` file

gulp.task('scripts', function() {
  gulp.src(config.js.src)
    .pipe(jshint())
    .pipe(uglify())
    .pipe(rename(config.js.min))
    .pipe(gulp.dest(config.js.dest));
});

// watch the js file for changes

gulp.task('watch', function() {
  gulp.watch(config.src, ['build']);
});

// command line task commands

gulp.task('build', ['styles', 'scripts']);
gulp.task('default', ['build', 'watch']);
