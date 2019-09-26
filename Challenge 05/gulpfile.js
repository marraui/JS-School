const gulp = require('gulp');
const connect = require('gulp-connect');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('connect', async function () {
  return connect.server({
    base: 'http://localhost',
    port: 9000,
    root: './dist',
    livereload: true
  });
});

gulp.task('js', async function () {
  return browserify('./src/main.js', {debug: true})
    .transform(babelify, {
      presets: ["@babel/preset-env"],
      sourceMaps: true
    })
    .bundle()
    .pipe(source('all.js'))
    .pipe(buffer())
    .pipe(rename('all.min.js'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(connect.reload());
});

gulp.task('html', async function () {
  return gulp.src(['./src/components/**/*.html', './src/*.html'])
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload());
});

gulp.task('sass', async function () {
  return gulp.src('./src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('fonts', async function () {
  return gulp.src('./src/PlutoSans-font/*')
  .pipe(gulp.dest('./dist/PlutoSans-font'))
  .pipe(connect.reload());
});

gulp.task('images', async function () {
  return gulp.src('./src/images/**/*')
  .pipe(gulp.dest('./dist/images'))
  .pipe(connect.reload());
});

gulp.task('api-key', async function () {
  return gulp.src('./src/api-key.txt')
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload());
});

gulp.task('data', async function () {
  return gulp.src('./src/data.json')
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload());
});

gulp.task('watch', async function () {
  gulp.watch('./src/**/*.js', gulp.series('js'));
  gulp.watch('./src/**/*.html', gulp.series('html'));
  gulp.watch('./src/*.scss', gulp.series('sass'));
});


gulp.task('default', gulp.parallel('js', 'html', 'sass', 'fonts', 'images', 'data', 'watch', 'connect'));