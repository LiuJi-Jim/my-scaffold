var gulp = require('gulp');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var to5 = require('gulp-6to5');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var path = require('path');

var JS = ['src/js/**/*.js', 'src/jsx/**/*.jsx'];

gulp.task('6to5', function() {
  gulp.src(JS)
    .pipe(sourcemaps.init())
    .pipe(to5({
      modules: 'amd'
    }))
    //.pipe(concat('all.js'))
    .pipe(rename({ extname: '.js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'));
})

gulp.task('styles', function() {
  return gulp.src(['src/stylus/*.styl', 'src/css/**/*.css'])
    .pipe(sourcemaps.init())
    .pipe(stylus({
      //linenos: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('fonts', function() {
  gulp.src('src/fonts/**')
    .pipe(gulp.dest('dist/fonts/'));
});

//
gulp.task('copy', function() {
  gulp.src('src/lib/**')
    .pipe(gulp.dest('dist/lib/'));
});

gulp.task('buildlib', function() {
  var libs = {
    'jquery': 'dist/*',
    'requirejs': 'require.js',
    'react': '*.js',
    'semantic-ui': 'dist/**'
  };
  for (var name in libs) {
    var src = path.join('bower_components', name, libs[name]);
    var dest = path.join('dist/lib', name);
    gulp.src(src).pipe(gulp.dest(dest));
  }
})

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('gulpfile.js', ['default']);

  gulp.watch(JS, ['6to5']);
  gulp.watch(['src/stylus/**/*.styl', 'src/css/**/*.css'], ['styles']);
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
  runSequence(['6to5', 'styles', 'fonts', 'buildlib'], cb);
});
