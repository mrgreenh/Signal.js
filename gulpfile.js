var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gulp = require('gulp');

gulp.task('modules', function() {
    browserify({
    entries: './src/main.js',
    debug: true,
    transform: [babelify.configure({presets: ["es2015", "stage-1"]})]
    }).bundle()
    .on("error", function (err) { console.log("Error: " + err.message); })
    .pipe(source('signal.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task("watch", function(){
    gulp.watch('./src/**/*.js', ['modules'])
});

gulp.task('default', ['modules', 'watch'])
