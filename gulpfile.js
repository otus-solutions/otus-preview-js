(function() {

    var baseDir = __dirname + '/app/index.html';

    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var browserSyncSpa = require('browser-sync-middleware-spa');
    var sonar = require('gulp-sonar');
    var bump = require('gulp-bump');
    var packageJson = require('./package.json');
    var useref = require('gulp-useref');
    var gulpif = require('gulp-if');
    var uglify = require("gulp-uglify");
    var minifyCss = require('gulp-minify-css');
    var embedTemplates = require('gulp-angular-embed-templates');

    gulp.task('compress', function() {
        return gulp.src('app/index.html')
            .pipe(useref({
                transformPath: function(filePath) {
                    return filePath.replace('app', '');
                }
            }))
            .pipe(gulpif('*.js', embedTemplates({
                basePath: __dirname + '/'
            })))
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', minifyCss()))
            .pipe(gulp.dest('dist/otus-preview-js'));
    });

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
                },
                javascript: {
                    lcov: {
                        reportPath: 'target/test-coverage/report-lcov/lcov.info'
                    }
                }
            }
        };

        return gulp.src('thisFileDoesNotExist.js', {
                read: false
            })
            .pipe(sonar(options));
    });


}());
