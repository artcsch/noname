var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var pug = require('gulp-pug');

var config ={
  html:{
    watch: './dist/'
  },
  pug:{
    main: './build/pug/*.pug',
    watch: './build/pug/**/*.pug',
  },
  styles:{
    main: './build/scss/main.scss',
    watch: './build/scss/**/*.scss',
  },
  assets:{
    main: './build/assets/*',
  },
  scripts:{
    main:'./build/js/main.js',
    watch:'./build/js/**/*.js',
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
gulp.task('pug', function() {
  return gulp.src(config.pug.main)
  .pipe(pug({
    pretty:true
  }))
  .pipe(gulp.dest(config.html.watch))
  .pipe(browserSync.stream());
});
gulp.task('css', function(){
  var processors =[
    autoprefixer({browsers: ['>5%', 'ie 8']}),
    cssnano
  ];
  return gulp.src(config.styles.main)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.html.watch + 'css'))
    .pipe(browserSync.stream());
});
gulp.task('assets', function(){
  gulp.src(config.assets.main)
    .pipe(gulp.dest(config.html.watch + 'img'));
});
gulp.task('scripts', function(){
  browserify(config.scripts.main)
    .transform(babel)
    .bundle()
    .pipe(source('main.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(config.html.watch + 'js'));
});
 gulp.task('js-watch', ['scripts'], function(done){
   browserSync.reload();
   done();
 });
gulp.task('watch', function(){
  gulp.watch(config.pug.watch, ['pug']);
  gulp.watch(config.styles.watch, ['css']);
  gulp.watch(config.scripts.watch, ['scripts', 'js-watch']);
});

gulp.task('build', ['assets','css','scripts']);
gulp.task('default', ['server','watch','build']);
