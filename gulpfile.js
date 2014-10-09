var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var fs = require('fs');
var git = require('git-rev');
gulp.task('default', function() {

  git.short(function (str) {
    fs.writeFile("version.js", "Basiclytics.version = '0.0.0-"+str+"';", function(err) {
      if(err) {
        console.log(err);
      }
    });
  });
  return gulp.src(["init.js", "version.js", "bower_components/json2/json2.js", "lib/*.js", "modules/*.js", "main.js"])
     .pipe(concat('all.min.js'))
     .pipe(uglify())
     .pipe(gulp.dest('dist'));
});
