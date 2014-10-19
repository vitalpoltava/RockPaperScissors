"use strict";

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        less: {
            compile: {
                options: {
                    compress: true
                },
                files: {
                    'public/css/main.css': ['less/main.less']
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: [{
                    src: 'public/js/main.js',
                    dest: 'public/js/build.js'
                }]
            }
        },
        concat: {
            dist: {
                src: [
                    'src/app/utils/utils.js',
                    'src/app/utils/mediator.js',
                    'src/app/utils/polyfills.js',
                    'src/app/factory.js',
                    'src/app/model.js',
                    'src/app/templates.js',
                    'src/app/view.js',
                    'src/app/init.js'
                ],
                dest: 'public/js/main.js'
            }
        },
        jasmine: {
            game: {
                src: ["public/js/build.js"],
                options: {
                    host: 'http://localhost:8000/',
                    specs: 'test/*.js',
                    template: 'test/template.html'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Tasks
    grunt.registerTask('default', ['less', 'concat', 'uglify']);
    grunt.registerTask('styles', ['less']);
    grunt.registerTask('tests', ['connect:server', 'jasmine:game']);

};