"use strict";
var fs = require('fs');
var chalk = require('chalk');
var criticalCSS = require('criticalcss');

module.exports = function(grunt) {
  grunt.registerMultiTask('criticalcss-inline', 'Extract critical CSS into your HTML', function() {
    
    var htmlRoot,
        cssConcat,
        cssFiles;
    var htmlFiles = [];
    var cssRules = [];
    var done = this.async();
    var options = this.options();
    var files = this.filesSrc;
    
    // Check for HTML root and set it accordingly
    if (!options.htmlroot) {
      grunt.log.warn('No HTML-root given! Assuming current working directory...');
    } else {
      grunt.file.setBase(options.htmlroot);
      delete options.htmlroot;
    }
    
    // Check if CSS files are set
    if (!options.cssfiles) {
      grunt.log.fail('No CSS-file specified! Aborting...');
      return false;
    }
    
    // Check for files to exclude and add them to the htmlFiles array, containing a leading "!"
    if (options.exclude) {
      if (options.exclude.constructor === Array) {
        options.exclude.forEach(function(val) {
          val = '!' + val;
        });
        htmlFiles = options.exclude;
      } else {
        htmlFiles.push('!' + options.exclude);
      }
      delete options.exclude;
    }
    
    // Push the original file src to the htmlFiles array
    if (this.files[0].orig.src.constructor === Array) {
      htmlFiles = htmlFiles.concat(this.files[0].orig.src);
    } else {
      htmlFiles.push(this.files[0].orig.src);
    }
    
    // Rebuild the search pattern to the htmlFiles array
    htmlFiles = grunt.file.expand(htmlFiles);

    // Get real file paths from given CSS file names
    cssFiles = grunt.file.expand(options.cssfiles);
    
    // Concat given CSS files into one string
    cssConcat = '';
    cssFiles.forEach(function(css) {
      cssConcat += grunt.file.read(css, {encoding: 'utf8'});
    });
    fs.writeFileSync('/tmp/temp_css_concat.css', cssConcat, {encoding: 'utf8'});
    
    // Extract CSS JSON from CSS string
    criticalCSS.getRules('/tmp/temp_css_concat.css', function(err, output) {
      if (err) {
        grunt.log.fail('Error: ' + err);
      } else {
        options.rules = JSON.parse(output);
        fs.writeFileSync('/tmp/temp_json.json', JSON.stringify(output), {encoding: 'utf8'});
        // Finally, do the magic
        htmlFiles.forEach(function(htmlFile, i) {
          criticalCSS.findCritical(htmlFile, options, function(err, output) {
            if (err) {
              grunt.log.fail('Error: ' + err);
              grunt.log.writeln(chalk.red('Error: '), htmlFile);
            } else {
              output = '<style type="text/css">' + output + '</style>';

              // Replace comment with critical CSS
              var htmlStr = grunt.file.read(htmlFile, {encoding: 'utf8'});
              htmlStr = htmlStr.replace(/(<\!\-{2}\s*criticalcss-style\s*\-{2}>)/i, output);
              grunt.file.write(htmlFile, htmlStr, {encoding: 'utf8'});

              grunt.log.writeln(chalk.green('OK: '), htmlFile);
              
              if (i === htmlFiles.length) {
                done();
              }
            }
          });
        });
      }
    });
  });
};