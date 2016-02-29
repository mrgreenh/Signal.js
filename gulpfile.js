var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var sass = require('gulp-sass');
var react = require('gulp-react')

gulp.task('signallib', function() {
    browserify({
    entries: './src/main.js',
    debug: true,
    transform: [babelify.configure({optional: "runtime"})]
    }).bundle()
    .on("error", function (err) { console.log("Error: " + err.message); })
    .pipe(source('signal.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('signalui', function() {
    browserify({
    entries: './signal_editor/src/main.jsx',
    extensions: ['.jsx', '.js'],
    debug: true,
    transform: [babelify.configure({
        presets: ["react", "es2015"]
    })]
    }).bundle()
    .on("error", function (err) { console.log("Error: " + err.message); })
    .pipe(source('main.js'))
    .pipe(gulp.dest('./signal_editor/dist'));
});

gulp.task('styles', function() {
    gulp.src('./signal_editor/src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./signal_editor/dist'));
});

gulp.task("watch", function(){
    gulp.watch('./src/**/*.js', ['signallib'])
});

gulp.task("watchui", function(){
    gulp.watch('./signal_editor/src/**/*.jsx', ['signalui'])
    gulp.watch('./signal_editor/src/**/*.js', ['signalui'])
    gulp.watch('./src/**/*.js', ['signalui'])
    gulp.watch('./signal_editor/src/**/*.scss', ['styles'])
});

gulp.task('default', ['signallib', 'watch'])
gulp.task('signal_editor', ['watchui'])
