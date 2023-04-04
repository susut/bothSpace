const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename')

gulp.task('sass', () => {
  return gulp.src('./pages/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(rename(path => {
      path.extname = '.wxss'
    }))
    .pipe(gulp.dest((file) => file.base ))
})

gulp.task('watch',() => {
  gulp.watch('./pages/**/*.scss', gulp.series('sass'))
})
