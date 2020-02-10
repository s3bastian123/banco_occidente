var gulp = require('gulp'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps');

//tarea sass
gulp.task('sass', function () {

	//fuente de los archivos
	gulp.src('*.scss', {
			cwd: 'src/scss/'
		})
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(
			sass({
				sourceComments: 'map',
				sourceMap: 'sass',
				outputStyle: 'expanded'
			})
		)

		.pipe(sourcemaps.write('maps'))

		//destino de los archivos
		.pipe(gulp.dest('build/assets/css'))
});

//tarea pug
gulp.task('pug', function () {
	gulp.src('src/pug/*.pug')
		.pipe(plumber())
		.pipe(
			pug({
				pretty: true
			})
		)
		.pipe(gulp.dest('build/html/'))
});

//tarea fuentes
gulp.task('assets', function () {
	gulp.src('src/assets/**/*')
		.pipe(plumber())
		.pipe(gulp.dest('build/assets/'))
});


//tarea default
gulp.task('default', function () {

	//accion que ejecuta y vigila el directorio con la tarea asociada
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/pug/**/*.pug', ['pug']);
	gulp.watch('src/assets/**/*', ['assets']);
});
