'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'app',
		dist: 'dist',

		sass: {
			options: {
				includePaths: ['<%= app %>/bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
				}
			}
		},

		

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
					dest: '<%= dist %>/'
				}]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/images/'
				}]
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/index.html'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: '<%= app %>/scss/**/*.scss',
				tasks: ['sass']
			},
			livereload: {
				files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: grunt.option('port') || 9000,
					base: '<%= app %>/',
					open: true,
					livereload: true,
					hostname: grunt.option('hostname') || '127.0.0.1'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: '127.0.0.1'
				}
			}
		},

		wiredep: {
				target: {
					src: [
					'<%= app %>/**/*.html'
				],
					exclude: [
					'modernizr',
					'jquery-placeholder',
					'foundation'
				]
				}
			},
		browserSync: {
			app: {
				bsFiles: {
					src: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}']
				},
				options: {
					watchTask: true,
					server: '<%= app %>',
					scrollProportionally: true
				}
			}
		},
		postcss: {
			options: {
			  processors: [
				require('autoprefixer')({browsers: 'last 3 versions, iOS >= 6, last 3 FirefoxAndroid version, safari > 6, last 3 ChromeAndroid version, last 3 android version'})
			  ]
			},
			dist: {
			  src: '<%= app %>/css/*.css'
			}
		},
		assemble: {
		  options: {
			assets: "<%= app %>/images/",
			data:   "path/to/config.json" 
		  },
		  project: {
			options: {
			  layout: "path/to/default-layout.hbs",
			  partials: "path/to/partials/**/*.hbs" 
			},
			files: {
			  'dest': ["path/to/pages/**/*.hbs" ]
			}
		  }
		}		
	});
/*	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('assemble' );*/
	
	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('bower-install', ['wiredep']);
	
	grunt.registerTask('default', ['compile-sass','postcss:dist', 'bower-install', 'browserSync:app', 'watch']);
	grunt.registerTask('validate-js', [/*'jshint'*/ /*TODO, right.*/]);
	grunt.registerTask('server-dist', ['connect:dist']);
	
	grunt.registerTask('publish', ['compile-sass','postcss:dist', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

};
