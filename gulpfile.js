// load dependencies
var gulp 		= require('gulp');
var sass 		= require('gulp-sass');
var jshint 		= require('gulp-jshint');
var uglify		= require('gulp-uglify');
var concat 		= require('gulp-concat');
var rename 		= require('gulp-rename');
var sourcemaps 	= require('gulp-sourcemaps');
var runSequence = require('run-sequence');

// 'default' gulp task
gulp.task('default',function(){});

// 'styles' gulp task
// run sequence
gulp.task('styles',function(){
    runSequence('styles-sass');
});
gulp.task('styles-sass',function(){
    var input   = 'scss/*.scss';
    var output  = 'css';
    return gulp.src(input).pipe(sass()).pipe(gulp.dest(output));
});

// 'services' gulp task
// run sequence
gulp.task('services',function(){
	runSequence('services-jshint','services-uglify');
});
// check for errors
gulp.task('services-jshint',function(){
	return gulp.src('application/services/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});
// concat and uglify services
// gulp.task('services-uglify',function(){
// 	return gulp.src('application/services/*.js')
// 			.pipe(sourcemaps.init())
// 				.pipe(concat('services.js'))
// 				.pipe(gulp.dest('dist'))
// 				.pipe(rename('services.min.js'))
// 				.pipe(uglify())
// 				.pipe(gulp.dest('dist'))
// 			.pipe(sourcemaps.write('./'))
// 			.pipe(gulp.dest('dist'));
// });

// 'components' gulp task
// run sequence
gulp.task('components',function(){
	runSequence('components-jshint','components-uglify');
});
// check for errors
// gulp.task('components-jshint',function(){
// 	return gulp.src('application/components/*.js')
// 	.pipe(jshint())
// 	.pipe(jshint.reporter('jshint-stylish'));
// });
// concat and uglify components
// gulp.task('components-uglify',function(){
// 	return gulp.src('application/components/*.js')
// 			.pipe(sourcemaps.init())
// 				.pipe(concat('components.js'))
// 				.pipe(gulp.dest('dist'))
// 				.pipe(rename('components.min.js'))
// 				.pipe(uglify())
// 				.pipe(gulp.dest('dist'))
// 			.pipe(sourcemaps.write('./'))
// 			.pipe(gulp.dest('dist'));
// });

// 'controllers' gulp task
// run sequence
gulp.task('controllers',function(){
	runSequence('controllers-jshint','controllers-uglify');
});
// check for errors
gulp.task('controllers-jshint',function(){
	return gulp.src('application/controllers/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});
// concat and uglify controllers
gulp.task('controllers-uglify',function(){
	return gulp.src('application/controllers/*.js')
			.pipe(sourcemaps.init())
				.pipe(concat('controllers.js'))
				.pipe(gulp.dest('dist'))
				.pipe(rename('controllers.min.js'))
				.pipe(uglify())
				.pipe(gulp.dest('dist'))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('dist'));
});

// [*] Watch for changes
gulp.task('watch',function(){
	// watch styles
	gulp.watch('scss/*.scss',['styles']);
    // watch services
	// gulp.watch('application/services/*.js',['services']);
	// watch controllers
	// gulp.watch('application/controllers/*.js',['controllers']);
	// watch components
	// gulp.watch('application/components/*.js',['components']);
});

// tasks registration
gulp.task('default',[
	'styles','controllers','services','components'
],function(){});
