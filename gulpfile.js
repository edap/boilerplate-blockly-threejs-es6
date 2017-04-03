var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil       = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = {
  entryFile: './src/js/index.js',
  outputDir: './build',
  outputFile: 'build.js'
};


var bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
bundler.transform(babel,{ presets: ["es2015"]});
// On updates recompile
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
      .on('error', function (err) {
        gutil.log(err.message);
        browserSync.notify("Browserify Error!");
        this.emit("end");
      })
      .pipe(source(config.outputFile))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.outputDir))
      .pipe(reload({ stream: true }));
}

gulp.task('build', function () {
    return bundle();
});

gulp.task('watch', ['build'], function() {
  browserSync({
    server: {
      baseDir: './build'
    }
  });
});


gulp.task("copyStaticFiles", function(){
    return gulp.src("./src/html/*.*")
    .pipe(gulp.dest("./build"));
});

gulp.task('default', ['copyStaticFiles','watch']);
