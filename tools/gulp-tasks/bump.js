module.exports = {
  bump: (gulp) => (cb) => {
    const runSequence = require('run-sequence')
    const chalk = require('chalk')
    runSequence(
      'bump:pkg-version',
      (error) => {
        if (error) {
          console.log(chalk.magenta.bold('\n[bump]') + chalk.red.bold(' There was an issue bumping version:\n') + error.message)
        }
        cb(error)
      }
    )
  },
  bumpPkgVersion: (gulp) => () => {
    const $ = require('gulp-load-plugins')()
    const argv = require('yargs').argv
    return gulp.src('./package.json')
      .pipe($.if((Object.keys(argv).length === 2), $.bump()))
      .pipe($.if(argv.patch, $.bump()))
      .pipe($.if(argv.minor, $.bump({ type: 'minor' })))
      .pipe($.if(argv.major, $.bump({ type: 'major' })))
      .pipe($.if(argv.prerelease, $.bump({ type: 'prerelease' })))
      .pipe(gulp.dest('./'))
  }
}
