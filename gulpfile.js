var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var notify = require("gulp-notify");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var del = require('delete');
var htmlreplace = require('gulp-html-replace');
var fs = require('fs');
var iife = require("gulp-iife");

gulp.task('clean', function () {
    del('./dist/*');
});

gulp.task('normalize', function () {
    gulp.src('./bower_components/normalize-scss/sass/_normalize.scss')
        .pipe(gulp.dest('./sass/vendors/'));
    gulp.src('./bower_components/normalize-scss/sass/normalize/*.scss')
        .pipe(gulp.dest('./sass/vendors/normalize'));
});

gulp.task('inject-js-and-css', ['uglify', 'sass-prod'], function () {
    return gulp.src('./index.html')
        .pipe(htmlreplace({
            'js': '<script>' + fs.readFileSync('./dist/js/bethel.js', 'utf8') + '</script>',
            'css': '<style>' + fs.readFileSync('./dist/css/bethel.css', 'utf-8') + '</style>'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html-minify', ['inject-js-and-css'], function () {
    return gulp.src('./dist/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./dist/Html'));
});

gulp.task('gzip', ['html-minify'], function () {
    gulp.src(['./fonts/*', './dist/Html/*', './images/**/*'])
        .pipe(gzip({
            append: false
        }))
        .pipe(gulp.dest('./dist/gzip/'));
});

gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .on('error', function (err) {
            notify().write(err);
            this.emit('end');
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

gulp.task('sass-prod', ['clean'], function () {
    return gulp.src('./sass/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('jsconcat', function () {
    return gulp.src(['./js/partials/helpers/animate.js',
        './js/partials/helpers/loadYoutubeAsync.js',
        './js/partials/helpers/findClosest.js',
        './js/partials/mobileMenu.js',
        './js/partials/popups.js',
        './js/partials/ascendingNumbers.js',
        './js/partials/init.js',
        './js/vendors/jump.js'
        ])
        .pipe(sourcemaps.init())
        .on('error', function (err) {
            notify().write(err);
            this.emit('end');
        })
        .pipe(concat('./bethel.js'))
        .pipe(iife({
            useStrict: true,
            trimCode: true,
            prependSemicolon: false,
            bindThis: false,
            params: ['bethel','window', 'document', 'undefined'],
            args: ['window.bethel = window.bethel || {}', 'window', 'document']
        }))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());
});


gulp.task('js-prod', ['clean'], function () {
    return gulp.src('./js/partials/*.js')
        .pipe(concat('./bethel.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('uglify', ['js-prod'], function () {
    return gulp.src('./dist/js/bethel.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['sass', 'jsconcat'], function () {
    browserSync.init({
        server: {
            baseDir: './',
            port: 3000
        }
    });
    gulp.watch('./sass/**/*.scss', ['sass'], browserSync.reload());
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js', ['jsconcat'], browserSync.reload());
    gulp.watch('gulpfile.js', ['sass', 'jsconcat'], browserSync.reload());
});

gulp.task('prod', ['sass-prod', 'js-prod', 'uglify', 'inject-js-and-css', 'gzip']);