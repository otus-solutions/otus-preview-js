(function() {

    var baseDir = __dirname + '/app/index.html';

    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var bump = require('gulp-bump');
    var concat = require('gulp-concat');
    var sonar = require('gulp-sonar');
    var packageJson = require('./package.json');
    var browserSyncSpa = require('browser-sync-middleware-spa');
    var useref = require('gulp-useref');
    var gulpif = require('gulp-if');
    var uglify = require("gulp-uglify");
    var minify = require('gulp-minify');
    var minifyCss = require('gulp-minify-css');
    var addsrc = require('gulp-add-src');
    var embedTemplates = require('gulp-angular-embed-templates');

    gulp.task('useref', function() {
        return gulp.src('app/index.html')
            .pipe(useref({
                transformPath: function(filePath) {
                    return filePath.replace('app', '');
                }
            }))
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulp.dest('dist/otus-preview-js'));
    });

    gulp.task('template', function() {
        gulp.src('app/components/**/*.js')
            .pipe(embedTemplates({
                basePath: __dirname + '/'
            }))
            .pipe(addsrc('app/service/**/*.js'))
            .pipe(concat('otus-preview-min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/template'));
    });

    /* Task registry */
    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: '../',
                middleware: [
                    browserSyncSpa(/^[^\.]+$/, baseDir),

                    function(req, res, next) {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Access-Control-Allow-Headers', '*');
                        next();
                    }
                ]
            },
            startPath: 'otus-preview-js/index'
        });

        gulp.watch([
            'app/**/*.html',
            'app/**/*.js',
            'app/**/*.css'
        ]).on('change', browserSync.reload);
    });

    gulp.task('upgrade-version', function(value) {
        gulp.src('./package.json')
            .pipe(bump({
                version: process.env.npm_config_value
            }))
            .pipe(gulp.dest('./'));
    });

    gulp.task('compress', function() {
        gulp.src(['app/**/*-module.js', 'app/**/*.js'])
            .pipe(concat('otus-preview.js'))
            .pipe(minify({
                'mangle': false
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('sonar', function() {
        var options = {
            sonar: {
                host: {
                    url: process.env.npm_config_sonarUrl,
                },
                jdbc: {
                    url: process.env.npm_config_sonarDatabaseUrl,
                    username: process.env.npm_config_sonarDatabaseUsername,
                    password: process.env.npm_config_sonarDatabasePassword
                },
                projectKey: 'sonar:otus-preview-js',
                projectName: 'otus-preview-js',
                projectVersion: packageJson.version,
                // comma-delimited string of source directories
                sources: 'app',
                language: 'js',
                sourceEncoding: 'UTF-8',
                exec: {
                    maxBuffer: 1024 * 1024
                }
            }
        };

        return gulp.src('thisFileDoesNotExist.js', {
                read: false
            })
            .pipe(sonar(options));
    });


}());
