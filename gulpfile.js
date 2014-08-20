var gulp = require('gulp');
var server = require('gulp-express');
var app = require('./tasks/server/index.js');

gulp.task('server', function () {
    app.listen(3000);
    console.log("Server listening on port 3000");
});
