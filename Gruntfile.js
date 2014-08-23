/*jslint node: true */
'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    globals: ['should'],
                    timeout: 10000,
                    ignoreLeaks: false,
                    ui: 'bdd',
                    reporter: 'spec',
                    require: ['should', 'coverage/blanket']
                },
                src: ['test/**/*.js']
            },
            'html-cov': {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: 'coverage.html'
                },
                src: ['test/**/*.js']
            },
            'travis-cov': {
                options: {
                    reporter: 'travis-cov'
                },
                src: ['test/**/*.js']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-mocha-test');


    // Default task.
    grunt.registerTask('default', ['mochaTest']);
    grunt.registerTask('test', ['mochaTest']);
};