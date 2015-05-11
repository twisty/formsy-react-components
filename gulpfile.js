'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');

var dependencies = ['react', 'react-tools', 'formsy-react'];

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
        var vendorsBundler = browserify({
            debug: true,
            require: dependencies
        });
        vendorsBundler.bundle()
            .pipe(source('dev.vendors.js'))
            .pipe(gulp.dest(options.dest));
    }
};

gulp.task('production', function() {
    browserifyTask({
        development: false,
        bundle: 'bundle.js',
        src: './examples/app.js',
        dest: './examples'
    });
});

gulp.task('playground', function() {
    browserifyTask({
        development: true,
        bundle: 'dev.playground.js',
        src: './examples/playground.js',
        dest: './examples'
    });
});

gulp.task('docs', function() {
    browserifyTask({
        development: true,
        bundle: 'dev.docs.js',
        src: './examples/docs.js',
        dest: './examples'
    });
});
