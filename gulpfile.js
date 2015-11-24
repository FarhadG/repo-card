// module dependencies
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var gulp = require('gulp');

// config
var config = {
  js: {
    min: './repo-card.min.js',
    src: './repo-card.js',
    dest: './'
  }
};

// minify and write contents to `.min.js` file
gulp.task('scripts', function() {
  gulp.src(config.src)
      .pipe(jshint())
      .pipe(uglify())
      .pipe(rename(config.min))
      .pipe(gulp.dest(config.dest));
});

// watch the js file for changes
gulp.task('watch', function() {
  gulp.watch(config.src, ['build']);
});

// command line task commands
gulp.task('build', ['scripts']);
gulp.task('default', ['build', 'watch']);
