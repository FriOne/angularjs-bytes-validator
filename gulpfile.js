var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('minify', function compileLess() {
  return gulp.src('./src/bytes-validator.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});
gulp.task('default', ['minify']);
