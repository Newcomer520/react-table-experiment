var gulp = require('gulp')
,	util = require('gulp-util')
,	sass = require('gulp-sass')
,	notify = require('gulp-notify')
,	webpack = require('webpack')
,	WebpackDevServer = require('webpack-dev-server')
,	webpackConfig = require('./webpack.config.js');

gulp.task('default', function() {
	var webpack = require('gulp-webpack');
	return gulp.src('src/main.jsx')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./build'));
});

gulp.task('webpack-dev-server', function() {
	var compiler = webpack(webpackConfig);
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;
	console.log(myConfig.output.publicPath)
	var server = new WebpackDevServer(webpack(myConfig), {
		publicPath: "/assets/",
	    stats: { colors: true }
	}).listen(8080, "localhost", function(err) {
		if(err) throw new util.PluginError("webpack-dev-server", err);
		util.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
		notify.onError(function(error) {
			return error.message;
		})
	});
});

gulp.task('watch-sass', function() {
	gulp.watch('./src/sass/**/*.scss', ['build-sass']);
});
gulp.task('build-sass', function() {
	gulp.src('./src/sass/**/*.scss')
    	.pipe(sass())
    	.on('error', util.log)
        .pipe(gulp.dest('./build'));
});

gulp.task('build', ['build-sass']);