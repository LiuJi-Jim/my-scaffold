var gulp = require('gulp');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var to5 = require('gulp-6to5');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');

gulp.task('6to5', function() {
  gulp.src(['src/js/**/*.js', 'src/jsx/**/*.jsx'])
    .pipe(sourcemaps.init())
    .pipe(to5({
      modules: 'amd'
    }))
    //.pipe(concat('all.js'))
    .pipe(rename({ extname: '.js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'));
})

gulp.task('stylus', function() {
  return gulp.src(['src/stylus/*.styl'])
    .pipe(sourcemaps.init())
    .pipe(stylus({
      //linenos: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

//
gulp.task('copy', function() {
  gulp.src('src/lib/**')
    .pipe(gulp.dest('dist/lib/'));
});

gulp.task('buildlib', function() {
  gulp.src('bower_components/jquery/dist/*')
    .pipe(gulp.dest('dist/lib/jquery/'));

  gulp.src('bower_components/requirejs/require.js')
    .pipe(gulp.dest('dist/lib/requirejs/'));
})

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('gulpfile.js', ['default']);

  gulp.watch(['src/js/**/*.js', 'src/jsx/**/*.jsx'], ['6to5']);
  gulp.watch('src/stylus/**/*.styl', ['stylus']);
  //gulp.watch('src/lib/**', ['copy']);
  gulp.watch('bower_components/**', ['buildlib']);
});

// Clean Output Directory
gulp.task('clean', function() {
  gulp.src(['.tmp', 'dist/js/*', 'dist/css/*', 'dist/fonts/*', 'dist/lib/*', '!dist/.git'], {
    dot: true,
    read: false
  }).pipe(clean({ force: true }));
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function(cb) {
  //runSequence('styles', ['jshint', 'html', 'images', 'fonts', 'copy'], cb);
  runSequence(['6to5', 'stylus', 'buildlib'], cb);
});
