const gulp = require('gulp-help')(require('gulp'))
const gulpStats = require('gulp-stats')

const Locales = require('./tools/locales')
const y18n = new Locales()

gulpStats(gulp)

function loadTask(fileName, taskName) {
  const taskModule = require('./tools/gulp-tasks/' + fileName)
  const task = taskName ? taskModule[taskName] : taskModule
  return task(gulp)
}

// hide this from 'gulp-help' as this is a helper for the gulp task 'bump'
gulp.task('bump:pkg-version', false, [], loadTask('bump', 'bumpPkgVersion'), {})

gulp.task('bump',
  y18n.__('gulp.bump'),
  [],
  loadTask('bump', 'bump'),
  {
    aliases: ['b', 'B'],
    options: {
      'major': y18n.__('gulp.bump.major'),
      'minor': y18n.__('gulp.bump.minor'),
      'patch': y18n.__('gulp.bump.patch'),
      'prerelease': y18n.__('gulp.bump.prerelease')
    }
  })

gulp.task('changelog',
  y18n.__('gulp.changelog'),
  [],
  loadTask('changelog', 'conventional'),
  { aliases: ['c', 'C'] })

gulp.task('lint',
  y18n.__('gulp.lint'),
  [],
  loadTask('lint', 'eslint'),
  { aliases: ['l', 'L'] })

gulp.task('release',
  y18n.__('gulp.release'),
  [],
  loadTask('release', 'github'),
  { aliases: ['r', 'R'] })
