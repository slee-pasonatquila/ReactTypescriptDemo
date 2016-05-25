var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sass = require('gulp-sass');
var del = require('del');
var gulpWebpack = require('gulp-webpack'),
    webpack = require('webpack');
var jade = require('gulp-jade');
var runSequence = require('run-sequence');
var mocha = require('gulp-mocha');

gulp.task('clean', function() {
    del(['dist']);
    del(['build']);
});

gulp.task('cleanTemp', function() {
	del(['build']);
});

gulp.task('copy', function() {
    gulp.src(
		[
			'src/thirdparty/**/*',
			'public/thirdparty/jquery/dist/jquery.min.js',
			'public/thirdparty//lodash/dist/lodash.min.js',
			'public/thirdparty/moment/min/moment-with-locales.min.js'
		]
	).pipe(gulp.dest('dist/thirdparty/'));
	gulp.src(
		[
			'public/thirdparty/font-awesome/css/font-awesome.min.css'
		]
	).pipe(gulp.dest('dist/thirdparty/font-awesome'));
	gulp.src(
		[
			'public/thirdparty/font-awesome/fonts/**/*'
		]
	).pipe(gulp.dest('dist/thirdparty/font-awesome/fonts'));
	gulp.src(
		[
			'public/thirdparty/Materialize/dist/**/*'
		]
	).pipe(gulp.dest('dist/thirdparty/Materialize'));
});
gulp.task("tslint", function() {
    gulp.src([
        'src/**/*.{ts,tsx}'
    ])
    .pipe(tslint({
        configuration: "tslint.json"
    }))
});
gulp.task('test', function() {
    return gulp.src('./build/test/**/*.@(js|jsx)')
        .pipe(mocha({
			require: './build/test/setup.js'
		}))
        .once('error', function() {
            process.exit(1);
        })
});
gulp.task('ts', function() {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = gulp.src([
                        'src/**/*.{ts,tsx}'
                   ])
                   .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('bundle', function() {
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
            plugins: [
                new webpack.optimize.DedupePlugin(),
				new webpack.optimize.AggressiveMergingPlugin(),
				new webpack.ProvidePlugin({
					$: 'jquery',
					_: 'lodash',
					React: 'react',
					ReactDOM: 'react-dom'
				}),
				new webpack.optimize.UglifyJsPlugin({
					drop_debugger: true,
					dead_code: true,
					booleans: true,
					unused: true,
					warnings: false,
					drop_console: false
				})
            ],
            module: {
				loaders: [
					{
						test: /\.js[x]?$/,
						exclude: /node_modules/,
						loader: 'babel',
						query: {
							presets: ['react', 'es2015']
						}
					}
				]
			}
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
    gulp.watch(['public/thirdpartys/**/*', '!src/ts/*', '!src/css/*', '!src/jade/*', '!src/css','!src/ts', '!src/jade'], ['copy']);
    gulp.watch('src/**/*.{ts,tsx}', ['bundle']);
    gulp.watch('src/css/*.scss', ['scss']);
	gulp.watch(['./src/**/*.jade','!src/**/_*.jade'], ['jade']);
});

gulp.task('default', function() {
    return runSequence('tslint', 'ts', 'test', 'bundle', 'scss', 'jade', 'copy');
});
