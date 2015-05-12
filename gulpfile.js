'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var uglifyify = require('uglifyify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');

var dependencies = [
    'react',
    'react-tools',
    'formsy-react',
    'codemirror',
    'codemirror/mode/xml/xml',
    'js-beautify'
];

var browserifyTask = function(options) {

    var b = browserify({
        entries: options.src,
        transform: [reactify],
        debug: options.development,
        cache: {},
        packageCache: {}
    });
    b.external(options.development ? dependencies : []);

    var rebundle = function() {

        var start = Date.now();
        gutil.log('Building APP bundle');
        return b.bundle()
            .on('error', gutil.log)
            .pipe(source(options.bundle))
            .pipe(gulp.dest(options.dest))
            .pipe(notify(function () {
                gutil.log('APP bundle built in ' + (Date.now() - start) + 'ms');
            }));
    };

    rebundle();

    if (options.development) {
        b = watchify(b);
        b.on('update', rebundle);
    }
};

gulp.task('vendor', function() {
    var bundler = browserify({
        debug: false,
        require: dependencies
    });
    bundler.transform({
        global: true
    }, uglifyify);
    bundler
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('vendor'));
});

gulp.task('playground', ['vendor'], function() {
    browserifyTask({
        development: true,
        bundle: 'bundle.js',
        src: './playground/app.js',
        dest: './playground'
    });
});

gulp.task('docs', ['vendor'], function() {
    browserifyTask({
        development: true,
        bundle: 'bundle.js',
        src: './examples/app.js',
        dest: './examples'
    });
});
