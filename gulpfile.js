var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify-es').default,
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	deploy = require('gulp-gh-pages');

var jsSources = ['src/scripts/*.js'],
	sassSources = ['src/styles/*.scss'],
	htmlSources = ['**/*.html'],
	mediaSources = ['src/media/*.*'],
	outputDir = 'dist';

gulp.task('copy', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest(outputDir))
});

gulp.task('media', function() {
	gulp.src(mediaSources)
		.pipe(gulp.dest(outputDir + '/media'))
});

gulp.task('sass', function() {
	gulp.src(sassSources)
		.pipe(sass({
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload())
});

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(uglify())
		.pipe(concat('script.js'))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload())
});

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['sass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(mediaSources, ['media']);
});

gulp.task('connect', function() {
	connect.server({
		root: './dist',
		livereload: true
	})
});

gulp.task('clean', function() {
	gulp.src(outputDir)
		.pipe(clean())
});

gulp.task('html', function() {
	gulp.src(htmlSources)
		.pipe(connect.reload())
});

gulp.task('deploy', function() {
	return gulp.src("./dist/**/*")
		.pipe(deploy())
});

gulp.task('default', ['html', 'media', 'js', 'sass', 'copy', 'connect', 'watch']);
