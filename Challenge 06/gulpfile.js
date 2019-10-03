const gulp = require('gulp');
const glob = require('glob');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

gulp.task('clean', function () {
    return del('dist/**', {force: true});
})

gulp.task('build', function () {
    return gulp.src(glob.sync('./src/**/*.js'), {base: './src'})
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(sourcemaps.write('.', {includeContent: true, sourceRoot: __dirname + '/src/'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('clean', 'build'));