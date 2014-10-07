var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
 return gulp.src(["bower_components/atomic/dist/atomic.js", "main.js"])
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(gulp.dest('dist'));
});
