/**
 * Created by idams on 6/17/15.
 */

'use strict';

module.exports = function(grunt) {

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            vendor: {
                src: [],
                dest: 'public/vendor.js',
                options: {
                    require: ['jquery'],
                    alias: {
                        momentWrapper: './lib/moments.js'
                    }
                }
            },
            client: {
                src: ['client/**/*.js'],
                dest: 'public/app.js',
                options: {
                    external: ['jquery', 'momentWrapper'],
                }
            }
        },
        "babel": {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src:["**/*.es6"],
                    dest:'build/',
                    ext:'.react.js'
                }]
            }
        }
    });

    grunt.registerTask('default', ['babel']);

};