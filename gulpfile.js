var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

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
gulp.task('watch', function(){
  gulp.watch(config.html.watch);
  gulp.watch(config.styles.watch, ['sass']);
});

gulp.task('build', ['sass','copy']);
gulp.task('default', ['server','watch']);
