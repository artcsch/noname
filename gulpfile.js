var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var config ={
  nodeDir: './node_modules',
  html:{
    watch: './dist/*.html'
  },
  styles:{
    main: './build/scss/main.scss',
    watch: './build/scss/**/*.scss',
    output: './dist/css'
  },
  js:{
    main: './build/js/main.js',
    watch: './build/js/**/*.js',
    output: './dist/js'
  }
};

gulp.task('server', function(){
  gulp.src('./dist')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 9090,
      livereload: {enable: true}
    }));
});
gulp.task('copy', function(){
  gulp.src([config.nodeDir + '/normalize.css'+'/**/*.css'])
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('sass', function(){
  return gulp.src(config.styles.main)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.styles.output));
});
gulp.task('js', ()=>{
  return browserify(config.js.main)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(dest(config.js.output));
});
gulp.task('watch', function(){
  gulp.watch(config.js.watch, ['js']);
  gulp.watch(config.styles.watch, ['sass']);
  gulp.watch(config.html.watch);

});

gulp.task('build', ['sass', 'js']);
gulp.task('default', ['server','copy','watch']);
