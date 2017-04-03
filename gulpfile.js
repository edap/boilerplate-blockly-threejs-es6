var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var connect = require('gulp-connect');


gulp.task('build', function(){
  var bundler = browserify({entries: ["./src/js/index.js"], debug: true }).transform(babel,{
    // Use all of the ES2015 spec
    presets: ["es2015"]
  });

  bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', ['build']);
});


gulp.task('startServer', function(){
        connect.server({
                    root : "./build",
                    livereload : true,
                    port : 9001
                });
});

gulp.task("copyStaticFiles", function(){
    return gulp.src("./src/html/*.*")
    .pipe(gulp.dest("./build"));
});

gulp.task('default', ['copyStaticFiles','watch', 'startServer']);
