module.exports = function(grunt) {
  
  grunt.initConfig({
    
    'jshint': {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    
    'criticalcss-inline': {
      test: {
        options: {
          htmlroot: 'test',
          cssfiles: ['css/*.css'],
          exclude: '../node_modules/**/*.html'
        },
        src: '**/*.html'
      }
    }
  });
  
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['criticalcss-inline:test']);
};