const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const fileWatch = ['*.js', 'src/views/*.ejs', 'src/**/*.js'];

gulp.task('serve', () => {
    var options = {
      script: 'app.js',
      delayTime: 1,
      env: {
        'PORT': 3000
      },
      watch: fileWatch
    };

    return nodemon(options)
      .on('restart',(ev) => {
        console.log('Restarting server...');
      });
})
