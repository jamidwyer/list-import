const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

/*
tasks
 */

gulp.task('start', () => {
  nodemon({
    script: './src/server',
    ext: 'js html',
  });
});

/*
default
 */

gulp.task('default', gulp.parallel('start'));
