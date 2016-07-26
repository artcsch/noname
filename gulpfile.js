var gulp = require('gulp');
var webserver = require('gulp-webserver');

var config ={
  html:{
    watch: './build/*.html'
  }
};
gulp.task('server', function(){
  gulp.src('./build')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 9090,
      livereload: {enable: true}
    }));
});

gulp.task('watch', function(){
  gulp.watch(config.html.watch);
});

gulp.task('default', ['server', 'watch']);
