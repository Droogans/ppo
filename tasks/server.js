module.exports = function (grunt) {
    grunt.registerTask('server',
        'Runs testing server on localhost:3000', function () {
            grunt.task.run([
                'express:server',
                'open',
                'watch'
            ]);
    });
};
