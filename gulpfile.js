var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create()
var webserver = require('gulp-webserver');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var config ={
  html:{
    watch: './dist'
  },
  styles:{
    main: './build/scss/main.scss',
    watch: './build/scss/**/*.scss',
    output: './dist/css'
  },
  scripts:{
    main:'./build/js/main.js',
    watch:'./build/js/**/*.js',
    output:'./dist/js'
  }
};

gulp.task('server', ['scripts'], function(){
  browserSync.init({
    server: {
      baseDir: config.html.watch
    }
  });
  gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('css', function(){
  var processors =[
    autoprefixer({browsers: ['>5%', 'ie 8']}),
    cssnano
  ];
  return gulp.src(config.styles.main)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.styles.output))
    .pipe(browserSync.stream());
});
gulp.task('scripts', function(){
  browserify(config.scripts.main)
    .transform(babel)
    .bundle()
    .pipe(source('main.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(config.scripts.output));
});
 gulp.task('js-watch', ['scripts'], function(done){
   browserSync.reload();
   done();
 });
gulp.task('watch', function(){
  gulp.watch(config.styles.watch, ['css']);
  gulp.watch(config.scripts.watch, ['scripts', 'js-watch']);
});

gulp.task('build', ['css','scripts']);
gulp.task('default', ['server','watch','build']);
