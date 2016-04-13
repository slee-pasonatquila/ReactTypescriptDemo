var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sass = require('gulp-sass');
var del = require('del');
var gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack');
var jade = require('gulp-jade');

gulp.task('clean', function() {
    del(['dist']);
    del(['build']);
});

gulp.task('cleanTemp', function() {
	del(['build']);
});

gulp.task('copy', function() {
    gulp.src(
        [ 'src/thirdparty/**/*','!src/css/*','!src/ts/*', '!src/jade/*', '!src/css','!src/ts', '!src/jade' ],
        { base: 'src' }
    ).pipe(gulp.dest('dist'));
});
gulp.task("tslint", function() {
    gulp.src([
        'src/**/*.{ts,tsx}'
    ])
    .pipe(tslint({
        configuration: "tslint.json"
    }))
});
gulp.task('ts', ['tslint'], function() {
    return gulp.src(['src/**/*.{ts,tsx}'])
        .pipe(ts({
            target: "ES5",
            jsx: "react",
            module: "commonjs"
        }))
        .js
        .pipe(gulp.dest('build'));
});

gulp.task('bundle', ['ts'], function() {
    gulp.src('./build/js/**/*.js')
        .pipe(gulpWebpack({
            entry: ['./build/js/index.js'],
            output: {
                filename: 'bundle.js',
                library: 'index'
            },
            devtool: 'source-map',
            resolve: {
                extensions: ['', '.js']
            },
            plugins: [new webpack.optimize.UglifyJsPlugin()]
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scss', function() {
    gulp.src(['src/css/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('jade', function () {
  gulp.src(['./src/**/*.jade','!src/**/_*.jade'])
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', function() {
    gulp.watch(['src/thirdparty/**/*', '!src/ts/*', '!src/css/*', '!src/jade/*', '!src/css','!src/ts', '!src/jade'], ['copy']);
    gulp.watch('src/**/*.{ts,tsx}', ['bundle']);
    gulp.watch('src/css/*.scss', ['scss']);
	gulp.watch(['./src/**/*.jade','!src/**/_*.jade'], ['jade']);
});

gulp.task('default', ['copy', 'scss', 'jade', 'bundle']);
