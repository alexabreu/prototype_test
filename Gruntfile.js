module.exports = function(grunt) {
	'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true,
        force: true
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "css/stylesheet.css": "css/**/*.less"
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'css/**/*.less'],
      tasks: ['jshint', 'less']
    },
    connect: {
	    server: {
	      options: {
	        port: 8080,
	        base: '.',
	        keepalive: true
	      }
	    }
	  }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'less', 'connect']);
  
  grunt.registerTask('compress', ['less', 'concat', 'uglify']);
};
