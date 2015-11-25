// module dependencies

var inject = require('gulp-js-text-inject');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var gulp = require('gulp');

// config

var config = {
  watch: './build/**/*',
  theme: './build/themes/doodle/',
  js: {
    src: ['./build/script-tag-data/script-tag-data.min.js', './build/repo-card.js'],
    rename: 'repo-card.min.js',
    dest: './dist/'
  },
};


// minify and write contents to `.min.js` file

gulp.task('scripts', function() {
  gulp.src(config.js.src)
    .pipe(inject({
      basepath: config.theme
    }))
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat(config.js.rename))
    .pipe(gulp.dest(config.js.dest));
});

// watch the js file for changes

gulp.task('watch', function() {
  gulp.watch(config.watch, ['build']);
});

// command line task commands

gulp.task('build', ['scripts']);
gulp.task('default', ['build', 'watch']);
