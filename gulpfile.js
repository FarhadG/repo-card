// module dependencies

var webpackStream = require('webpack-stream');
var inject = require('gulp-js-text-inject');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var gulp = require('gulp');

// config

var config = {
  watch: './build/**/*',
  themes: './build/themes/',
  lib: {
    src: [
      './lib/script-tag-data/script-tag-data.js',
      './build/repo-card.js'
    ],
    rename: 'repo-card.js',
    minify: 'repo-card.min.js',
    dest: './'
  },
  webpack: {
    output: {
      libraryTarget: 'umd',
      library: 'RepoCard'
    }
  }
};

// minify and write contents

gulp.task('scripts', function() {
  gulp.src(config.lib.src)
    .pipe(webpackStream(config.webpack))
    .pipe(inject({
      basepath: config.themes
    }))
    .pipe(jshint())
    .pipe(concat(config.lib.rename))
    .pipe(gulp.dest(config.lib.dest))
    .pipe(uglify())
    .pipe(rename(config.lib.minify))
    .pipe(gulp.dest(config.lib.dest));
});

// watch the js file for changes

gulp.task('watch', function() {
  gulp.watch(config.watch, ['build']);
});

// command line task commands

gulp.task('build', ['scripts']);
gulp.task('default', ['build', 'watch']);
