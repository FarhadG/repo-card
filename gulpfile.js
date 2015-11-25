// module dependencies

var inject = require('gulp-js-text-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var gulp = require('gulp');

// config

var config = {
  watch: './build/**/*',
  themes: './build/themes/',
  lib: {
    src: ['./build/script-tag-data/script-tag-data.min.js', './build/repo-card.js'],
    rename: 'repo-card.min.js',
    dest: './'
  },
};

// minify and write contents to `.min.js` file

gulp.task('scripts', function() {
  gulp.src(config.lib.src)
    .pipe(inject({
      basepath: config.themes
    }))
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat(config.lib.rename))
    .pipe(gulp.dest(config.lib.dest));
});

// watch the js file for changes

gulp.task('watch', function() {
  gulp.watch(config.watch, ['build']);
});

// command line task commands

gulp.task('build', ['scripts']);
gulp.task('default', ['build', 'watch']);
