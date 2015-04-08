> Extract critical CSS and inline it in `<style>`-Tag



## Getting Started
This plugin requires Grunt `>=0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-criticalcss-inline --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-criticalcss-inline');
```

**Issues with the output should be reported on the criticalcss-inline [issue tracker](https://github.com/saschazar21/grunt-criticalcss-inline/issues).**

## Critical-Inline Task
_Run this task with the `grunt criticalcss-inline`command._

### Usage
Wherever you want to include critical CSS, place a `<!-- critical-css -->` comment in your HTML-files. This gets overwritten after every task run, so be sure to re-include it, wherever needed.

### Options
Options are passed to [criticalcss](https://github.com/filamentgroup/criticalCSS).

#### htmlroot
Type: `string`
Default: `./`

`htmlroot` points Grunt to the working directory where your HTML-files are stored. Default value is the directory of your Gruntfile.js.

#### cssfiles 
Type: `string` or `array`
Required: true

The CSS-files to extract critical CSS. **Must** be included in options.

#### exclude
Type: `string` or `array`
Default: none

`exclude` will ignore any of the given files in the final selection. It's also possible to surpress this option and append a minimatch-negated `!`-prefixed file name to the final selection.

### other options
For other options, please look up the [criticalcss](https://github.com/filamentgroup/criticalCSS) docs.

### Demo

```javascript
"criticalcss-inline": {
  test: {
    options: {
      htmlroot: 'test',
      cssfiles: ['css/*.css'],
      exclude: '../node_modules/**/*.html'
    },
    src: '**/*.html'
  }
}
```

## License
Copyright (c) 2015 Sascha Zarhuber. Licensed under the MIT license.