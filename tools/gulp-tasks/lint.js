module.exports = {
  eslint: (gulp) => () => {
    const $ = require('gulp-load-plugins')()
    return gulp.src(['./lib/', './bin/docsify'])
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError())
  }
}
