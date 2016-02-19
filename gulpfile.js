'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var uglifyify = require('uglifyify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');

var dependencies = [
    'react',
    'react-dom',
    'formsy-react',
    'formsy-react-components'
];

var production = process.env.NODE_ENV === 'production';

var browserifyTask = function(options) {

    var b = browserify({
        entries: options.src,
        transform: [babelify],
        debug: options.development,
        cache: {},
        packageCache: {}
    });
    b.external(dependencies);

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
        debug: !production,
        transform: [babelify],
        require: dependencies
    });
    if (production) {
        bundler.transform({
            global: true
        }, uglifyify);
    }
    bundler
        .bundle()
        .pipe(source('vendor-bundle.js'))
        .pipe(gulp.dest('playground'));
});

gulp.task('playground', function() {
    browserifyTask({
        development: !production,
        bundle: 'app-bundle.js',
        src: './playground/app.js',
        dest: './playground'
    });
});

gulp.task('default', ['vendor', 'playground']);
