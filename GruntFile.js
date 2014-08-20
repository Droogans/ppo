/* jshint node:true */
var path = require('path');

function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
        key = option.replace(/\.js$/,'');
        object[key] = require(path + option);
    });

    return object;
}

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env,
        express: {
          options: {
            port: 3000,
            hostname: 'localhost'
          },
          server: {
            options: {
              server: __dirname + '/tasks/server/index.js',
              bases: [__dirname + '/tasks/server']
            }
          },
        },
        open: {
          server: {
            url: 'http://localhost:<%= express.options.port %>'
          }
        },
        watch: {
          options: {
            livereload: true
          }
        }
    };

    grunt.util._.extend(config, loadConfig('./tasks/options/'));
    grunt.initConfig(config);
};
