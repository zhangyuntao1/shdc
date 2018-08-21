module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        watch: {
            scripts: {
                files: ["devSrc/*.js"],
                tasks: ["browserify"]
            },
        },
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true
                },
                debug: true,
                transform: [["babelify", {
                    "presets": ["es2015", "es2017", "stage-0"],
                    "plugins": ["transform-runtime"]
                }]],
            },
            app: {
                expand: true,
                src: ["devSrc/*.js"],
                dest: "buildSrc/js",
                flatten: true,
            }
        },
        crx: {
            myPublicExtension: {
                src: "buildSrc/**/*",
                dest: "crx/shdc.zip",
            },
            mySignedExtension: {
                src: "buildSrc/**/*",
                dest: "crx/shdc.crx",
                options: {
                    privateKey: "buildSrc/key.pem"
                }
            }
        }
    });
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('esTask', ['browserify']);
    grunt.registerTask('crxTask', ['crx']);
};