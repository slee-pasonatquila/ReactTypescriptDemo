require('babel-core/register');
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var gulpWebpack = require('gulp-webpack'),
	webpack = require('webpack');
var pug = require('gulp-pug');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');

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
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/lodash/dist/lodash.min.js',
			'bower_components/moment/min/moment-with-locales.min.js'
		]
	).pipe(gulp.dest('dist/thirdparty/'));
	gulp.src(
		[
			'bower_components/font-awesome/css/font-awesome.min.css'
		]
	).pipe(gulp.dest('dist/thirdparty/font-awesome'));
	gulp.src(
		[
			'bower_components/font-awesome/fonts/**/*'
		]
	).pipe(gulp.dest('dist/thirdparty/font-awesome/fonts'));
	gulp.src(
		[
			'bower_components/Materialize/dist/**/*'
		]
	).pipe(gulp.dest('dist/thirdparty/Materialize'));
	gulp.src(
		[
			'node_modules/react-s-alert/dist/**/*'
		]
	).pipe(gulp.dest('dist/thirdparty/react-s-alert'));
});

gulp.task('scss', function() {
	gulp.src(['src/css/*.scss'])
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('pug', function () {
	gulp.src(['./src/**/*.pug','!src/**/_*.pug'])
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('test', () => {
    return gulp.src('./test/**/*.@(js|jsx)')
        .pipe(mocha({
			require: './test/setup.js'
		}))
        .once('error', () => {
            process.exit(1);
        })
});

gulp.task('lint', function () {
    return gulp.src(['src/js/**/*.{js,jsx}','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('bundle', function() {
	gulp.src('./src/js/**/*.{js,jsx}')
		.pipe(gulpWebpack({
			entry: ['./src/js/index.jsx'],
			output: {
				filename: 'bundle.js',
				library: 'index'
			},
			devtool: 'source-map',
			resolve: {
				extensions: ['', '.js', '.jsx']
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
							presets: ['react', 'es2015', 'stage-0']
						}
					}
				]
			}
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
	gulp.watch('src/css/*.scss', ['scss']);
	gulp.watch(['./src/**/*.pug','!src/**/_*.pug'], ['pug']);
	gulp.watch('src/js/**/*.{js,jsx}', ['bundle']);
});

gulp.task('noTest', function() {
	return runSequence('lint', 'bundle', 'scss', 'pug', 'copy');
});

gulp.task('default', function() {
	return runSequence('test', 'lint', 'bundle', 'scss', 'pug', 'copy');
});
