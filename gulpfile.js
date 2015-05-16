'use strict';

var gulp = require('gulp');
var react = require('gulp-react');

var files = {
    src: './src/**/*.js'
};

gulp.task('watch', ['release'], function() {
    gulp.watch(files.src, ['release']);
});

gulp.task('release', function() {
    return gulp.src(files.src)
        .pipe(react())
        .pipe(gulp.dest('./release'));
});

gulp.task('default', ['release']);
